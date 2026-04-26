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

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 uppercase">
          Победа<br />начинается<br />с мыши
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Профессиональные игровые мыши с сенсорами до 36 000 DPI — для тех, кто играет на победу
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
          Смотреть каталог
        </button>
      </div>
    </div>
  );
}