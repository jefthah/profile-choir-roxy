"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/Spotlight";

export const products = [
  { title: "Image 1", link: "#", thumbnail: "/paralax/p1.jpeg" },
  { title: "Image 2", link: "#", thumbnail: "/paralax/p2.jpeg" },
  { title: "Image 3", link: "#", thumbnail: "/paralax/p3.jpeg" },
  { title: "Image 4", link: "#", thumbnail: "/paralax/p4.jpeg" },
  { title: "Image 5", link: "#", thumbnail: "/paralax/p5.jpeg" },
  { title: "Image 6", link: "#", thumbnail: "/paralax/p6.jpeg" },
  { title: "Image 7", link: "#", thumbnail: "/paralax/p7.jpeg" },
  { title: "Image 8", link: "#", thumbnail: "/paralax/p8.jpeg" },
  { title: "Image 9", link: "#", thumbnail: "/paralax/p9.jpeg" },
  { title: "Image 10", link: "#", thumbnail: "/paralax/p10.jpeg" },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer untuk memantau viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Animasi dipicu saat 10% elemen terlihat
        rootMargin: "0px 0px -100px 0px", // Offset untuk memicu animasi lebih awal
      }
    );
  
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="w-full relative text-white overflow-hidden mt-[20px] md:mt-[-50px] z-[1]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(90, 24, 154, 0.5) 70%, rgba(0, 0, 0, 1) 100%)",
      }}
      initial={{ opacity: 0, y: 50 }} // Posisi awal
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animasi muncul/reset
      transition={{ duration: 1, ease: "easeOut" }} // Durasi animasi
    >
      {/* Multiple Spotlight Effects */}
      <Spotlight
        className="h-[25vh] sm:h-[40vh] md:h-[55vh] w-[100vw] top-[10%] sm:top-[7%] right-0 absolute z-0 opacity-20"
        fill="#8A2BE2"
      />
      <Spotlight
        className="h-[25vh] sm:h-[40vh] md:h-[55vh] w-[100vw] top-[30%] sm:top-[20%] left-0 absolute z-0 opacity-10"
        fill="#FFFFFF"
      />

      {/* Sparkle Effect */}
      <SparklesCore
        background="transparent"
        minSize={0.8}
        maxSize={2.0}
        particleDensity={50}
        className="absolute inset-0 w-full h-full z-0"
        particleColor="#FFFFFF"
      />

      {/* HeroParallax */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }} // Efek scaling awal
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} // Efek animasi
      >
        <HeroParallax products={products} />
      </motion.div>
    </motion.section>
  );
};

export default About;
