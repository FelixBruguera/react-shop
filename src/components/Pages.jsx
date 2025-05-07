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
    const pageChange = (i) => {
        setPage(i)
        document.startViewTransition({types: i > currentPage ? ['forwards'] : ['backwards']})
        }
        
    if (pages.length === 0) { return null }
    return (
        <nav aria-label="pages">
            <ul className={styles.pages}>
                <li key={'back'}
                    className={currentPage === 1 ? styles.disabledArrow : styles.arrow}
                    onClick={previousPage}
                    onKeyDown={(e) => e.key === 'Enter' ? previousPage() : null}
                    aria-label="previous page"
                    tabIndex={0}
                    role="button">
                        <ArrowLeft size={20}/>
                </li>
                { pages.map(i =>
                    <li key={i}
                    aria-label={`page ${i}`}
                    aria-current={i === currentPage ? 'page' : null}
                    title={`page ${i}`}
                    tabIndex={0}
                    className={i === currentPage ? styles.currentPage : styles.page}
                    onClick={() => pageChange(i)}
                    onKeyDown={(e) => e.key === 'Enter' ? pageChange(i) : null}>
                    {i}
                    </li>
                )}
                <li key={'next'}
                    className={currentPage === pageTotal ? styles.disabledArrow : styles.arrow}
                    onClick={nextPage}
                    onKeyDown={(e) => e.key === 'Enter' ? nextPage() : null}
                    aria-label="next page"
                    tabIndex={0}
                    role="button">
                        <ArrowRight size={20}/>
                </li>
            </ul>
        </nav>
    )
}

export default Pages