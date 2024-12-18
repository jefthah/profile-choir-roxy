"use client";
import React, { useEffect, useRef } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OurMember from "@/components/OurMember";
import Join from "@/components/Join"; // Import komponen Join

const Page: React.FC = () => {
  const sections = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            if (sectionId) {
              // Update URL sesuai dengan ID section
              window.history.replaceState(null, "", `#${sectionId}`);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    // Observasi semua section yang memiliki ID
    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-black flex flex-col items-center overflow-hidden">
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={1.5}
        particleDensity={100}
        className="absolute inset-0 w-full h-full z-0"
        particleColor="#FFFFFF"
      />

      {/* Hero Section */}
      <div
        id="hero"
        ref={(el) => {
          if (el) sections.current.push(el);
        }}
        className="w-full relative z-10"
      >
        <Hero />
      </div>

      {/* About Section */}
      <div
        id="about"
        ref={(el) => {
          if (el) sections.current.push(el);
        }}
        className="w-full relative"
      >
        <About />
      </div>

      {/* Our Member Section */}
      <div
        id="our-member"
        ref={(el) => {
          if (el) sections.current.push(el);
        }}
        className="w-full relative"
      >
        <OurMember />
      </div>

      {/* Join Section */}
      <div
        id="join"
        ref={(el) => {
          if (el) sections.current.push(el);
        }}
        className="w-full relative"
      >
        <Join />
      </div>
    </div>
  );
};

export default Page;
