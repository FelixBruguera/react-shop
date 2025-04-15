import styles from '../styles/SlideMenu.module.css'

const SlideMenu = ({ children, isOpen, isClosing, closeSlide, setIsClosing}) => {
    if (!isOpen) { return null }

    return (
        <div
        className={isClosing ? styles.slideOut : isOpen ? styles.slideIn : null} 
        onAnimationEnd={isClosing ? () => closeSlide() : null}
        >
        <button type="button" className={styles.button} onClick={() => setIsClosing(true)}>X</button>
        {children}
        </div>
    )
}

export default SlideMenu