import styles from '../styles/SmallProduct.module.css'
import { ShoppingCart, X } from 'lucide-react'
import { Link } from 'react-router'
import { useOutletContext } from 'react-router'

const SmallProduct = ({ data, isInCart, shopUrl }) => {
    const [cart, setCart, addToCart, removeFromCart] = useOutletContext()

    return (
        <li className={styles.smallProduct} aria-label='product'>
                <Link to={`./${data.slug}`} className={styles.imageContainer} state={{ shopUrl: shopUrl}}>
                    <img className={styles.image} src={data.image} alt={data.title} />
                </Link>
                    <Link to={`./${data.slug}`} className={styles.link} state={{ shopUrl: shopUrl}}>
                        <p className={styles.title} aria-label='product title'>{data.title}</p>
                    </Link>
                    <p className={styles.category} aria-label='product category'>{data.category.name}</p>
                    <div className={styles.priceBuy}>
                        {isInCart
                        ?   <button
                            type='button'
                            aria-label='remove from cart'
                            title='Remove from cart'
                            className={styles.buttonRed}
                            onClick={() => removeFromCart(data.id)}>
                                <X size={20}/>
                            </button>
                        :   <button
                            type='button'
                            aria-label='add to cart'
                            title='Add to cart'
                            className={styles.button}
                            onClick={() => addToCart(data)}>
                                <ShoppingCart size={20}/>
                            </button>
                        }
                        <p className={styles.price} aria-label='product price'>${data.price}</p>
                </div>
        </li>
    )

}

export default SmallProduct