import { createContext, useContext, useState } from "react";
import Toast from "../Components/Toast";

type ToastContextType = {
  showToast: (message:string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

let messageToast = "";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {


    const [openToast, setOpenToast] = useState(false);
  // const [messageToast, setMessageToast] = useState("");

  function showToast(message: string) {
    // setMessageToast(message);
    messageToast = message;
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {openToast && <Toast message={messageToast} />}
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  return useContext(ToastContext);
};
