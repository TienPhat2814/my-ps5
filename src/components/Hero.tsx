import { Cpu, HardDrive, Monitor } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const HERO_IMAGE =
  "https://herogame.vn/upload/images/img_29_05_2026/may-ps5-standard-slim-new-model-playstation-5-chinh-hang-sony-viet-nam-2_230874_6a1907b342b177.39014074.jpg";

export default function Hero() {
  const content = useScrollReveal<HTMLDivElement>();
  const stats = useScrollReveal<HTMLDivElement>();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative isolate overflow-hidden px-6 pt-14 lg:px-8 bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full bg-blue-100/50 dark:bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl py-32 sm:py-48 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={content.ref}
            className={`text-center lg:text-left transition-all duration-700 ease-out ${
              content.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block rounded-full bg-sky-100 dark:bg-sky-500/10 px-4 py-1 text-sm font-medium text-sky-700 dark:text-sky-400">
              Thế hệ console mới
            </span>
            <h1 className="mt-6 text-5xl font-semibold text-slate-900 dark:text-white sm:text-7xl">
              PlayStation 5 – Power Your Game
            </h1>
            <p className="mt-8 text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
              Trải nghiệm thế hệ console mới với tốc độ cực nhanh, đồ họa sống động
              và âm thanh 3D.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start gap-x-6">
              <a
                href="#newsletter"
                className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-200 dark:shadow-none hover:bg-sky-500 transition-colors"
              >
                Mua ngay
              </a>
              <a
                href="#specs"
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 self-center transition-colors"
              >
                Tìm hiểu thêm →
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Khung giữ chỗ cố định kích thước để tránh lệch layout (CLS) trong lúc ảnh tải */}
            <div className="relative w-80 aspect-square">
              {!imgLoaded && (
                <div
                  className="absolute inset-0 rounded-2xl bg-slate-200 dark:bg-slate-800"
                  style={{ animation: "pulse-skeleton 1.5s ease-in-out infinite" }}
                  aria-hidden="true"
                />
              )}
              <img
                src={HERO_IMAGE}
                alt="PlayStation 5"
                width={320}
                height={320}
                fetchPriority="high"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                className={`w-80 h-80 object-contain drop-shadow-2xl transition-opacity duration-500 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          ref={stats.ref}
          className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left transition-all duration-700 ease-out ${
            stats.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl bg-white/70 dark:bg-slate-800/50 p-4 shadow-sm shadow-slate-100 dark:shadow-none backdrop-blur-sm">
            <Cpu className="text-sky-600 dark:text-sky-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">CPU</h3>
              <p className="text-slate-500 dark:text-slate-400">AMD Ryzen Zen 2, 8 cores</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/70 dark:bg-slate-800/50 p-4 shadow-sm shadow-slate-100 dark:shadow-none backdrop-blur-sm">
            <HardDrive className="text-sky-600 dark:text-sky-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Storage</h3>
              <p className="text-slate-500 dark:text-slate-400">825GB SSD siêu tốc</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/70 dark:bg-slate-800/50 p-4 shadow-sm shadow-slate-100 dark:shadow-none backdrop-blur-sm">
            <Monitor className="text-sky-600 dark:text-sky-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Graphics</h3>
              <p className="text-slate-500 dark:text-slate-400">RDNA 2 GPU, 10.28 TFLOPS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
