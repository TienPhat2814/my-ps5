import { Zap, Gamepad2, Headphones, Sparkles } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const features = [
  { icon: Zap, title: "Tốc độ tải cực nhanh", desc: "SSD siêu tốc giúp game khởi động gần như tức thì, xóa bỏ hoàn toàn thời gian chờ đợi." },
  { icon: Gamepad2, title: "Tay cầm DualSense", desc: "Phản hồi lực rung thích ứng và triggers cảm ứng mang lại trải nghiệm chân thực chưa từng có." },
  { icon: Headphones, title: "Âm thanh 3D Tempest", desc: "Công nghệ âm thanh không gian đưa bạn chìm đắm hoàn toàn vào thế giới game." },
  { icon: Sparkles, title: "Đồ họa Ray Tracing", desc: "Ánh sáng, bóng đổ và phản chiếu chân thực như điện ảnh trên từng khung hình." },
];

export default function Features() {
  const heading = useScrollReveal<HTMLDivElement>();

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl">
        <div
          ref={heading.ref}
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ease-out ${
            heading.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
            Tính năng nổi bật
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
            Những công nghệ làm nên thế hệ console tiếp theo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <FeatureCard key={title} icon={Icon} title={title} desc={desc} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: typeof Zap;
  title: string;
  desc: string;
  delay: number;
}

function FeatureCard({ icon: Icon, title, desc, delay }: FeatureCardProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/10">
        <Icon className="text-sky-600 dark:text-sky-400" size={24} />
      </div>
      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}
