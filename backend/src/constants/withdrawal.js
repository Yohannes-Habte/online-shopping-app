/**
 * withdrawalPurposes.js
 *
 * Centralized constants for withdrawal purposes.
 * Designed for Express.js, Node.js, and MongoDB (Mongoose).
 */

/////////////////////////////
// Withdrawal Purposes
/////////////////////////////

/**
 * Each purpose has:
 * - code: unique identifier (for DB storage)
 * - label: human-readable description
 */
const createWithdrawalPurpose = (code, label) => Object.freeze({ code, label });

export const WITHDRAWAL_PURPOSES = Object.freeze({
  PRODUCT_PROCUREMENT: createWithdrawalPurpose(
    "PRODUCT_PROCUREMENT",
    "Product Procurement"
  ),
  CUSTOMER_REIMBURSEMENT: createWithdrawalPurpose(
    "CUSTOMER_REIMBURSEMENT",
    "Customer Reimbursement"
  ),
  OPERATING_EXPENSES: createWithdrawalPurpose(
    "OPERATING_EXPENSES",
    "Operating Expenses"
  ),
  MARKETING_ADVERTISING: createWithdrawalPurpose(
    "MARKETING_ADVERTISING",
    "Marketing & Advertising"
  ),
  CORPORATE_DONATIONS: createWithdrawalPurpose(
    "CORPORATE_DONATIONS",
    "Corporate Donations"
  ),
  PROFIT_DISTRIBUTION: createWithdrawalPurpose(
    "PROFIT_DISTRIBUTION",
    "Profit Distribution"
  ),
  VENDOR_DISBURSEMENT: createWithdrawalPurpose(
    "VENDOR_DISBURSEMENT",
    "Vendor Disbursement"
  ),
  TAX_OBLIGATIONS: createWithdrawalPurpose(
    "TAX_OBLIGATIONS",
    "Tax Obligations"
  ),
  EMPLOYEE_PAYROLL: createWithdrawalPurpose(
    "EMPLOYEE_PAYROLL",
    "Employee Payroll"
  ),
  LOAN_REPAYMENT: createWithdrawalPurpose("LOAN_REPAYMENT", "Loan Repayment"),
  CAPITAL_INVESTMENT: createWithdrawalPurpose(
    "CAPITAL_INVESTMENT",
    "Capital Investment"
  ),
  PLATFORM_FEES: createWithdrawalPurpose("PLATFORM_FEES", "Platform Fees"),
  SUBSCRIPTION_PAYMENTS: createWithdrawalPurpose(
    "SUBSCRIPTION_PAYMENTS",
    "Subscription Payments"
  ),
  COMMISSION_PAYOUT: createWithdrawalPurpose(
    "COMMISSION_PAYOUT",
    "Commission Payout"
  ),
  LEGAL_COMPLIANCE_FEES: createWithdrawalPurpose(
    "LEGAL_COMPLIANCE_FEES",
    "Legal & Compliance Fees"
  ),
  INSURANCE_PREMIUMS: createWithdrawalPurpose(
    "INSURANCE_PREMIUMS",
    "Insurance Premiums"
  ),
});

/**
 * Array of codes for Mongoose enum
 */
export const WITHDRAWAL_PURPOSE_CODES = Object.freeze(
  Object.values(WITHDRAWAL_PURPOSES).map((p) => p.code)
);
