import { memo } from "react";
import styles from "../styles/SmallProduct.module.css";
import { Link } from "react-router";
import { X, Plus } from "lucide-react";

const SmallProduct = memo(({ data, isInCart, addToCart, removeFromCart }) => {
  return (
    <li className={styles.smallProduct}>
      <Link
        to={`./${data.slug}`}
        className={styles.link}
        state={{ previousUrl: "/shop" }}
        viewTransition
      >
        <img
          className={styles.image}
          src={data.images[0]}
          alt={data.title}      
          />
        <h3 className={styles.title} title={data.title}>
          {data.title}
        </h3>
      </Link>
      <div className={styles.productData}>
        <div className={styles.productInfo}></div>
        <div className={styles.priceBuy}>
          <p className={styles.price}>${data.price}</p>
          {isInCart ? (
            <button
              type="button"
              aria-label="remove from cart"
              title="Remove from cart"
              className={styles.buttonRed}
              onClick={() => removeFromCart(data.id)}
            >
              <X className={styles.cartIcon} />
            </button>
          ) : (
            <button
              type="button"
              aria-label="add to cart"
              title="Add to cart"
              className={styles.button}
              onClick={() => addToCart(data)}
            >
              <Plus className={styles.cartIcon} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
});

export default SmallProduct;
