import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styles from "../styles/Product.module.css"
import Loading from "./Loading"
import { ShoppingCart, X, CircleArrowLeft } from "lucide-react"
import { useOutletContext, useLocation, Link } from "react-router"

const Product = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [cart, setCart, addToCart, removeFromCart] = useOutletContext()
    const location = useLocation().state
    const params = useParams()
    
    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true)
        const url = `/api/product/${params.slug}`
        fetch(url, { signal: controller.signal })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false)
            data.error ? setError(data.error) : setData(data)
        })
        return () => { controller.abort() }
    }, [params.slug])

    if (error) { return (<h2 className={styles.error}>{error}</h2>) }
    if (isLoading) { return <Loading /> }
    const isInCart = cart.map(product => product.id).includes(data.id)

    return (
        <div className={styles.product}>
            <Link to={"/shop"} 
            state={location?.shopUrl ? { previousUrl: location.shopUrl } : null} 
            className={styles.goBack} 
            title="Go back to the store" 
            aria-label="go back to the store">
                <CircleArrowLeft size={30}/>
            </Link>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={data.image} loading="lazy" alt={data.title} aria-label="product image"/>
            </div>
                <p className={styles.title} aria-label="product title">{data.title}</p>
                <p className={styles.category} aria-label="product category">{data.category.name}</p>
                <p className={`${styles.description}`} aria-label="product description">{data.description}</p>
                <div className={styles.priceCheckout}>
                    <p className={styles.price} aria-label="product price">${data.price}</p>
                    {isInCart
                    ?   <button
                        type='button'
                        aria-label='remove from cart'
                        title='Remove from cart'
                        className={styles.buttonRed}
                        onClick={() => removeFromCart(data.id)}>
                            <X size={24}/>
                        </button>
                    :   <button
                        type='button'
                        aria-label='add to cart'
                        title='Add to cart'
                        className={styles.button}
                        onClick={() => addToCart(data)}>
                            <ShoppingCart size={24}/>
                        </button>
                    }
                </div>
        </div>
    )
}

export default Product