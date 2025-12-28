
import { typography } from "../../styles/uiConfig";

const PaymentPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}> Payment Methods </h1>
      </section>
    </main>
  );
};

export default PaymentPage;
