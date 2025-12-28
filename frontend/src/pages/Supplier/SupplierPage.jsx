import React from "react";
import { typography } from "../../styles/uiConfig";

const SupplierPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Supplier</h1>
      </section>

      <Footer />
    </main>
  );
};

export default SupplierPage;
