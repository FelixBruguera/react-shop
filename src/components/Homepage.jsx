import styles from '../styles/HomePage.module.css'
import image from '../assets/furniture.jpg'
import { Link } from 'react-router'

export function HydrateFallback() {
    return <p>Skeleton rendered during SSR</p>;
  }

const HomePage = () => {
    return (
        <section className={styles.home}>
            <div className={styles.leftSide}>
                <h1 className={styles.mainText}>Fake Shop</h1>
                <p className={styles.subText}>Find your fake products at the best price</p>
                <Link to='/shop' className={styles.button} viewTransition>Shop now</Link>
            </div>
            <div className={styles.rightSide}>
                <img className={styles.image} src={image}></img>
            </div>
        </section>
    )
}

export default HomePage