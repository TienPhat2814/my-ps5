import { Cpu, HardDrive, Monitor, Volume2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const specs = [
  { icon: Cpu, label: "CPU", value: "8 lõi AMD Zen 2", detail: "tần số lên đến 3.5GHz" },
  { icon: HardDrive, label: "Lưu trữ", value: "825GB SSD", detail: "Tốc độ đọc 5.5GB/s" },
  { icon: Monitor, label: "Đồ họa", value: "10.28 TFLOPS", detail: "Hỗ trợ 4K 120fps" },
  { icon: Volume2, label: "Âm thanh", value: "Tempest 3D Audio", detail: "Âm thanh không gian" },
];

export default function Specs() {
  const heading = useScrollReveal<HTMLDivElement>();

  return (
    <section id="specs" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={heading.ref}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            heading.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Thông số kỹ thuật</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Sức mạnh thực sự của PS5</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((item, i) => (
            <SpecCard key={item.label} {...item} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SpecCardProps {
  icon: typeof Cpu;
  label: string;
  value: string;
  detail: string;
  delay: number;
}

function SpecCard({ icon: Icon, label, value, detail, delay }: SpecCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-3xl border border-slate-200 dark:border-slate-800 p-8 hover:border-sky-400 hover:shadow-lg transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Icon className="w-10 h-10 text-sky-600 dark:text-sky-400 mb-6" />
      <h3 className="text-2xl font-semibold mb-1 text-slate-900 dark:text-white">{label}</h3>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
      <p className="text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}
