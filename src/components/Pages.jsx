import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "../styles/Pages.module.css";
import { memo } from "react";

const Pages = memo(({ pageTotal, currentPage, setPage }) => {
  const previousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      document.startViewTransition({ types: ["backwards"] });
    }
  };
  const nextPage = () => {
    if (currentPage < pageTotal) {
      setPage(currentPage + 1);
      document.startViewTransition({ types: ["forwards"] });
    }
  };
  const pageChange = (i) => {
    setPage(i);
    document.startViewTransition({
      types: i > currentPage ? ["forwards"] : ["backwards"],
    });
  };

  if (pageTotal === 0) {
    return null;
  }
  return (
    <nav aria-label="pages">
      <ul className={styles.pages}>
        <li
          key={"back"}
          className={currentPage === 1 ? styles.disabledArrow : styles.arrow}
          onClick={previousPage}
          onKeyDown={(e) => (e.key === "Enter" ? previousPage() : null)}
          aria-label="previous page"
          tabIndex={0}
          role="button"
        >
          <ArrowLeft size={18} />
        </li>
        {[...Array(pageTotal).keys()].map((i) => {
          const page = i + 1;
          return (
            <li
              key={page}
              aria-label={`page ${page}`}
              aria-current={page === currentPage ? "page" : null}
              title={`page ${page}`}
              tabIndex={0}
              className={
                page === currentPage ? styles.currentPage : styles.page
              }
              onClick={() => pageChange(page)}
              onKeyDown={(e) => (e.key === "Enter" ? pageChange(page) : null)}
            >
              {page}
            </li>
          );
        })}
        <li
          key={"next"}
          className={
            currentPage === pageTotal ? styles.disabledArrow : styles.arrow
          }
          onClick={nextPage}
          onKeyDown={(e) => (e.key === "Enter" ? nextPage() : null)}
          aria-label="next page"
          tabIndex={0}
          role="button"
        >
          <ArrowRight size={18} />
        </li>
      </ul>
    </nav>
  );
});

export default Pages;
