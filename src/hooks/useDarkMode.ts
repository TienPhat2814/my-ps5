import { useEffect, useState } from "react";

/** Quản lý Dark Mode: đọc lựa chọn hệ thống lần đầu, sau đó cho phép bật/tắt thủ công. */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}
