import App from "../App";
import Shop from "../components/Shop";
import Product from "../components/Product";
import Checkout from "../components/Checkout";
import data from '../data/data.json'
import { describe, test, expect, beforeEach, beforeAll, afterAll, afterEach, vi} from "vitest";
import { render, screen, fireEvent} from "@testing-library/react";
import { createRoutesStub, MemoryRouter, Routes, Route, Outlet } from "react-router";
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import userEvent from "@testing-library/user-event";

const products = data.slice(0,30)
const mockedResponse = {"products": products, "info": {pages: products.length/10}};
export const restHandlers = [
  http.get('api/products', () => {
    return HttpResponse.json(mockedResponse);
  }),
  http.get('api/product/:slug', ({ params }) => {
    return HttpResponse.json(products.find(prod => prod.slug === params.slug))
  })
];
const server = setupServer(...restHandlers);

global.document.startViewTransition = vi.fn(() => {
    return { finished: Promise.resolve(), };
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('the shop route', () => {
    const firstProductTitle = products[0].title
    const firstProductPrice = `$${products[0].price}`
    const firstProductDescription = products[0].description
    const Stub = createRoutesStub([
        {
          path: "/",
          Component: App,
          children: [
            {
                path: "shop",
                Component: Shop,
            },
            {
                path: "shop/:slug",
                Component: Product,
            },
            {
                path: "shop/checkout",
                Component: Checkout,
            },
          ]
        },
      ]);
    beforeEach(async ()=> {
        const user = userEvent.setup()
        render( <Stub initialEntries={["/"]} /> )
        await user.click(screen.getByText('Store'))

    })
    test('the product data is visible', async () => {
        expect(await screen.findByRole('heading', { name: firstProductTitle })).toBeVisible()
        expect(screen.getAllByText(firstProductPrice)[0]).toBeVisible()
      })
    describe('the slide menu', async() => {
        test('the slide opens after clicking the button', async() => {
            const user = userEvent.setup()
            await user.click(await screen.findByLabelText('filter'))
            expect(await screen.findByLabelText('sliding menu')).toBeInTheDocument()
        })
        test('the slide closes when the animationEnd event is fired', async() => {
            const user = userEvent.setup()
            await user.click(await screen.findByLabelText('sort'))
            const menu = await screen.findByLabelText('sliding menu')
            await user.click(await screen.findByLabelText('close slide'));
            fireEvent.animationEnd(menu)
            expect(menu).not.toBeInTheDocument()
        })
    })
    describe('pagination', async () => {
        test('The current page has the aria-current attribute set to page', async() => {
            const currentPage = await screen.findByRole("listitem", {current: 'page'})
            expect(currentPage).toBeInTheDocument()
            expect(currentPage).toHaveTextContent('1')
        })
        test('Changes the current page when clicking the next page button', async() => {
            const user = userEvent.setup()
            await user.click(await screen.findByLabelText('next page'))
            const currentPage = await screen.findByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking the previous page button', async() => {
            const user = userEvent.setup()
            await user.click(await screen.findByLabelText('next page'))
            await user.click(await screen.findByLabelText('next page'))
            await user.click(await screen.findByLabelText('previous page'))
            const currentPage = await screen.findByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking on another page', async() => {
            const user = userEvent.setup()
            await user.click(await screen.findByLabelText('page 3'))
            const currentPage = await screen.findByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(3)
        })
    })
    describe('the cart', async() => {
        test('a product can be added', async() => {
            const user = userEvent.setup()
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(await screen.findByLabelText('open cart'))
            expect(screen.getAllByText(firstProductTitle).length).toBe(2)
        })
        test('a product can be removed', async() => {
            const user = userEvent.setup()
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(await screen.findByLabelText('open cart'))
            expect(screen.getAllByText(firstProductTitle).length).toBe(2)
            await user.click(screen.getAllByLabelText('remove from cart')[0])
            expect(await screen.findByText('Your cart is empty')).toBeInTheDocument()
            expect(screen.getAllByText(firstProductTitle).length).toBe(1)
        })
        test('the total updates when the quantity changes', async() => {
            const user = userEvent.setup()
            const productPrice = firstProductPrice.slice(1,3)
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(await screen.findByLabelText('open cart'))
            for (let i = 1; i < 8; i++) {
                await user.click(screen.getByLabelText('increase quantity'))
            }
            expect(screen.getByText(`$${productPrice*8}`)).toBeInTheDocument()
        })
        test('the "clear" button clears the cart', async() => {
            const user = userEvent.setup()
            const buttons = screen.getAllByLabelText('add to cart')
            await user.click(buttons[0])
            await user.click(buttons[1])
            await user.click(buttons[2])
            await user.click(screen.getByLabelText('open cart'))
            expect(screen.getByLabelText('cart products').children).toHaveLength(3)
            await user.click(screen.getByLabelText('clear your cart'))
            expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
        })
    })
    describe('the product page', () => {
        test('renders a product correctly', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByText(firstProductTitle))
            expect(screen.getByText(firstProductTitle).textContent).toBe(firstProductTitle)
            expect(screen.getByText(firstProductDescription)).toBeVisible()
            expect(screen.getByText(firstProductPrice).textContent).toBe(firstProductPrice)
        })
        test('the "go back" button keeps the shop location', async () => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('page 3'))
            await user.click(screen.getByText(firstProductTitle))
            await user.click(screen.getByLabelText('go back'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(3)
        })
    })
    describe('the checkout route', () => {
        const user = userEvent.setup()
        test('renders the cart products', async() => {
            const buttons = screen.getAllByLabelText('add to cart')
            await user.click(buttons[0])
            await user.click(buttons[1])
            await user.click(buttons[2])
            await user.click(await screen.findByLabelText('open cart'))
            await user.click(screen.getByText('Checkout'))
            expect(screen.getByLabelText('checkout products').children).toHaveLength(3)
            expect(screen.getByText(firstProductTitle)).toBeVisible()
        })
    })
})