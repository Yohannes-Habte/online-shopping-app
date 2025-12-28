import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { pageLayout, typography } from "../../styles/uiConfig";

const HomePage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Welcome to LisaConsult</h1>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
