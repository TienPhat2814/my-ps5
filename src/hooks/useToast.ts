import { useCallback, useState } from "react";

export interface ToastItem {
  id: number;
  message: string;
}

let nextId = 0;

/** Quản lý danh sách toast, dùng để hiển thị thông báo khi theo dõi hành vi người dùng. */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify = useCallback((message: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return { toasts, notify };
}
