import { Menu, X, Moon, Sun } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Tính năng", href: "#features" },
  { name: "Thông số", href: "#specs" },
  { name: "Đăng ký", href: "#newsletter" },
];

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
  onCtaClick: () => void;
}

export default function Header({ isDark, onToggleDark, onCtaClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm shadow-slate-200 dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            PS<span className="text-sky-600">5</span>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 text-slate-700 dark:text-slate-200"
            aria-label="Mở menu"
          >
            <Menu className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          <button
            onClick={onToggleDark}
            aria-label="Chuyển chế độ sáng/tối"
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#newsletter"
            onClick={onCtaClick}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
          >
            Mua ngay
          </a>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white dark:bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              PS<span className="text-sky-600">5</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-slate-700 dark:text-slate-200"
              aria-label="Đóng menu"
            >
              <X className="size-6" />
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-semibold text-slate-900 dark:text-white hover:text-sky-600"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onToggleDark}
              className="mt-4 flex items-center gap-2 px-3 py-2 text-base font-semibold text-slate-900 dark:text-white"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? "Chế độ sáng" : "Chế độ tối"}
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
