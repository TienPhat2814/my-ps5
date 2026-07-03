import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string | undefined;
interface NewsletterProps {
  onSubmitted: () => void;
}

export default function Newsletter({ onSubmitted }: NewsletterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const validate = () => {
    if (name.trim().length < 2) return "Vui lòng nhập họ tên (tối thiểu 2 ký tự).";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email không hợp lệ, vui lòng kiểm tra lại.";
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, source: "ps5-landing", time: new Date().toISOString() }),
        });
      }
      setStatus("done");
      onSubmitted();
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Không gửi được dữ liệu, vui lòng thử lại sau.");
    }
  };

  return (
    <section id="newsletter" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-white to-sky-50 dark:from-slate-950 dark:to-slate-900">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Mail className="mx-auto text-sky-600 dark:text-sky-400" size={40} />
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
          Đăng ký nhận tin
        </h2>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          Nhận thông tin khuyến mãi và tin tức mới nhất về PlayStation 5.
        </p>

        {status === "done" ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={20} />
            <span>Đăng ký thành công! Cảm ơn bạn.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-3 items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên"
                className="w-full sm:w-56 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full sm:w-64 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {status === "loading" && <Loader2 size={16} className="animate-spin" />}
              Đăng ký
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </section>
  );
}
