import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styles from "../styles/Product.module.css"
import Loading from "./Loading"
import { ShoppingCart, X, CircleArrowLeft } from "lucide-react"
import { useOutletContext, useLocation, Link } from "react-router"
import ErrorPage from "./ErrorPage"

const Product = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
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

    console.log(error)
    if (error) { return  <ErrorPage error="Failed to load the product, please try again"/> }
    if (isLoading) { return <Loading /> }
    const isInCart = cart.some(product => product.id === data.id)

    return (
        <div className={styles.product}>
            {console.log("rendered product")}
            <div className={styles.productTop}>
                <Link to= {location?.previousUrl || "/shop"}
                    className={styles.goBack}
                    title="Go back"
                    aria-label="go back"
                    onClick={() => document.startViewTransition({types: ['backwards']})}>
                        <CircleArrowLeft className={styles.icon}/>
                </Link>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={data.image} loading="lazy" alt={data.title}/>
                </div>
            </div>
                <div className={styles.productContent}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <p className={styles.category}>{data.category.name}</p>
                    <p className={`${styles.description}`}>{data.description}</p>
                    <div className={styles.priceCheckout}>
                        <h2 className={styles.price}>${data.price}</h2>
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
                                <ShoppingCart className={styles.icon}/>
                            </button>
                        }
                    </div>
                </div>
        </div>
    )
}

export default Product