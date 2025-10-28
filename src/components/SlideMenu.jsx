import { CircleX, X } from "lucide-react";
import styles from "../styles/SlideMenu.module.css";
import { useState } from "react";

const SlideMenu = ({ children, isOpen, closeSlide, position }) => {
  const [isClosing, setIsClosing] = useState(false);
  const classes =
    position === "left"
      ? { slideOut: styles.slideOutLeft, slideIn: styles.slideInLeft }
      : { slideOut: styles.slideOutRight, slideIn: styles.slideInRight };
  const unmount = () => {
    setIsClosing(false);
    closeSlide();
  };
  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      aria-modal="true"
      role="dialog"
      aria-label="sliding menu"
      className={isClosing ? classes.slideOut : classes.slideIn}
      onAnimationEnd={isClosing ? () => unmount() : null}
    >
      <button
        className={styles.cancelButton}
        aria-label="close slide"
        title="close slide"
        onClick={() => setIsClosing(true)}
      >
        <CircleX className={styles.icon} aria-label="Close" />
      </button>
      {children}
    </dialog>
  );
};

export default SlideMenu;
