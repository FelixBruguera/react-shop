import App from "../App";
import Shop from "../components/Shop";
import data from '../data/data.json'
import { describe, test, expect, beforeEach, beforeAll, afterAll, afterEach} from "vitest";
import { render, screen, getAllByLabelText, fireEvent} from "@testing-library/react";
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
];
const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('the shop route', () => {
    const Stub = createRoutesStub([
        {
          path: "/",
          Component: App,
          children: [
            {
                path: "shop",
                Component: Shop,
            }
          ]
        },
      ]);
    beforeEach(async ()=> {
        const user = userEvent.setup()
        render( <Stub initialEntries={["/"]} /> )
        await user.click(screen.getByText('Store'))
    })
    test('the products have the correct labels', async () => {
        expect(getAllByLabelText(document, 'product title')[0]).toBeVisible()
        expect(getAllByLabelText(document, 'product category')[0]).toBeVisible()
        expect(getAllByLabelText(document, 'add to cart')[0]).toBeVisible()
        expect(getAllByLabelText(document, 'product price')[0]).toBeVisible()
      })
    describe('the slide menu', async() => {
        test('the slide opens after clicking the button', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('filter'))
            expect(screen.getByLabelText('sliding menu')).toBeVisible()
        })
        test('the slide closes when the animationEnd event is fired', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('sort'))
            const menu = screen.getByLabelText('sliding menu')
            await user.click(screen.getByLabelText('close slide'));
            fireEvent.animationEnd(menu)
            expect(menu).not.toBeInTheDocument()
        })
    })
    describe('pagination', async () => {
        test('The current page has the aria-current attribute set to page', async() => {
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toBeInTheDocument()
            expect(currentPage).toHaveTextContent('1')
        })
        test('Changes the current page when clicking the next page button', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('next page'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking the previous page button', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('next page'))
            await user.click(screen.getByLabelText('next page'))
            await user.click(screen.getByLabelText('previous page'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking on another page', async() => {
            const user = userEvent.setup()
            await user.click(screen.getByLabelText('page 3'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(3)
        })
    })
    describe('the cart', async() => {
        test('a product can be added', async() => {
            const user = userEvent.setup()
            const productTitle = screen.getAllByLabelText('product title')[0].textContent
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(screen.getByLabelText('open cart'))
            expect(screen.getByLabelText('cart product')).toBeVisible()
            expect(screen.getByLabelText('cart product title').textContent).toBe(productTitle)
        })
        test('a product can be removed', async() => {
            const user = userEvent.setup()
            const productTitle = screen.getAllByLabelText('product title')[0].textContent
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(screen.getByLabelText('open cart'))
            expect(screen.getByLabelText('cart product')).toBeVisible()
            expect(screen.getByLabelText('cart product title').textContent).toBe(productTitle)
            await user.click(screen.getAllByLabelText('remove from cart')[0])
            expect(screen.getByLabelText('empty cart')).toBeVisible()
            expect(screen.queryByLabelText('cart product')).not.toBeInTheDocument()
        })
        test('when the quantity changes, the total is updated', async() => {
            const user = userEvent.setup()
            const productPrice = screen.getAllByLabelText('product price')[0].textContent.slice(1,3)
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(screen.getByLabelText('open cart'))
            await user.click(screen.getByDisplayValue('1'))
            await user.selectOptions(screen.getByDisplayValue('1'), '8')
            expect(screen.getByLabelText('cart total').textContent).toBe(`$${productPrice*8}`)
        })
        test('the "empty" button clears the cart', async() => {
            const user = userEvent.setup()
            await user.click(screen.getAllByLabelText('add to cart')[0])
            await user.click(screen.getAllByLabelText('add to cart')[1])
            await user.click(screen.getAllByLabelText('add to cart')[2])
            await user.click(screen.getByLabelText('open cart'))
            expect(screen.getAllByLabelText('cart product')).toHaveLength(3)
            await user.click(screen.getByLabelText('empty your cart'))
            expect(screen.queryAllByLabelText('cart product')).toHaveLength(0)
            expect(screen.getByText('Your cart is empty')).toBeVisible()
        })
    })
})