// components/Hero

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { CustomSpotlight } from "@/components/ui/CustomSpotlight";
import { SparklesPreview } from "@/components/SparklesPreview";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import {
  FaHome as IconHome,
  FaUser as IconUser,
  FaEnvelope as IconMessage,
} from "react-icons/fa";
import MarqueeText from "@/components/MarqueeText";

const Hero: React.FC = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  const fadeSlideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section
      id="hero-section"
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden "
    >
      {/* Floating Navbar */}
      <div className="fixed top-5 left-0 w-full z-[10]">
        <FloatingNav navItems={navItems} />
      </div>

      {/* Spotlight Effects */}
      <div className="absolute inset-0">
        <Spotlight className="h-[50vh] w-[50vw] top-0 left-0" fill="pink" />
        <Spotlight className="h-[50vh] w-[50vw] top-0 right-0" fill="purple" />
        <Spotlight className="h-[50vh] w-[50vw] bottom-0 left-0" fill="blue" />
      </div>

      {/* Tambahan Custom Spotlight */}
      <div className="absolute top-10 right-10 z-10">
        <CustomSpotlight className="h-[300px] w-[300px]" />
      </div>

      {/* Sparkles Preview */}
      <div className="flex justify-center relative mt-10">
        <SparklesPreview />
      </div>

      {/* Marquee Text (Animated) */}
      <motion.div
        variants={fadeSlideVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 w-full"
      >
        <MarqueeText />
      </motion.div>
    </section>
  );
};

export default Hero;
