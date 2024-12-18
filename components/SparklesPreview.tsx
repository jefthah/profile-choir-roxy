"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import { bible } from "../data/bible"; // Import data dari file bible.ts
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

export function SparklesPreview() {
  const [quote, setQuote] = useState(bible[0]);

  useEffect(() => {
    // Pilih kutipan secara acak dari bible setiap kali halaman di-refresh
    const randomQuote = bible[Math.floor(Math.random() * bible.length)];
    setQuote(randomQuote);
  }, []);

  // Animasi Fade-In dan Slide-Up
  const fadeInSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md relative">
      {/* Spotlight di pojok kanan atas */}
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-gradient-to-br from-purple-600 via-purple-300 to-transparent blur-3xl opacity-80 pointer-events-none z-10" />

      {/* Teks Utama */}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        className="text-center font-bold text-white relative px-4 leading-snug typewriter "
        style={{
          fontSize: "clamp(2rem, 4vw, 5rem)", // Font responsif
        }}
      >
        Tiberias <span className="text-[#CBACF9]">Choir Roxy</span>
        <span className="blinking text-[#CBACF9]">|</span>
      </motion.h1>

      {/* Gradients dan Sparkles */}
      <div className="w-full h-40 relative mt-[-5px] mb-10">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Bible Quote Section */}
      <div className="mt-[-140px] px-4 bg-black/50 rounded-lg shadow-lg mx-auto w-[50%] max-w-[25%] sm:max-w-[50%] md:max-w-[70%]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="text-center"
        >
          <p className="text-[#CBACF9] text-base sm:text-2lg md:text-2xl lg:text-4xl italic leading-relaxed whitespace-normal break-words overflow-wrap ">
            &quot;{quote.desc}&quot;
          </p>

          <p className="mt-2 text-sm text-white/75 whitespace-normal overflow-wrap">
            - {quote.gospel}
          </p>
        </motion.div>
      </div>

      {/* Infinite Moving Cards dengan Animasi */}
      <motion.div
        variants={fadeInSlideUp} // Menggunakan animasi fadeInSlideUp
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 w-full px-8 flex justify-center"
      >
        <div className="w-full max-w-screen-xl overflow-x-hidden">
          <InfiniteMovingCards
            items={[
              {
                quote: "Call me Ishmael. Some years ago...",
                name: "Herman Melville",
                title: "Moby-Dick",
              },
              {
                quote: "It was the best of times, it was the worst of times...",
                name: "Charles Dickens",
                title: "A Tale of Two Cities",
              },
              {
                quote: "To be, or not to be, that is the question...",
                name: "William Shakespeare",
                title: "Hamlet",
              },
            ]}
            direction="left"
            speed="fast"
            pauseOnHover={true}
          />
        </div>
      </motion.div>
    </div>
  );
}
