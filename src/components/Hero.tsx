import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/1b96daf7-aaa5-4e93-be4f-fc302a274cff.jpg"
          alt="Gaming setup"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div className="relative z-10 text-center text-white px-6">
        <p className="uppercase text-xs tracking-[0.4em] text-neon-green mb-6 neon-text">Профессиональное игровое оборудование</p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 uppercase leading-none">
          Победа<br /><span className="text-neon-green neon-text">начинается</span><br />с мыши
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto opacity-70 mb-10">
          Сенсоры до 36 000 DPI · Задержка 1 мс · Для чемпионов
        </p>
        <a
          href="#catalog"
          className="inline-block border border-neon-green text-neon-green font-display uppercase tracking-widest px-10 py-4 text-lg hover:bg-neon-green hover:text-black transition-all duration-300 cursor-pointer neon-border"
        >
          Смотреть каталог
        </a>
      </div>
    </div>
  );
}