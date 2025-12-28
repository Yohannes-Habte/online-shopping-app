import { useState } from "react";
import axios from "axios";
import { validateEmail, validatePassword } from "../../utils/validate";
import { toast } from "react-toastify";
import { CheckboxFieldWithForgotPassword, InputField } from "../common/Input";
import Button from "../common/Button";
import DirectTo from "../common/DirectTo";
import { boxContainer, formElements, typography } from "../../styles/uiConfig";

const baseURL = import.meta.env.VITE_API_URL;

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { email, password, rememberMe } = formValues;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Error handing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const formValidation = () => {
    const errors = {};
    // Email validation
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (!validatePassword(password)) {
      errors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }
    return errors;
  };

  const restVariables = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = formValidation();

    if (Object.keys(errors).length === 0) {
      setLoading(true);
    } else {
      setFormErrors(errors);
    }

    try {
      const newUser = { email, password, rememberMe };

      const response = await axios.post(`${baseURL}/auth/login`, newUser);

      toast.success(response.data.message);

      restVariables();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className={` ${boxContainer.columnCenter}`}>
      <section className={formElements.formContainer}>
        <h3 className={typography.subtitle}>Log In</h3>

        <form action="" onSubmit={handleSubmit} className={formElements.form}>
          <InputField
            label="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            error={formErrors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            error={formErrors.password}
          />

          <CheckboxFieldWithForgotPassword
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleChange}
            label="Remember Me"
            forgotPasswordLink="forgot-password"
          />

          <Button type="submit" disabled={loading} width="100%">
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <DirectTo
          message="Don't have an account?"
          linkText="Sign up."
          linkTo="/register"
        />
      </section>
    </div>
  );
};

export default LoginForm;
