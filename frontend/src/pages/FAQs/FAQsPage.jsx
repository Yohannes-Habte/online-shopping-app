import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { pageLayout, typography } from "../../styles/uiConfig";

const FAQsPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Frequently Asked Questions</h1>
      </section>

      <Footer />
    </main>
  );
};

export default FAQsPage;
