import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Specs from "./components/Specs";
import Newsletter from "./components/Newsletter";
import ScrollProgress from "./components/ScrollProgress";
import ToastStack from "./components/ToastStack";
import { useDarkMode } from "./hooks/useDarkMode";
import { useToast } from "./hooks/useToast";
import "./App.css";
import Footer from "./components/Footer";

const MILESTONES = [25, 50, 75, 100];

function App() {
  const { isDark, toggle } = useDarkMode();
  const { toasts, notify } = useToast();
  const reached = useRef<Set<number>>(new Set());

  //Theo dõi hành vi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      for (const m of MILESTONES) {
        if (pct >= m && !reached.current.has(m)) {
          reached.current.add(m);
          notify(m === 100 ? "Bạn đã xem hết trang 🎉" : `Đã cuộn qua ${m}% trang`);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [notify]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors">
      <ScrollProgress />
      <Header isDark={isDark} onToggleDark={toggle} onCtaClick={() => notify("Đã click Mua ngay")} />
      <main>
        <Hero />
        <Features />
        <Specs />
        <Newsletter onSubmitted={() => notify("Đăng ký nhận tin thành công")} />
      </main>
        <Footer/>
      <ToastStack toasts={toasts} />
    </div>
  );
}

export default App;
