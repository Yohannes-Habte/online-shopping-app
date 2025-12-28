import { pageLayout, typography } from "../../styles/uiConfig";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const WomenPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Women Products </h1>
      </section>

      <Footer />
    </main>
  );
};

export default WomenPage;
