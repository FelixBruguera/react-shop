import styles from '../styles/SmallProduct.module.css'
import { ShoppingCart, X } from 'lucide-react'
import { Link } from 'react-router'
import { useOutletContext } from 'react-router'

const SmallProduct = ({ data, isInCart }) => {
    const [cart, setCart, addToCart, removeFromCart] = useOutletContext().cart

    return (
        <li className={styles.smallProduct} aria-label='product'>
            <Link to={`./${data.slug}`} className={styles.imageContainer} state={{ previousUrl: '/shop'}} onClick={() => document.startViewTransition()}>
                <img className={styles.image} src={data.image} alt={data.title} />
            </Link>
            <div className={styles.productData}>
                <div className={styles.productInfo}>
                    <Link to={`./${data.slug}`} className={styles.link} state={{ previousUrl: '/shop'}} onClick={() => document.startViewTransition()}>
                        <h3 className={styles.title} aria-label='product title' title={data.title}>{data.title}</h3>
                    </Link>
                    <p className={styles.category} aria-label='product category'>{data.category.name}</p>
                </div>
                <div className={styles.priceBuy}>
                    <p className={styles.price} aria-label='product price'>${data.price}</p>
                    {isInCart
                    ?   <button
                        type='button'
                        aria-label='remove from cart'
                        title='Remove from cart'
                        className={styles.buttonRed}
                        onClick={() => removeFromCart(data.id)}>
                            <X className={styles.icon}/>
                        </button>
                    :   <button
                        type='button'
                        aria-label='add to cart'
                        title='Add to cart'
                        className={styles.button}
                        onClick={() => addToCart(data)}>
                            <ShoppingCart className={styles.icon}/>
                        </button>
                    }
                </div>
            </div>
        </li>
    )

}

export default SmallProduct