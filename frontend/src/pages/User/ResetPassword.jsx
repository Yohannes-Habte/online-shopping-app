import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { InputField } from "../../components/common/Input";
import Button from "../../components/common/Button";

import { pageLayout, typography, formElements } from "../../styles/uiConfig";
import { validatePassword } from "../../utils/validate";

const baseURL = import.meta.env.VITE_API_URL;

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { token } = useParams();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post(`${baseURL}/users/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      toast.success("Password reset successfully. You can now log in.");
      setFormData(initialState);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={pageLayout.page}>
      <Header />

      <section className={pageLayout.mainSection}>
        <h1 className={typography.title}>Reset Password</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please enter your new password below.
        </p>

        <div className="w-full max-w-md mx-auto rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className={formElements.form}>
            <InputField
              label="New Password"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your new password"
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
            />

            <Button type="submit" disabled={loading} width="100%">
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ResetPassword;
