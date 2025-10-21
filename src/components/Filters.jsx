import categories from '../data/categories.json'
import Button from './Button'
import styles from '../styles/Filters.module.css'
import { useState } from 'react'
import { Drum, Guitar, ListMusic, Mic, Piano, Radio, Speaker, AudioWaveform, Laptop, Shirt, Disc3, Play, FileMusic, Music } from 'lucide-react'

const Filters = ({ handleFilter, currentFilter }) => {
    const [min, setMin] = useState(currentFilter.min)
    const [max, setMax] = useState(currentFilter.max)
    const [category, setCategory] = useState(currentFilter.category)
    const iconSize = 20
    const categoryIcons = {
        guitars: <Guitar size={iconSize}/>,
        "keyboards-pianos": <Piano size={iconSize}/>,
        "drums-percussion": <Drum size={iconSize}/>,
        "recording-equipment": <Mic size={iconSize}/>,
        "live-sound": <Radio size={iconSize}/>,
        "dj-equipment": <Play size={iconSize}/>,
        "accessories": <ListMusic size={iconSize}/>,
        "vinyl-records": <Disc3 size={iconSize}/>,
        "amplifiers": <Speaker size={iconSize}/>,
        "pedals-effects": <AudioWaveform size={iconSize}/>,
        "music-software": <Laptop size={iconSize}/>,
        "books-media": <FileMusic size={iconSize}/>,
        "merchandise": <Shirt size={iconSize}/>,
    }

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
            <h3 className={styles.title}>Category</h3>
            <form aria-label='filters form' className={styles.filter} onSubmit={handleSubmit}>
                <div name='categories' className={styles.categories}>
                    <div className={styles.category}>
                    <input type='radio' aria-label="All" value='all' name='category' id='all'
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === 'all' ? true : false }
                    />
                    <label htmlFor='all' className={styles.label}>
                        <Music />
                    <p className={styles.categoryName}>All</p></label>
                    </div>
                    { categories.map(cat => {
                        return (
                            <div className={styles.category}>
                               <input type='radio' aria-label={cat.name} value={cat.slug} name='category' id={cat.slug}
                               onChange={(e) => setCategory(e.target.value)}
                               checked={category === cat.slug ? true : false }/>
                               <label htmlFor={cat.slug} className={styles.label}>
                                {categoryIcons[cat.slug]}
                                <p className={styles.categoryName}>{cat.name}</p></label>
                            </div>
                        )
                    }
                    ) }
                </div>
                <h3 className={styles.title}>Price</h3>
                <div className={styles.prices}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="minimum">Min</label>
                        <input
                            required
                            className={styles.priceInput}
                            type="number"
                            title='Minimum price'
                            placeholder='Min'
                            aria-label='minimum price'
                            id='minimum'
                            min={0}
                            max={max}
                            value={min}
                            onChange={(e)=> setMin(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="maximum">Max</label>
                        <input
                            required
                            className={styles.priceInput}
                            type="number"
                            title='Maximum price'
                            placeholder='Max'
                            aria-label='maximum price'
                            id='maximum'
                            min={min}
                            max={1000}
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                        />
                    </div>
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