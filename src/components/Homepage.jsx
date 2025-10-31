import styles from "../styles/HomePage.module.css";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <section className={styles.home}>
      <div className={styles.mainImageContainer}>
        <div className={styles.mainTextContainer}>
          <div className={styles.imageText}>
            <h1>Music Shop</h1>
          </div>
          <Link to={"/shop"} viewTransition className={styles.link}>
            <button className={styles.lightButton}>Explore</button>
          </Link>
        </div>
      </div>
      <div className={styles.sideBySide}>
        <div className={styles.sideBySideText}>
          <h1>Built to Last</h1>
          <p>
            At the heart of every great performance is an instrument you can
            trust. We partner directly with the world's most respected luthiers,
            engineers, and brands to bring you gear defined by its superior
            craftsmanship and tonal excellence
          </p>
          <Link to={"/shop"} viewTransition className={styles.link}>
            <button className={styles.darkButton}>Shop now</button>
          </Link>
        </div>
        <img
          src="/piano.jpg"
          alt="A man playing piano"
          className={styles.sideBySideImg}
        />
      </div>
      <div className={styles.itemList}>
        <h1>Your favorite brands</h1>
        <ul>
          <li>
            <img src="/yamaha.png" alt="Yamaha logo" />
          </li>
          <li>
            <img src="/pearl.png" alt="Pearl logo" />
          </li>
          <li>
            <img src="/roland.png" alt="Roland logo" />
          </li>
          <li>
            <img src="/behringer.png" alt="Behringer logo" />
          </li>
          <li>
            <img src="/pioneer.webp" alt="Pioneer logo" />
          </li>
          <li>
            <img src="/boss.png" alt="Boss logo" />
          </li>
          <li>
            <img src="/hosa.png" alt="Hosa logo" />
          </li>
          <li>
            <img src="/marantz.png" alt="Marantz logo" />
          </li>
          <li>
            <img src="/ibanez.png" alt="Ibanez logo" />
          </li>
          <li>
            <img src="/ludwig.png" alt="Ludwig logo" />
          </li>
          <li>
            <img src="/dunlop.png" alt="Dunlop logo" />
          </li>
          <li>
            <img src="/mxr.webp" alt="MXR logo" />
          </li>
        </ul>
      </div>
      <div className={styles.sideBySide}>
        <img
          src="/delivery.jpg"
          alt="A man putting boxes in a van"
          className={styles.sideBySideImg}
        />
        <div className={styles.sideBySideText}>
          <h1>Fast shipping</h1>
          <p>
            Don't let shipping delays silence your creativity. We know you want
            your new gear in your hands as soon as possible. That’s why we
            process orders within hours and partner with trusted carriers to get
            your instruments to you quickly and safely.
          </p>
          <Link to={"/shop"} viewTransition className={styles.link}>
            <button className={styles.darkButton}>Order now</button>
          </Link>
        </div>
      </div>
      <div className={styles.itemList}>
        <h1>What our clients say</h1>
        <ul className={styles.reviews}>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Mark T.</h3>
              <p>Oct 21, 2025</p>
            </div>
            <p>
              Had a question on the chat support. They were super helpful but
              not pushy.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Sarah K.</h3>
              <p>Jun 15, 2025</p>
            </div>
            <p>
              Pretty solid vinyl collection. Found a few gems and the checkout
              process was surprisingly smooth. No hassle at all.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Alex P.</h3>
              <p>Sep 5, 2025</p>
            </div>
            <p>
              Just a really nice, low-key site to browse for new gear. Didn't
              feel overwhelmed by pop-ups or ads, which was great.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Jenna B.</h3>
              <p>Oct 3, 2025</p>
            </div>
            <p>
              Cool online shop. The layout is relaxed, prices seem fair, and my
              order actually showed up faster than I expected.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>David R.</h3>
              <p>Oct 24, 2025</p>
            </div>
            <p>
              Really appreciate how the site is organized. Found the strings I
              needed without digging through tons of menus.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Chloe J.</h3>
              <p>Oct 22, 2025</p>
            </div>
            <p>
              My new pedal just came in. Packaging was solid, no issues at all.
              The whole process was just really straightforward.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Mike B.</h3>
              <p>Oct 20, 2025</p>
            </div>
            <p>
              The photos of the used gear were actually accurate, which is nice.
              What I saw on the site is exactly what I got. Good stuff.
            </p>
          </li>
          <li className={styles.review}>
            <div className={styles.reviewHeading}>
              <h3>Sam L.</h3>
              <p>Oct 19, 2025</p>
            </div>
            <p>
              This is my second time ordering. It’s just a reliable place to get
              music gear. No complaints, will definitely be back.
            </p>
          </li>
        </ul>
      </div>
      <footer>
        <h3 className={styles.footerHeading}>Image credits</h3>
        <ul className={styles.credits}>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://unsplash.com/es/@evs_nd"
              className={styles.link}
            >
              Evgeny Ndn
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.pexels.com/@any-lane/"
              className={styles.link}
            >
              Any Lane
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.pexels.com/@tima-miroshnichenko/"
              className={styles.link}
            >
              Tima Miroshnichenko
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
};

export default HomePage;
