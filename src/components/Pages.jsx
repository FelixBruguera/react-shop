import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import styles from '../styles/Pages.module.css'

const Pages = ({ pageTotal, currentPage, setPage }) => {
    const pages = [...Array(pageTotal).keys()].map(n => n + 1)
    const previousPage = () => { 
        if (currentPage > 1) { 
            setPage(currentPage - 1)
            document.startViewTransition({types: ["backwards"]})
        } 
    }
    const nextPage = () => { 
        if (currentPage < pageTotal) {
            setPage(currentPage + 1)
            document.startViewTransition({types: ["forwards"]})
        } 
    }
    if (pages.length === 0) { return null }
    return (
        <nav aria-label="pages">
            <ul className={styles.pages}>
                <li key={'back'}
                    className={styles.arrow}
                    onClick={previousPage}
                    aria-label="previous page">
                        <ArrowLeft size={20}/>
                </li>
                { pages.map(i =>
                    <li key={i}
                    aria-label={`page ${i}`}
                    aria-current={i === currentPage ? 'page' : null}
                    title={`page ${i}`}
                    className={i === currentPage ? styles.currentPage : styles.page}
                    onClick={() => {
                        setPage(i)
                        document.startViewTransition({types: i > currentPage ? ['forwards'] : ['backwards']})
                        }
                    }>
                    {i}
                    </li>
                )}
                <li key={'next'}
                    className={styles.arrow}
                    onClick={nextPage}
                    aria-label="next page">
                        <ArrowRight size={20}/>
                </li>
            </ul>
        </nav>
    )
}

export default Pages