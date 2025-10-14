import React from "react";

export default function Alert({ type = "success", title, message, className = "" }) {
  const styles = {
    success: {
      bg: "bg-teal-50 dark:bg-teal-800/30",
      border: "border-t-2 border-teal-500",
      iconBg: "border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-800/30",
      border: "border-t-2 border-red-500",
      iconBg: "border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400",
    },
  };

  const s = styles[type];

  return (
    <div className={`${s.bg} ${s.border} rounded-lg p-4 ${className}`} role="alert">
      <div className="flex">
        <div className="shrink-0">
          <span className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${s.iconBg}`}>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {type === "success" ? (
                <>
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </>
              )}
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold dark:text-white">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">{message}</p>
        </div>
      </div>
    </div>
  );
}
