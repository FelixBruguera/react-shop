import { memo } from 'react'
import styles from '../styles/SmallProduct.module.css'
import { Link } from 'react-router'


const SmallProduct = memo(({ data, isInCart, addToCart, removeFromCart }) => {

    return (
        <li className={styles.smallProduct}>
            <Link to={`./${data.slug}`} className={styles.link} state={{ previousUrl: '/shop'}} onClick={() => document.startViewTransition()}>
                <img className={styles.image} src={data.image} alt={data.title}/>
                <h3 className={styles.title} title={data.title}>{data.title}</h3>
            </Link>
            <div className={styles.productData}>
                <div className={styles.productInfo}>
                    <p className={styles.category}>{data.category.name}</p>
                </div>
                <div className={styles.priceBuy}>
                    <p className={styles.price}>${data.price}</p>
                    {isInCart
                    ?   <button
                        type='button'
                        aria-label='remove from cart'
                        title='Remove from cart'
                        className={styles.buttonRed}
                        onClick={() => removeFromCart(data.id)}>
                            <img src='/x.png' alt="X" className={styles.icon}/>
                        </button>
                    :   <button
                        type='button'
                        aria-label='add to cart'
                        title='Add to cart'
                        className={styles.button}
                        onClick={() => addToCart(data)}>
                            <img src='/shoppingCart.png' alt="Shopping cart" className={styles.icon}/>
                        </button>
                    }
                </div>
            </div>
        </li>
    )

})

export default SmallProduct