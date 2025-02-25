"use client";

import { motion } from "framer-motion";
import { ToastType } from "../../hooks/useShowInfo";

interface ToastNotificationProps {
  message: string;
  visible: boolean;
  type: ToastType;
  bgColorClass: string;
}

export const ToastNotification = ({
  message,
  visible,
  bgColorClass,
}: Omit<ToastNotificationProps, "type">) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 mx-auto w-auto max-w-[90%] sm:max-w-md z-50 ${bgColorClass} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg text-center text-xs sm:text-sm`}
      style={{ width: "fit-content" }}
    >
      {message}
    </motion.div>
  );
};
