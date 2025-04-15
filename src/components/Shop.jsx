import { useState, useEffect, useRef } from "react";
import SmallProduct from "./SmallProduct";
import Loading from "./Loading";
import Pages from "./Pages";
import styles from '../styles/Shop.module.css'
import { ListFilter, ArrowDownUp } from "lucide-react";
import Filters from "./Filters";
import SlideMenu from "./SlideMenu";


export default function Shop() {
    const [currentUrl, setCurrentUrl] = useState('/api/products/?')
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState({min: 0, max: 1000, category: 'all'})
    const [filterOpen, setFilterOpen] = useState(false)
    const [filterClosing, setFilterClosing] = useState(false)
    const shopRef = useRef()

    useEffect(() => {
        // setIsLoading(true)
        fetch(`${currentUrl}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            setProducts(data['products'])
            setTotalPages(data['info']['pages'])
            setIsLoading(false)
            shopRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        })
        .catch(error => {
            setIsLoading(false)
            error
        })
    }, [currentPage, currentUrl])

    const handleFilter = (filter) => {
        const url = `/api/products/?min=${filter.min}&max=${filter.max}&category=${filter.category}`
        setCurrentUrl(url)
        setCurrentPage(1)
        setFilterClosing(true)
        setFilter(filter)
    }

    const handleFilterClose = () => {
        setFilterOpen(false)
        setFilterClosing(false)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.shop} ref={shopRef}>
            {console.log('render')}
            <div className={styles.options}>
                <button title="filter" aria-label="filter" 
                className={`${styles.option} ${filterOpen ? styles.optionClicked : null}`} 
                onClick={() => setFilterOpen(true)}>
                    <ListFilter size={24}/> Filter
                </button>
                <button title="sort" aria-label="sort" className={styles.option}>
                    <ArrowDownUp /> Sort
                </button>
            </div>
            <section className={styles.products}>
                <SlideMenu isOpen={filterOpen} isClosing={filterClosing} closeSlide={handleFilterClose} setIsClosing={setFilterClosing}>
                    <Filters handleFilter={handleFilter} currentFilter={filter}/>
                </SlideMenu>
                {products.map(product => <SmallProduct data={product} />)}
            </section>
            <Pages pageTotal={totalPages} currentPage={currentPage} setPage={setCurrentPage}/>
        </div>
    )

}
