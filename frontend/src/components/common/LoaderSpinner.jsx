

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 40,
};

const LoaderSpinner = ({
  size = "lg",
  text = "Loading...",
  showText = false,
  className = "",
  color = "text-blue-600",
  strokeWidth = 4,
  ariaLabel,
}) => {
  const spinnerSize = typeof size === "number" ? size : sizeMap[size] || 40;
  const accessibleLabel = ariaLabel || text;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <svg
        className={`animate-spin motion-reduce:animate-none ${color}`}
        width={spinnerSize}
        height={spinnerSize}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {showText && (
        <span className="text-sm text-gray-600 dark:text-gray-300">{text}</span>
      )}

      <span className="sr-only">{accessibleLabel}</span>
    </div>
  );
};

export default LoaderSpinner;
