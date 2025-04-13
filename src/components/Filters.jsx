import categories from '../data/categories.json'
import styles from '../styles/Filters.module.css'

const Filters = ({ filterClosing, filterClose, closing }) => {
    return (
        <form className={closing ? styles.slideOut : styles.slideIn} onAnimationEnd={closing ? () => filterClose() : null}>
            <p className={styles.title}>Category</p>
            <button type="button" onClick={() => filterClosing()}>X</button>
            <div name='categories' className={styles.categories}>
                <div className={styles.category}>
                    <input type='checkbox' name='all' checked/>
                    <label htmlFor="all">All</label>
                </div>
                { categories.map(category => {
                    return (
                        <div className={styles.category}>
                            <input type='checkbox' name={category.slug}/>
                            <label htmlFor={category.slug}>{category.name}</label>
                        </div>
                    )
                }
                ) }
            </div>
            <p className={styles.title}>Price</p>
            <div className={styles.prices}>
                <input className={styles.priceInput} type="number" placeholder='Min' aria-label='minimum price' />
                <input className={styles.priceInput} type="number" placeholder='Max' aria-label='maximum price' />
            </div>
            <button type="submit" className={styles.button}>Filter</button>
        </form>
    )
}

export default Filters