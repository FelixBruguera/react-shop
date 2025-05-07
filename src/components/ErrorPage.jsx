import { Link } from "react-router";
import styles from "../styles/ErrorPage.module.css"

const ErrorPage = ({ error }) => {
  return (
    <div className={styles.error}>
      <h1>Something went wrong</h1>
      <p>{error}</p>
      <Link to="/">
        Go back
      </Link>
    </div>
  )
}

export default ErrorPage