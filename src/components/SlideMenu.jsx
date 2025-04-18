import styles from '../styles/SlideMenu.module.css'

const SlideMenu = ({ children, isOpen, isClosing, closeSlide, setIsClosing}) => {
    if (!isOpen) { return null }

    return (
        <div
        aria-label='sliding menu'
        className={isClosing ? styles.slideOut : isOpen ? styles.slideIn : null} 
        onAnimationEnd={isClosing ? () => closeSlide() : null}
        >
        <button 
            aria-label='close slide'
            title='close slide'
            type="button" 
            className={styles.button} 
            onClick={() => setIsClosing(true)}>
            X
        </button>
        {children}
        </div>
    )
}

export default SlideMenu