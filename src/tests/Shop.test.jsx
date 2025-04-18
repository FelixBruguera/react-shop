import Shop from "../components/Shop";
import data from '../data/data.json'
import { describe, test, expect, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import { getByLabelText, render, screen, waitFor, getAllByLabelText, fireEvent} from "@testing-library/react";
import { createRoutesStub } from "react-router";
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
  afterEach(() => server.resetHandlers())
    const Stub = createRoutesStub([
        {
          path: "/shop",
          Component: Shop,
        },
      ]);
    
    test('renders the loading page', async () => {
        render( <Stub initialEntries={["/shop"]} /> )
        expect(getByLabelText(document, 'loading')).toBeVisible()
    })

    describe('after the data loads', () => {
      beforeEach(() => render( <Stub initialEntries={["/shop"]} /> ))

      test('the products have the correct labels', async () => {
        await waitFor(() => {
          expect(getAllByLabelText(document, 'product title')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'product category')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'add to cart')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'product price')[0]).toBeVisible()
        })
      })
      describe('the slide menu', async() => {
        test('the slide opens after clicking the button', async() => {
          const user = userEvent.setup()
          await waitFor(async () => {
            await user.click(screen.getByLabelText('filter'))
          })
          expect(screen.getByLabelText('sliding menu')).toBeVisible()
        })
        test('the slide closes when theanimationEnd event is fired', async() => {
          const user = userEvent.setup()
          await waitFor(async () => {
            await user.click(screen.getByLabelText('sort'))
          })
          const menu = screen.getByLabelText('sliding menu')
          await user.click(screen.getByLabelText('close slide'));
          fireEvent.animationEnd(menu)
          expect(menu).not.toBeInTheDocument()
        })
      })
      describe('pagination', async () => {
        test('The current page has the aria-current attribute set to page', async() => {
          await waitFor(() => {
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toBeInTheDocument()
            expect(currentPage).toHaveTextContent('1')
          })
        })
        test('Changes the current page when clicking the next page button', async() => {
          const user = userEvent.setup()
          await waitFor(async () => {
            screen.getByLabelText('next page')
          })
            await user.click(screen.getByLabelText('next page'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking the previous page button', async() => {
          const user = userEvent.setup()
          await waitFor(async () => {
            screen.getByLabelText('next page')
          })
            await user.click(screen.getByLabelText('next page'))
            await user.click(screen.getByLabelText('next page'))
            await user.click(screen.getByLabelText('previous page'))
            const currentPage = screen.getByRole("listitem", {current: 'page'})
            expect(currentPage).toHaveTextContent(2)
        })
        test('Changes the current page when clicking on another page', async() => {
          const user = userEvent.setup()
          await waitFor(async () => {
            screen.getByLabelText('page 3')
          })
          await user.click(screen.getByLabelText('page 3'))
          const currentPage = screen.getByRole("listitem", {current: 'page'})
          expect(currentPage).toHaveTextContent(3)
        })
      })
    })
})