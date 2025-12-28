
import { typography } from "../../styles/uiConfig";

const CheckoutPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}> Checkout </h1>
      </section>
    </main>
  );
};

export default CheckoutPage;
