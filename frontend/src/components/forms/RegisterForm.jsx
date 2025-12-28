import React from "react";
import axios from "axios";
import { InputField, TermsCheckbox } from "../common/Input";
import Button from "../common/Button";
import { formElements, boxContainer, typography } from "../../styles/uiConfig";
import { validateEmail, validatePassword } from "../../utils/validate";
import { toast } from "react-toastify";
import DirectTo from "../common/DirectTo";

const baseURL = import.meta.env.VITE_API_URL;

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  consent: false,
};

const RegisterForm = () => {
  const [formData, setFormData] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});

  const { name, email, password, confirmPassword, consent } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!consent)
      newErrors.consent = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetValues = () => {
    setFormData(initialState);
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newUser = { name, email, password, consent };
    const response = await axios.post(`${baseURL}/auth/register`, newUser);
      toast.success(response.data.message || "Registration successful!");

      resetValues();
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(message);
    }
  };

  return (
    <div className={` ${boxContainer.columnCenter}`}>
      <section className={formElements.formContainer}>
        <h3 className={typography.subtitle}>Sign Up</h3>
        <form
          action=""
          className={formElements.form}
          noValidate
          onSubmit={handleSubmit}
        >
          <InputField
            label={"User Name"}
            type={"text"}
            name={"name"}
            value={name}
            onChange={handleChange}
            placeholder={"Enter your full name"}
            error={errors.name}
          />

          <InputField
            label={"Email Address"}
            type={"email"}
            name={"email"}
            value={email}
            onChange={handleChange}
            placeholder={"Enter your email address"}
            error={errors.email}
          />

          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            value={password}
            onChange={handleChange}
            placeholder={"Enter your password"}
            error={errors.password}
          />

          <InputField
            label={"Confirm Password"}
            type={"password"}
            name={"confirmPassword"}
            value={confirmPassword}
            onChange={handleChange}
            placeholder={"Confirm your password"}
            error={errors.confirmPassword}
          />

          <TermsCheckbox
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={handleChange}
            error={errors.consent}
          />

          <Button
            variant="primary"
            size="md"
            rounded="md"
            shadow="md"
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        {/* Redirect to login */}
        <DirectTo
          message="Already have an account?"
          linkText="Log In."
          linkTo="/login"
        />
      </section>
    </div>
  );
};

export default RegisterForm;
