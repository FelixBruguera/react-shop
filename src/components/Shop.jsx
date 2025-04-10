import { useState, useEffect } from "react";
import SmallProduct from "./SmallProduct";
import Loading from "./Loading";
import styles from '../styles/Shop.module.css'
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function Shop() {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
        .then(response => response.json())
        .then(data => {
            setProducts(data)
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            error
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className={styles.shop}>
            <section className={styles.products}>
                {products.map(product => <SmallProduct data={product} />)}
                </section>
            <section title="pages">
                <ul className={styles.pages}>
                    <li key={'back'} className={styles.arrow}><ArrowLeft /></li>
                    <li key={1} className={styles.page}>1</li>
                    <li key={2} className={styles.page}>2</li>
                    <li key={3} className={styles.page}>3</li>
                    <li key={4} className={styles.page}>4</li>
                    <li key={5} className={styles.page}>5</li>
                    <li key={'next'} className={styles.arrow}><ArrowRight /></li>
                </ul>
            </section>
        </div>
    )

}
