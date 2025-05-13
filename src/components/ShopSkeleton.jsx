import styles from "../styles/Shop.module.css"
import productStyles from "../styles/SmallProduct.module.css"

const ShopSkeleton = () => {
    return (
        <div className={styles.shop}>
            <div className={styles.optionsWrap}>
                <div className={styles.options}>
                    <span className={styles.loadingOption} />
                    <span className={styles.loadingOption} />
                </div>
            </div>
            <ul className={styles.products}>
                {
                    [...Array(8).keys()].map(() => {
                       return( <li className={productStyles.smallProduct}>
                            <div className={productStyles.link}>
                                <span className={`${productStyles.image} ${productStyles.loadingImage}`} />
                                <span className={`${productStyles.title} ${productStyles.loadingTitle}`} />
                            </div>
                            <div className={productStyles.productData}>
                                <div className={productStyles.productInfo}>
                                    <span className={`${productStyles.category} ${productStyles.loadingCategory}`} />
                                </div>
                                <div className={productStyles.priceBuy}>
                                    <span className={`${productStyles.price} ${productStyles.loadingPrice}`} />
                                    <span className={productStyles.loadingButton} />
                                </div>
                            </div>
                        </li>
                    )
                    })
                }
            </ul>
        </div>
    )
}
export default ShopSkeleton