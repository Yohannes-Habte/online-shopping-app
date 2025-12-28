import { pageLayout, typography } from "../../styles/uiConfig";
import LoginForm from "../../components/forms/LoginForm";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const LoginPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />
      <section className={`${pageLayout.mainSection}`}>
        <h1 className={`${typography.title}`}> Welcome Back to your Account</h1>
        <p className={`text-center text-gray-700 dark:text-gray-300 `}>
          Enter your credentials to access your account
        </p>

        <LoginForm />
      </section>

      <Footer />
    </main>
  );
};

export default LoginPage;
