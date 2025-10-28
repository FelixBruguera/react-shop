import styles from "../styles/Checkout.module.css";
import PaymentForm from "./PaymentForm";
import { useOutletContext, useLocation, Link } from "react-router";
import CartItem from "./CartItem";
import { useState } from "react";
import Receipt from "./Receipt";
import { ChevronLeft } from "lucide-react";

const Checkout = () => {
  const { cart, emptyCart, removeFromCart, updateQuantity } =
    useOutletContext();
  const [receiptProducts, setReceiptProducts] = useState([]);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  let total = cart.reduce((prev, product) => {
    if (isNaN(product.quantity)) {
      return prev + 0;
    }
    return prev + product.price * product.quantity;
  }, 0);
  const hasProducts = cart.length > 0;
  const location = useLocation();

  if (isSubmitted) {
    return (
      <section className={styles.checkout}>
        <Receipt products={receiptProducts} customerName={name} />
      </section>
    );
  }

  if (!hasProducts) {
    return (
      <section className={styles.checkout}>
        <p className={styles.empty}>Your cart is empty</p>
      </section>
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length < 16) {
      return alert("Invalid card number");
    }
    if (cart.some((item) => isNaN(item.quantity) || item.quantity === 0)) {
      return alert("Please specify a quantity for all items in your cart");
    }
    setReceiptProducts(cart);
    setIsSubmitted(true);
    emptyCart();
  };

  return (
    <section className={styles.checkout}>
      <Link
        to={location?.previousUrl || "/shop"}
        className={styles.goBack}
        title="Go back"
        aria-label="go back"
        onClick={() => document.startViewTransition({ types: ["backwards"] })}
      >
        <ChevronLeft />
      </Link>
      <div className={styles.productsWrapper}>
        <div className={styles.sectionTitle}>
          <h3 className={styles.title}>Your cart</h3>
          <p className={styles.productCount}>{cart.length} products</p>
        </div>
        <ul aria-label="checkout products" className={styles.products}>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              className={styles.cartItem}
              product={product}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              previousUrl={location.pathname}
            />
          ))}
        </ul>
      </div>
      <PaymentForm
        total={total}
        name={name}
        setName={setName}
        onSubmit={onSubmit}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
      />
      <Link
        to={location?.previousUrl || "/shop"}
        className={styles.goBackMobile}
        title="Go back"
        aria-label="go back"
        onClick={() => document.startViewTransition({ types: ["backwards"] })}
      >
        <ChevronLeft />
      </Link>
    </section>
  );
};

export default Checkout;
