import App from '../App.jsx'
import ErrorPage from '../components/ErrorPage.jsx';
import Shop from '../components/Shop.jsx'
import Product from '../components/Product.jsx'
import HomePage from '../components/Homepage.jsx';
import Checkout from '../components/Checkout.jsx';
import Receipt from '../components/Receipt.jsx';

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "shop",
            element: <Shop />
        },
        {
            path: "shop/:slug",
            element: <Product />,
        },
        {
          path: "shop/checkout",
          element: <Checkout />,
        },
        {
          path: "shop/receipt",
          element: <Receipt />,
        }
      ]
    },
  ];

  export default routes;