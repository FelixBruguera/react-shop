import { useState } from "react"
import styles from '../styles/Filters.module.css'

const Sort = ({ handleSort, currentSort }) => {
    const [option, setOption] = useState(currentSort)
    const options = [
        {slug: 'lowest', name: 'Lowest price', logo: 'trending_down'}, 
        {slug: 'highest', name: 'Highest price', logo: 'trending_up'},
        {slug: 'category', name: 'Category (A-Z)', logo: 'category_search'}, 
        {slug: 'name', name: 'Name (A-Z)', logo: 'sort_by_alpha'}
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSort(option)
    }

    const reset = () => {
        setOption('category')
    }

    return (
    <form className={styles.sort} onSubmit={handleSubmit}>
        <p className={styles.title}>Sort By</p>
        <div name='categories' className={styles.categories}>
            { options.map(opt => {
                return (
                    <div className={styles.category}>
                    <input type='radio' value={opt.slug} name='option' id={opt.slug} aria-label={opt.name}
                    onChange={(e) => setOption(e.target.value)}
                    checked={option === opt.slug ? true : false }/>
                    <label htmlFor={opt.slug} className={styles.label}>
                        <span className="material-symbols-outlined">
                            {opt.logo}
                        </span>
                        <p className={styles.categoryName}>{opt.name}</p></label>
                    </div>
                    )
                }
            )}
        <div className={styles.buttons}>
            <button type='button' className={styles.reset} onClick={() => reset()}>Reset</button>
            <button type="submit" className={styles.button}>Apply</button>
        </div>
        </div>
    </form>
    )
}

export default Sort