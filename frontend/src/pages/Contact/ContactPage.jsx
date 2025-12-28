import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { typography } from "../../styles/uiConfig";

const ContactPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}> Contact Us </h1>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
