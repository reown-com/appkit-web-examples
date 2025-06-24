import React, { useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";

export interface Notification {
  id: string;
  type: "success" | "error";
  message: string;
  duration?: number;
}

export const NotificationSnackbar: React.FC = () => {
  const { notification, hideNotification } = useNotification();

  useEffect(() => {
    if (notification && notification.duration !== 0) {
      const timer = setTimeout(() => {
        hideNotification();
      }, notification.duration || 5000); // Default 5 seconds

      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  if (!notification) return null;

  const isSuccess = notification.type === "success";

  return (
    <div className="notification-snackbar">
      <div className="notification-content">
        {/* Icon */}
        <div className="notification-icon">
          {isSuccess ? (
            <img
              src="./green-check.svg"
              alt="Success"
              width="20"
              height="20"
              className="notification-icon-image"
            />
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 6.66667C11 6.11438 10.5523 5.66667 10 5.66667C9.44772 5.66667 9 6.11438 9 6.66667V9.33333C9 9.88562 9.44772 10.3333 10 10.3333C10.5523 10.3333 11 9.88562 11 9.33333V6.66667Z"
                fill="#F25A67"
              />
              <path
                d="M10 14.4992C10.6904 14.4992 11.25 13.9397 11.25 13.2496C11.25 12.5595 10.6904 12 10 12C9.30964 12 8.75 12.5595 8.75 13.2496C8.75 13.9397 9.30964 14.4992 10 14.4992Z"
                fill="#F25A67"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
                fill="#F25A67"
              />
            </svg>
          )}
        </div>

        {/* Message */}
        <div className="notification-message">{notification.message}</div>

        {/* Close button */}
        <button
          className="notification-close"
          onClick={hideNotification}
          aria-label="Close notification"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M10 4L4 10M4 4L10 10"
              stroke="#868F8F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
