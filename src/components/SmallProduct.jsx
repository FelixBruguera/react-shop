import styles from '../styles/SmallProduct.module.css'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

const SmallProduct = ({ data }) => {
    return (
        <div className={styles.smallProduct} aria-label='product'>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={data.image} alt={data.title} />
            </div>
            <div className={styles.productData}>
                <p className={styles.title} aria-label='product title'>{data.title}</p>
                <p className={styles.category} aria-label='product category'>{data.category.name}</p>
                <div className={styles.priceBuy}>
                    <button type='button' aria-label='add to cart' title='Add to cart' className={styles.button}>
                        <ShoppingCart size={20}/>
                    </button>
                    <p className={styles.price} aria-label='product price'>${data.price}</p>
                </div>
            </div>
        </div>
    )

}

export default SmallProduct