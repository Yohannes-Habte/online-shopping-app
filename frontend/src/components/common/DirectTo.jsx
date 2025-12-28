import React from 'react'
import { Link } from 'react-router-dom'

const DirectTo = ({
  message = "Don't have an account?",
  linkText = 'Sign Up',
  linkTo = '/register',
  className = '',
}) => {
  // Guard against invalid critical props
  const isValidLink =
    typeof linkTo === 'string' &&
    linkTo.trim().length > 0 &&
    typeof linkText === 'string' &&
    linkText.trim().length > 0

  if (!isValidLink) return null

  return (
    <div
      className={`flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-1 ${className}`}
      role="navigation"
      aria-label="Authentication redirect"
    >
      {message && (
        <span className="text-gray-600">
          {message}
        </span>
      )}

      <Link
        to={linkTo}
        className="font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        aria-label={linkText}
      >
        {linkText}
      </Link>
    </div>
  )
}

export default DirectTo
