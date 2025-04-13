import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import styles from '../styles/Pages.module.css'

const Pages = ({ pageTotal, currentPage, setPage }) => {
    const numbers = [...Array(pageTotal).keys()].map(n => n + 1)
    const previousPage = () => { if (currentPage > 1) setPage(currentPage - 1) }
    const nextPage = () => { if (currentPage < pageTotal) setPage(currentPage + 1) }
    return (
        <section title="pages">
            <ul className={styles.pages}>
                <li key={'back'} className={styles.arrow} onClick={previousPage}><ArrowLeft size={20}/></li>
                { numbers.map(i => 
                    <li key={i} 
                    className={i === currentPage ? styles.currentPage : styles.page}
                    onClick={() => setPage(i)}>
                    {i}
                    </li>
                )}
                <li key={'next'} className={styles.arrow} onClick={nextPage}><ArrowRight size={20}/></li>
            </ul>
        </section>
    )
}

export default Pages