import styles from "../styles/Checkout.module.css";

const Receipt = ({ products, customerName }) => {
  const orderNumber = Math.floor(Math.random() * 1000);
  const total = products.reduce(
    (prev, product) => prev + product.price * product.quantity,
    0,
  );

  return (
    <section className={styles.receiptContainer}>
      <h2 className={styles.thanks}>Order confirmation</h2>
      <div className={styles.receipt}>
        <h3 className={styles.receiptTitle}>MUSIC SHOP</h3>
        <p>Order #{orderNumber}</p>
        <p>
          Customer: <b>{customerName}</b>
        </p>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeaders}>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${product.quantity * product.price}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3}>
                Total
              </th>
              <th scope="row">${total}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default Receipt;
