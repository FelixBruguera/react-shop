import categories from '../data/categories.json'
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
    return (
        <form className={styles.filter} onSubmit={handleSubmit}>
            <p className={styles.title}>Category</p>
            <div name='categories' className={styles.categories}>
                <div className={styles.category}>
                <input type='radio' value='all' name='category' id='all' 
                onChange={(e) => setCategory(e.target.value)}
                checked={category === 'all' ? true : false }/>
                <label htmlFor='all' className={styles.label}>All</label>
                </div>
                { categories.map(cat => {
                    return (
                        <div className={styles.category}>
                           <input type='radio' value={cat.slug} name='category' id={cat.slug} 
                           onChange={(e) => setCategory(e.target.value)}
                           checked={category === cat.slug ? true : false }/>
                           <label htmlFor={cat.slug} className={styles.label}>
                           {cat.name}</label>
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
                        value={min} 
                        onChange={(e)=> setMin(e.target.value)}
                    />
                    <span className={styles.separator}>-</span>
                    <input 
                        className={styles.priceInput} 
                        type="number" 
                        title='Maximum price' 
                        placeholder='Max'
                        aria-label='maximum price' 
                        min={1}
                        value={max} 
                        onChange={(e) => setMax(e.target.value)}
                    />
            </div>
            <button type="submit" className={styles.button}>Apply</button>
        </form>
    )
}

export default Filters