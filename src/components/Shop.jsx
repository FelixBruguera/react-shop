import { useState, useEffect } from "react";
import SmallProduct from "./SmallProduct";
import Loading from "./Loading";
import Pages from "./Pages";
import styles from '../styles/Shop.module.css'
import { ListFilter, ArrowDownUp } from "lucide-react";
import Filters from "./Filters";


export default function Shop() {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterOpen, setFilterOpen] = useState(false)
    const [filterClosing, setFilterClosing] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/products/?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            setProducts(data['products'])
            setTotalPages(data['info']['pages'])
            setIsLoading(false)
        })
        .catch(error => {
            setIsLoading(false)
            error
        })
    }, [currentPage])

    const handleFilterClosing = () => {
        setFilterClosing(true)
        setFilterOpen(false)
    }
    const handleFilterClose = () => {
        setFilterClosing(false)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.shop}>
            {console.log('render')}
            <div className={styles.options}>
                <button title="filter" aria-label="filter" className={styles.option} onClick={() => setFilterOpen(true)}>
                    <ListFilter size={24}/> Filter
                </button>
                <button title="sort" aria-label="sort" className={styles.option}>
                    <ArrowDownUp /> Sort
                </button>
            </div>
            <section className={styles.products}>
                { filterOpen ? <Filters filterClosing={handleFilterClosing} filterClose={handleFilterClose} closing={false} /> : null }
                { filterClosing ? <Filters filterClosing={handleFilterClosing} filterClose={handleFilterClose} closing={true} /> : null }
                {products.map(product => <SmallProduct data={product} />)}
            </section>
            <Pages pageTotal={totalPages} currentPage={currentPage} setPage={setCurrentPage}/>
        </div>
    )

}
