import { Link } from "react-router-dom";
import { formElements } from "../../styles/uiConfig";

// ===============================================================
// Standard Input Field Component
// ===============================================================
export const InputField = ({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  placeholder = "",
  className = "",
  error = null,
  ...rest
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={formElements.label}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${formElements.input} ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm px-1 text-red-500!">{error}</p>}
    </div>
  );
};

// ===============================================================
// Floating Label Input Component
// ===============================================================
export const FloatingLabelInput = ({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  placeholder = " ",
  className = "",
  error = null,
  ...rest
}) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  const hasValue = !!value;

  return (
    <div className={`relative w-full ${className}`}>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
        aria-invalid={!!error}
        className={`
          ${formElements.input} peer placeholder-transparent
          w-full rounded-md border bg-white
          px-1 pt-4 pb-1 text-gray-700 text-base
          focus:outline-none focus:ring-0
          transition-all duration-200 ease-in-out
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }
        `}
      />

      {label && (
        <label
          htmlFor={inputId}
          className={`
            absolute left-2 top-0 text-gray-400 text-base
            bg-white px-1 transition-all duration-200 ease-in-out
            pointer-events-none

            peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base

            ${hasValue || type === "date" ? "top-0.5 text-xs" : ""}
            peer-focus:top-0.5 peer-focus:text-xs

            ${
              error
                ? "text-red-500 peer-focus:text-red-500"
                : hasValue
                ? "text-blue-500"
                : "peer-focus:text-blue-500"
            }
          `}
        >
          {label}
        </label>
      )}

      {error && <p className="mt-1 text-sm !text-red-500">{error}</p>}
    </div>
  );
};

// ===============================================================
// Password Field Component
// ===============================================================

export const PasswordField = ({
  label,
  name,
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  error = null,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="password"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// ===============================================================
// Show Password Toggle Component
// ===============================================================
export const ShowPasswordToggle = ({
  type = "checkbox",
  id = "showPasswords",
  name = "showPasswords",
  checked = false,
  onChange,
  label = "Show Passwords",
  className = "",
}) => {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <input
        type={type}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

// ===============================================================
// Select Field Component
// ===============================================================
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error = "",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className={`${formElements.label}`}>
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`rounded-lg border px-3 py-2 text-sm outline-none transition-colors 
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }
          focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

// ===============================================================
// Text Area Field Component
// ===============================================================
export const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  disabled = false,
  error = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500!">{error}</p>}
    </div>
  );
};

// ===============================================================
// Terms and Conditions Checkbox Component
// ===============================================================

export const TermsCheckbox = ({
  id = "agree",
  name = "agree",
  checked = false,
  onChange,
  error = "",
  termsLink = "/terms",
  labelText = "I agree to the terms and conditions",
}) => {
  const [beforeLink, afterLink] = labelText.split("terms and conditions");

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center gap-2 my-3">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
          className={formElements.checkbox}
        />

        <label
          htmlFor={id}
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          {beforeLink}
          <Link
            to={termsLink}
            className="text-blue-600! hover:text-red-500! hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            terms and conditions
          </Link>
          {afterLink}
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600! mx-1 -mt-2 mb-7">{error}</p>
      )}
    </div>
  );
};

// ===============================================================
// Checkbox Field Component with Forgot Password Link
// ===============================================================

export const CheckboxFieldWithForgotPassword = ({
  id,
  name,
  checked = false,
  onChange,
  label,
  forgotPasswordLink,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4 md:flex-row md:items-center md:justify-between">
      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />

        {label && (
          <label
            htmlFor={id}
            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>

      {/* Forgot password link */}
      {forgotPasswordLink && (
        <Link
          to={`/${forgotPasswordLink}`}
          className="text-sm text-blue-600 hover:text-red-500 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 w-fit"
        >
          Forgot password?
        </Link>
      )}
    </div>
  );
};
