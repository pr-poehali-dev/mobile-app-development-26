import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/c5e833f1-42d9-4936-bf08-d654d6daa744.jpg"
            alt="Technology background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <h3 className="absolute top-12 right-6 text-neon-green uppercase z-10 text-sm md:text-base lg:text-lg tracking-widest neon-text">
        Инженерия точности
      </h3>

      <p className="absolute bottom-12 right-6 text-white font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-5xl z-10 uppercase leading-tight">
        Каждая миллисекунда<br />на счету.<br /><span className="text-neon-green">Реакция — абсолютная.</span>
      </p>
    </div>
  );
}