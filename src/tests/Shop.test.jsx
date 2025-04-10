import Shop from "../components/Shop";
import { assert, describe, test, vi, expect, beforeEach } from "vitest";
import { getByLabelText, getByRole, render, screen, waitFor, getAllByLabelText, queryAllByLabelText, queryByLabelText } from "@testing-library/react";
import { createRoutesStub } from "react-router";


describe('the shop route', () => {
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

      test('it loads the first 10 products', async() => {
        await waitFor(() => {
          const products = queryAllByLabelText(document, 'product')
          assert(products.length === 10, `expected 10 products, received ${products.length}`)
        })
      })
      test('the products have the correct data', async () => {
        await waitFor(() => {
          expect(getAllByLabelText(document, 'product title')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'product category')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'add to cart')[0]).toBeVisible()
          expect(getAllByLabelText(document, 'product price')[0]).toBeVisible()
        })
      })
    })
})