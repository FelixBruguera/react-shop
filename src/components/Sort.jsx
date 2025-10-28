import { useState } from "react"
import Button from "./Button"
import styles from '../styles/Filters.module.css'
import { ArrowDownAZ, ArrowDownUp, TrendingDown, TrendingUp } from "lucide-react"

const Sort = ({ handleSort, currentSort }) => {
    const [option, setOption] = useState(currentSort)
    const iconSize = 20
    const options = [
        {slug: 'lowest', name: 'Lowest price', logo: <TrendingDown size={iconSize}/>}, 
        {slug: 'highest', name: 'Highest price', logo: <TrendingUp size={iconSize}/>},
        {slug: 'category', name: 'Default', logo: <ArrowDownUp size={iconSize}/>}, 
        {slug: 'name', name: 'Name (A-Z)', logo: <ArrowDownAZ size={iconSize}/>}
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSort(option)
    }

    const reset = () => {
        setOption('category')
    }

    return (
    <>
        <h3 className={styles.title}>Sort By</h3>
        <form className={styles.sort} onSubmit={handleSubmit}>
            <div name='categories' className={styles.categories}>
                { options.map(opt => {
                    return (
                        <div className={styles.category}>
                        <input type='radio' value={opt.slug} name='option' id={opt.slug} aria-label={opt.name}
                        onChange={(e) => setOption(e.target.value)}
                        checked={option === opt.slug ? true : false }/>
                        <label htmlFor={opt.slug} className={styles.label}>
                            {opt.logo}
                            <p className={styles.categoryName}>{opt.name}</p></label>
                        </div>
                        )
                    }
                )}
            <div className={styles.buttons}>
                <Button style='light' type='button' label='reset sort' onClick={() => reset()}>
                    Reset
                </Button>
                <Button style='dark' type='submit' label='apply sort'>
                    Apply
                </Button>
            </div>
            </div>
        </form>
    </>
    )
}

export default Sort