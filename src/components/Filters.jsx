import categories from '../data/categories.json'
import Button from './Button'
import styles from '../styles/Filters.module.css'
import { useState } from 'react'

const Filters = ({ handleFilter, currentFilter }) => {
    const [min, setMin] = useState(currentFilter.min)
    const [max, setMax] = useState(currentFilter.max)
    const [category, setCategory] = useState(currentFilter.category)

    const handleSubmit = (e) => {
        e.preventDefault()
        const filter = {min: min, max: max, category: category}
        handleFilter(filter)
    }

    const reset = () => {
        setMin(0)
        setMax(1000)
        setCategory('all')
    }
    return (
        <>
            <h2 className={styles.title}>Category</h2>
            <form aria-label='filters form' className={styles.filter} onSubmit={handleSubmit}>
                <div name='categories' className={styles.categories}>
                    <div className={styles.category}>
                    <input type='radio' aria-label="All" value='all' name='category' id='all'
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === 'all' ? true : false }
                    />
                    <label htmlFor='all' className={styles.label}>
                    <span className="material-symbols-outlined">
                            store
                    </span>
                    <p className={styles.categoryName}>All</p></label>
                    </div>
                    { categories.map(cat => {
                        return (
                            <div className={styles.category}>
                               <input type='radio' aria-label={cat.name} value={cat.slug} name='category' id={cat.slug}
                               onChange={(e) => setCategory(e.target.value)}
                               checked={category === cat.slug ? true : false }/>
                               <label htmlFor={cat.slug} className={styles.label}>
                                <span className="material-symbols-outlined">
                                    {cat.logo}
                                </span>
                                <p className={styles.categoryName}>{cat.name}</p></label>
                            </div>
                        )
                    }
                    ) }
                </div>
                <p className={styles.title}>Price</p>
                <div className={styles.prices}>
                        <input
                            className={styles.priceInput}
                            type="number"
                            title='Minimum price'
                            placeholder='Min'
                            aria-label='minimum price'
                            min={0}
                            max={1000}
                            value={min}
                            onChange={(e)=> setMin(e.target.value)}
                        />
                        <span className={styles.separator} aria-label='separator'>-</span>
                        <input
                            className={styles.priceInput}
                            type="number"
                            title='Maximum price'
                            placeholder='Max'
                            aria-label='maximum price'
                            min={1}
                            max={1000}
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                        />
                </div>
                <div className={styles.buttons}>
                    <Button style='light' type='button' label='reset filter' onClick={reset}>
                        Reset
                    </Button>
                    <Button style='dark' type='submit' label='apply filter'>
                        Apply
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Filters