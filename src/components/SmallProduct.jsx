import styles from '../styles/SmallProduct.module.css'
import { ShoppingCart, X } from 'lucide-react'
import { Link } from 'react-router'

const SmallProduct = ({ data, setCart, isInCart }) => {
    const addToCart = () => {
        data.quantity = 1
        setCart(cart => cart.concat(data))
    }
    const removeFromCart = () => setCart((cart) => cart.filter(product => product.id !== data.id))

    return (
        <li className={styles.smallProduct} aria-label='product'>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={data.image} alt={data.title} />
            </div>
            <div className={styles.productData}>
                <p className={styles.title} aria-label='product title'>{data.title}</p>
                <p className={styles.category} aria-label='product category'>{data.category.name}</p>
                <div className={styles.priceBuy}>
                    {isInCart
                    ?   <button 
                        type='button' 
                        aria-label='remove from cart' 
                        title='Remove from cart' 
                        className={styles.buttonRed}
                        onClick={() => removeFromCart()}>
                            <X size={20}/>
                        </button>
                    :   <button 
                        type='button' 
                        aria-label='add to cart' 
                        title='Add to cart' 
                        className={styles.button}
                        onClick={() => addToCart()}>
                            <ShoppingCart size={20}/>
                        </button>
                    }
                    <p className={styles.price} aria-label='product price'>${data.price}</p>
                </div>
            </div>
        </li>
    )

}

export default SmallProduct