import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { HoverEffect } from "@/components/ui/CardHover";
import { memberItems } from "@/data/members";

const OurMember: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Viewport State:", entry.isIntersecting);
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0, rootMargin: "200px 0px -50px 0px" } // Lebih sensitif
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      id="our-member"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden z-[1]"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Lebih cepat
    >
      {/* Sparkles */}
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={1.5}
        particleDensity={100}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        particleColor="#FFFFFF"
      />

      {/* Title */}
      <motion.h1
        className="absolute top-10 left-5 right-5 z-10 text-3xl md:text-6xl font-bold text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} // Sedikit lebih cepat
      >
        OUR MEMBER
      </motion.h1>

      {/* Cards */}
      <div className="relative z-10 pt-16 px-5">
        <HoverEffect
          items={memberItems.map((member) => ({
            ...member,
            content: (
              <div>
                <div className="text-lg font-bold">{member.title}</div>
                {member.role && (
                  <div className="text-sm text-gray-400 mt-1">
                    {member.role}
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </div>
    </motion.section>
  );
};

export default OurMember;
