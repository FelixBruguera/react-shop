import styles from '../styles/SlideMenu.module.css'
import { useState } from 'react'
import { CircleX } from 'lucide-react'

const SlideMenu = ({ children, isOpen, closeSlide, position}) => {
    const [isClosing, setIsClosing] = useState(false)
    if (!isOpen) { return null }
    const classes = position === 'left' ? {slideOut: styles.slideOutLeft, slideIn: styles.slideInLeft }
                                        : {slideOut: styles.slideOutRight, slideIn: styles.slideInRight}
    const unmount = () => {
        setIsClosing(false)
        closeSlide()
    }

    return (
        <dialog
        aria-label='sliding menu'
        className={isClosing ? classes.slideOut : isOpen ? classes.slideIn : null} 
        onAnimationEnd={isClosing ? () => unmount() : null}
        >
        <button
        className={styles.cancelButton}
        aria-label='close slide'
        title='close slide'
        onClick={() => setIsClosing(true)}>
            <CircleX size={23}></CircleX>
        </button>
        {children}
        </dialog>
    )
}

export default SlideMenu