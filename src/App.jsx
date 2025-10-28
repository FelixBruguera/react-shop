import styles from "./styles/App.module.css";
import Nav from "./components/Nav";
import { Outlet } from "react-router";
import { useState, useCallback } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ min: 0, max: 5000, category: "all" });
  const [sort, setSort] = useState("category");
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    product.quantity = 1;
    setCart((cart) => cart.concat(product));
  }, []);
  const removeFromCart = useCallback(
    (productId) =>
      setCart((cart) => cart.filter((product) => product.id !== productId)),
    [],
  );
  const updateQuantity = useCallback((productId, newQuantity) => {
    newQuantity = parseInt(newQuantity);
    setCart((cart) =>
      cart.map((prod) =>
        prod.id === productId ? { ...prod, quantity: newQuantity } : prod,
      ),
    );
  }, []);
  const emptyCart = useCallback(() => setCart([]), []);

  return (
    <div className={styles.app}>
      <Nav
        cart={cart}
        emptyCart={emptyCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <Outlet
        context={{
          cart: cart,
          setCart: setCart,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          updateQuantity,
          emptyCart,
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          filter: filter,
          setFilter: setFilter,
          sort: sort,
          setSort: setSort,
        }}
      />
    </div>
  );
}

export default App;
