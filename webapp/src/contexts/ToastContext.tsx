import { createContext, ReactNode, useMemo } from "react";

import {
  useSnackbar,
  VariantType,
  SnackbarKey,
  SnackbarProvider,
} from "notistack";

interface ToastProps {
  children: ReactNode;
}

type ToastType = (message: string) => SnackbarKey;

interface ToastData {
  toastInfo: ToastType;
  toastSuccess: ToastType;
  toastError: ToastType;
  toastWarning: ToastType;
}

export const ToastContext = createContext({} as ToastData);

const Toast = ({ children }: ToastProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const ToastValue = useMemo(() => {
    const toast = (message: string, variant: VariantType = "default") =>
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 3000,
      });

    const toastInfo = (message: string) => toast(message, "info");

    const toastSuccess = (message: string) => toast(message, "success");

    const toastError = (message: string) => toast(message, "error");

    const toastWarning = (message: string) => toast(message, "warning");

    return {
      toastInfo,
      toastSuccess,
      toastError,
      toastWarning,
    };
  }, [enqueueSnackbar]);

  return (
    <ToastContext.Provider value={ToastValue}>{children}</ToastContext.Provider>
  );
};

export const ToastProvider = ({ children }: ToastProps) => (
  <SnackbarProvider maxSnack={3}>
    <Toast>{children}</Toast>
  </SnackbarProvider>
);
