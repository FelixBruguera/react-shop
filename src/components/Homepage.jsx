import styles from '../styles/HomePage.module.css'
import image from '../assets/furniture.jpg'
import { Link } from 'react-router'
import Button from "./Button"

const HomePage = () => {
    return (
        <section className={styles.home}>
            <div className={styles.mainImageContainer}>
                <div className={styles.mainTextContainer}>
                    <div className={styles.imageText}>
                        <h1>Music Shop</h1>
                        <p>Affordable quality</p>
                    </div>
                    <Link to={"/shop"} viewTransition className={styles.link}>
                        <button className={styles.lightButton}>Explore</button>
                    </Link>
                </div>
            </div>
            <div className={styles.sideBySide}>
                <div className={styles.sideBySideText}>
                    <h1>Built to Last</h1>
                    <p>At the heart of every great performance is an instrument you can trust. We partner directly with the world's most respected luthiers, engineers, and brands to bring you gear defined by its superior craftsmanship and tonal excellence</p>
                    <Link to={"/shop"} viewTransition className={styles.link}>
                        <button className={styles.darkButton}>Shop now</button>
                    </Link>
                </div>
                <img src="/piano.jpg" alt="A man playing piano" className={styles.sideBySideImg} />
            </div>
            <div className={styles.itemList}>
                <h1>Your favorite brands</h1>
                <ul>
                    <li><img src="/yamaha.png" alt="Yamaha logo" /></li>
                    <li><img src="/pearl.png" alt="Pearl logo" /></li>
                    <li><img src="/roland.png" alt="Roland logo" /></li>
                    <li><img src="/behringer.webp" alt="Behringer logo" /></li>
                    <li><img src="/pioneer.png" alt="Pioneer logo" /></li>
                    <li><img src="/boss.png" alt="Boss logo" /></li>
                    <li><img src="/hosa.png" alt="Hosa logo" /></li>
                    <li><img src="/marantz.webp" alt="Marantz logo" /></li>
                    <li><img src="/ibanez.png" alt="Ibanez logo" /></li>
                    <li><img src="/ludwig.png" alt="Ludwig logo" /></li>
                    <li><img src="/dunlop.png" alt="Dunlop logo" /></li>
                    <li><img src="/mxr.webp" alt="MXR logo" /></li>
                </ul>
            </div>
            <div className={styles.sideBySide}>
                <img src="/delivery.jpg" alt="A man putting boxes in a van" className={styles.sideBySideImg} />
                <div className={styles.sideBySideText}>
                    <h1>Fast shipping</h1>
                    <p>Don't let shipping delays silence your creativity. We know you want your new gear in your hands as soon as possible. That’s why we process orders within hours and partner with trusted carriers to get your instruments to you quickly and safely.</p>
                    <Link to={"/shop"} viewTransition className={styles.link}>
                        <button className={styles.darkButton}>Order now</button>
                    </Link>
                </div>
            </div>
            <div className={styles.itemList}>
                <h1>What our clients say</h1>
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default HomePage