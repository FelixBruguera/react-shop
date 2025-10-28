import { LoaderCircle } from "lucide-react";
import styles from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading} aria-label="loading">
      <LoaderCircle size={64} color="grey" className={styles.loadingSpinner} />
    </div>
  );
};

export default Loading;
