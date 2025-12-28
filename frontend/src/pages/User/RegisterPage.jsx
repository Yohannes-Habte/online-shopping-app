import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RegisterForm from "../../components/forms/RegisterForm";
import { pageLayout, typography } from "../../styles/uiConfig";

const RegisterPage = () => {
  return (
    <main className={`${pageLayout.page}`}>
      <Header />

      <section className={`${pageLayout.mainSection}`}>
        <h1 className={typography.title}>Create an Account for Free</h1>

        <p className="text-center text-gray-700 dark:text-gray-300 ">
          Enter your details to create your account
        </p>

        <RegisterForm />
      </section>

      <Footer />
    </main>
  );
};

export default RegisterPage;
