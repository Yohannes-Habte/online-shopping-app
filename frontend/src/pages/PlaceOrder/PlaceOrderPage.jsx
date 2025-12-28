import React from "react";
import { typography } from "../../styles/uiConfig";

const PlaceOrderPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Place Order</h1>
      </section>
    </main>
  );
};

export default PlaceOrderPage;
