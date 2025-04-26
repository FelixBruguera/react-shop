import App from '../App.jsx'
import ErrorPage from '../components/ErrorPage.jsx';
import Shop from '../components/Shop.jsx'
import Product from '../components/Product.jsx'
import HomePage from '../components/Homepage.jsx';

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
            index: true,
            path: "home",
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
            path: "checkout",
            element: <App />,
          }
      ]
    },
  ];

  export default routes;