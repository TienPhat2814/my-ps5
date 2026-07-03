import { BellRing } from "lucide-react";
import type { ToastItem } from "../hooks/useToast";

export default function ToastStack({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-lg bg-slate-900 text-white text-sm px-4 py-2.5 shadow-lg animate-[fadeIn_0.2s_ease-out]"
        >
          <BellRing size={16} className="text-sky-400 shrink-0" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
