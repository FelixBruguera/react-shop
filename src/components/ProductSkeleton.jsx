import styles from "../styles/Product.module.css"

const ProductSkeleton = () => {
    return (
        <div className={`${styles.product} ${styles.loadingProduct}`}>
            <div className={styles.productTop}>
                <div className={styles.imageContainer}>
                    <span className={styles.loadingImage}/>
                </div>
            </div>
                <div className={styles.productContent}>
                    <span className={styles.loadingTitle} />
                    <span className={styles.loadingDescription} />
                    <span className={styles.loadingCategory} />
                    <span className={styles.loadingTitle} />
                    <span className={styles.loadingDetail} />
                    <span className={styles.loadingDetail} />
                    <span className={styles.loadingDetail} />
                    <div className={styles.priceCheckout}>
                        <span className={styles.loadingPrice} />
                        <span className={styles.loadingButton} />
                    </div>
                </div>
        </div>
    )
}

export default ProductSkeleton