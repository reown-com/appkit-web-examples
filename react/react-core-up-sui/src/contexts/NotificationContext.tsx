import React, { createContext, useContext, useState, useCallback } from "react";
import { Notification } from "../components/NotificationSnackbar";

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (
    type: "success" | "error",
    message: string,
    duration?: number
  ) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback(
    (type: "success" | "error", message: string, duration: number = 5000) => {
      const id = Date.now().toString();
      setNotification({
        id,
        type,
        message,
        duration,
      });
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
