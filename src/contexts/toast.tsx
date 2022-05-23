import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import Toast, { ToastProps } from '../components/organisms/Toast/Toast';

type ShowToastParams = {
  title: string;
  body: ReactNode;
};

type ToastContextData = {
  showToast(params: ShowToastParams): void;
};

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ToastProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState<number>();

  const showToast = useCallback(
    (params: ShowToastParams) => {
      window.clearTimeout(timeoutRef);
      setData({
        title: params.title,
        children: params.body,
      });
      setIsOpen(true);

      setTimeoutRef(window.setTimeout(() => setIsOpen(false), 3000));
    },
    [timeoutRef],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {data && (
        <Toast isOpen={isOpen} title={data.title}>
          {data.children}
        </Toast>
      )}
    </ToastContext.Provider>
  );
}
