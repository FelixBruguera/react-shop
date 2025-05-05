import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import SmallProduct from "./SmallProduct";
import Loading from "./Loading";
import Pages from "./Pages";
import Button from "./Button";
import styles from '../styles/Shop.module.css'
import { ListFilter, ArrowDownUp } from "lucide-react";
import Filters from "./Filters";
import Sort from "./Sort";
import SlideMenu from "./SlideMenu";


export default function Shop() {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(0)
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const [filter, setFilter] = useOutletContext().filters
    const [currentPage, setCurrentPage] = useOutletContext().currentPage
    const [sort, setSort] = useOutletContext().sort
    const [cart, setCart] = useOutletContext().cart
    const shopRef = useRef()
    const initialFilter = JSON.stringify({min: 0, max: 1000, category: 'all'})
    const isFiltered = JSON.stringify(filter) !== initialFilter
    const isSorted = sort !== 'category'

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true)
        const url = `/api/products/?min=${filter.min}&max=${filter.max}&category=${filter.category}&sortBy=${sort}&page=${currentPage}`
        fetch(url)
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
        return () => controller.abort()
    }, [currentPage, filter, sort])

    const cartIds = cart.length > 0 ? cart.map(product => product.id) : []

    const handleFilter = (filter) => {
        document.startViewTransition()
        setCurrentPage(1)
        setFilter(filter)
        setFilterOpen(false)
    }
    const handleSort = (sort) => {
        document.startViewTransition()
        setCurrentPage(1)
        setSort(sort)
        setSortOpen(false)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={styles.shop} ref={shopRef}>
             <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=apparel,auto_stories,blender,category_search,desktop_windows,diamond,directions_car,grocery,self_care,sort_by_alpha,sports_and_outdoors,store,toys_and_games,trending_down,trending_up"/>            
            {console.log('render')}
            <div className={styles.optionsWrap}>
                <div className={styles.options}>
                    <Button style={filterOpen ? 'dark' : isFiltered ? 'dark' : 'light'} onClick={() => setFilterOpen(true)} label="filter">
                        <div className={styles.option}>
                            <ListFilter className={styles.icon} />
                            <p>Filter</p>
                        </div>
                    </Button>
                    <Button style={sortOpen ? 'dark' : isSorted ? 'dark' : 'light'} onClick={() => setSortOpen(true)} label="sort">
                        <div className={styles.option}>
                            <ArrowDownUp className={styles.icon} />
                            <p>Sort</p>
                        </div>
                    </Button>
                </div>
            </div>
            {products.length === 0 ? <h2 className={styles.noResults}>No results</h2>: null}
            <ul className={styles.products} aria-label="products">
                <SlideMenu isOpen={filterOpen} closeSlide={() => setFilterOpen(false)}  position='left'>
                    <Filters handleFilter={handleFilter} currentFilter={filter}/>
                </SlideMenu>
                <SlideMenu isOpen={sortOpen} closeSlide={() => setSortOpen(false)} position='left'>
                    <Sort handleSort={handleSort} currentSort={sort}/>
                </SlideMenu>
                {products.map(product => <SmallProduct key={product.id} data={product} setCart={setCart} isInCart={cartIds.includes(product.id)}/>)}
            </ul>
            <Pages pageTotal={totalPages} currentPage={currentPage} setPage={setCurrentPage}/>
        </div>
    )

}
