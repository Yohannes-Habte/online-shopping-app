import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { formElements, pageLayout, typography } from "../../styles/uiConfig";
import { useState } from "react";
import { validateEmail } from "../../utils/validate";
import axios from "axios";
import { InputField } from "../../components/common/Input";
import Button from "../../components/common/Button";
const baseURL = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${baseURL}/users/forgot-password`, {
        email,
      });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${pageLayout.page}`}>
      <Header />
      <section className={`${pageLayout.mainSection}`}>
        <h1 className={`${typography.title}`}> Reset Password </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <div className="w-full max-w-md mx-auto rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <form action="" onSubmit={handleSubmit} className={formElements.form}>
            <InputField
              label="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Registered Email"
              error={error}
            />

            <Button type="submit" disabled={loading} width="100%">
              {loading ? "Logging in..." : "Send Reset Link"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ForgotPassword;
