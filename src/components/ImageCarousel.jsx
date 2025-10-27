import { useRef, useState } from "react"
import styles from "../styles/Product.module.css"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const ImageCarousel = ({ images, alt }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    const bigImg = useRef(null)
    const previousImage = () => setSelectedImage(selected => selected > 0 ? selected - 1 : selected)
    const nextImage = () => setSelectedImage(selected => selected < (images.length - 1) ? selected + 1 : selected)
    const previousButtonHidden = selectedImage === 0
    const nextButtonHidden = selectedImage >= (images.length - 1)
    return (
        <div>
            <dialog ref={bigImg}>
                <X className={`${styles.closeModal} ${styles.icon}`} onClick={() => bigImg.current.close()}/>
                <div className={styles.openImageContainer}>
                    <button className={styles.arrow} onClick={() => document.startViewTransition({update: () => previousImage(), types: ["image"]})} aria-hidden={previousButtonHidden} disabled={previousButtonHidden}>
                        <ChevronLeft className={styles.icon}/>
                    </button>
                    <img className={styles.openImage} src={images[selectedImage]} loading="lazy" alt={alt}/>
                    <button className={styles.arrow} onClick={() => document.startViewTransition({update: () => nextImage(), types: ["image"]})} aria-hidden={nextButtonHidden} disabled={nextButtonHidden}>
                        <ChevronRight className={styles.icon}/>
                    </button>
                </div>
            </dialog>
            <div className={styles.imageContainer} onClick={() => {
                 document.startViewTransition({update: () => bigImg.current.showModal(), types: ["image"]})
            }}>
                <img className={styles.image} src={images[selectedImage]} loading="lazy" alt={alt}/>
            </div>
            {images.length > 1 && 
                <ul className={styles.imageSelector}>
                    {images.map((image, index) => {
                        return (
                            <li className={selectedImage === index ? styles.selectedSmallImage : styles.smallImageContainer}
                             onClick={() => document.startViewTransition({update: () => setSelectedImage(index), types: ["image"]})}>
                                <img className={styles.smallImage} src={image} loading="lazy" alt={alt}/>    
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )

}

export default ImageCarousel