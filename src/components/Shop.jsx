import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import SmallProduct from "./SmallProduct";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import Pages from "./Pages";
import Button from "./Button";
import styles from "../styles/Shop.module.css";
import { ListFilter, ArrowDownUp } from "lucide-react";
import Filters from "./Filters";
import Sort from "./Sort";
import SlideMenu from "./SlideMenu";
import ShopSkeleton from "./ShopSkeleton";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const {
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    cart,
    addToCart,
    removeFromCart,
  } = useOutletContext();
  const [error, setError] = useState(false);
  async function fetchData(url, controller) {
    const response = await fetch(url, { signal: controller.signal });
    if (response.ok) {
      const data = await response.json();
      setProducts(data["products"]);
      setTotalPages(data["info"]["pages"]);
      return setIsLoading(false);
    } else {
      setIsLoading(false);
      return setError(true);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const url = `/api/products/?min=${filter.min}&max=${filter.max}&category=${filter.category}&sortBy=${sort}&page=${currentPage}`;
    fetchData(url, controller);
    return () => controller.abort("another request was received");
  }, [currentPage, filter, sort]);

  const cartIds = new Set(cart.map((product) => product.id));

  if (error) {
    return <ErrorPage error="Failed to load products, please try again" />;
  }
  if (isLoading) {
    return <ShopSkeleton />;
  }

  const handleFilter = (filter) => {
    document.startViewTransition();
    setCurrentPage(1);
    setFilter(filter);
    setFilterOpen(false);
  };
  const handleSort = (sort) => {
    document.startViewTransition();
    setCurrentPage(1);
    setSort(sort);
    setSortOpen(false);
  };

  return (
    <div className={styles.shop}>
      <div className={styles.options}>
        <button className={styles.option} onClick={() => setFilterOpen(true)}>
          <ListFilter className={styles.icon} />
          <p>Filter</p>
        </button>
        <button className={styles.option} onClick={() => setSortOpen(true)}>
          <ArrowDownUp className={styles.icon} />
          <p>Sort</p>
        </button>
      </div>
      {products?.length === 0 ? (
        <h2 className={styles.noResults}>No results</h2>
      ) : null}
      <SlideMenu
        isOpen={filterOpen}
        closeSlide={() => setFilterOpen(false)}
        position="left"
      >
        <Filters handleFilter={handleFilter} currentFilter={filter} />
      </SlideMenu>
      <SlideMenu
        isOpen={sortOpen}
        closeSlide={() => setSortOpen(false)}
        position="left"
      >
        <Sort handleSort={handleSort} currentSort={sort} />
      </SlideMenu>
      <ul className={styles.products} aria-label="products">
        {products?.map((product) => (
          <SmallProduct
            key={product.id}
            data={product}
            isInCart={cartIds.has(product.id)}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </ul>
      <Pages
        pageTotal={totalPages}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
}
