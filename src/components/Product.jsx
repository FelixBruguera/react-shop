import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styles from "../styles/Product.module.css"
import ProductSkeleton from "./ProductSkeleton"
import { useOutletContext, useLocation, Link } from "react-router"
import ErrorPage from "./ErrorPage"
import ImageCarousel from "./ImageCarousel"
import { ArrowLeft, Plus, X } from "lucide-react"

const Product = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)
    const {cart, addToCart, removeFromCart } = useOutletContext()
    const location = useLocation().state
    const params = useParams()
    async function fetchData(url, controller) {
        const response = await fetch(url, { signal: controller.signal })
        setIsLoading(true)
        if (response.ok) {
            const data = await response.json()
            setIsLoading(false)
            return setData(data)
        }
        else {
            setIsLoading(false)
            return setError(true)
        }
    }
    
    useEffect( () => {
        const controller = new AbortController();
        const url = `/api/product/${params.slug}`
        fetchData(url, controller)
        return () => { controller.abort('another request was received') }
    }, [params.slug])

    if (error) { return  <ErrorPage error="Failed to load the product, please try again"/> }
    if (isLoading) { return <ProductSkeleton /> }
    const isInCart = cart.some(product => product.id === data.id)

    return (
        <div className={styles.product}>
            <div className={styles.productTop}>
                <Link to= {location?.previousUrl || "/shop"}
                    className={styles.goBack}
                    title="Go back"
                    aria-label="go back"
                    onClick={() => document.startViewTransition({types: ['backwards']})}>
                        <ArrowLeft />
                </Link>
                <ImageCarousel images={data.images} alt={data.title} imageOpen={imageOpen} setImageOpen={setImageOpen} />
            </div>
                <div className={styles.productContent}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={`${styles.description}`}>{data.description}</p>
                    <p className={styles.category}>{data.category.name}</p>
                    <div className={styles.detailsContainer}>
                        <h3 className={styles.subtitle}>Details</h3>
                        <ul className={styles.detailList}>
                            {data.details?.map(detail =>
                            <li className={styles.detailContainer}>
                                <p className={styles.detail}>{detail}</p>
                            </li>)}
                        </ul>
                    </div>
                    <div className={styles.priceCheckout}>
                        <h2 className={styles.price}>${data.price}</h2>
                        {isInCart
                        ?   <button
                            type='button'
                            aria-label='remove from cart'
                            title='Remove from cart'
                            className={styles.buttonRed}
                            onClick={() => removeFromCart(data.id)}>
                                <X className={styles.icon} />
                            </button>
                        :   <button
                            type='button'
                            aria-label='add to cart'
                            title='Add to cart'
                            className={styles.button}
                            onClick={() => addToCart(data)}>
                                <Plus className={styles.cartIcon} />
                            </button>
                        }
                    </div>
                </div>
        </div>
    )
}

export default Product