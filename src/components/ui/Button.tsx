import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
};

const styles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`rounded-md px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}