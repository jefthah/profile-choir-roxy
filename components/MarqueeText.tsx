"use client";
import React, { useEffect, useRef, useState } from "react";

const MarqueeText: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(null);
  const [marqueeDirection, setMarqueeDirection] = useState<"left" | "right">("left");
  const lastScrollY = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Deteksi arah scroll
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
        setMarqueeDirection("right"); // Scroll ke bawah, marquee bergerak ke kanan
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
        setMarqueeDirection("left"); // Scroll ke atas, marquee bergerak ke kiri
      }

      lastScrollY.current = currentScrollY;

      // Reset scroll direction setelah berhenti scroll
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setScrollDirection(null), 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="relative w-full py-4 overflow-hidden bg-transparent">
      <div
        ref={marqueeRef}
        className={`marquee ${
          marqueeDirection === "left" ? "marquee-left" : "marquee-right"
        } ${scrollDirection === "down" ? "skew-down" : scrollDirection === "up" ? "skew-up" : ""}`}
      >
        <div className="flex">
          {/* Duplikasikan teks agar animasi terlihat infinite */}
          <span className="marquee-text">Tiberias Choir - We Are One, We Are Family</span>
          <span className="marquee-text">Tiberias Choir - We Are One, We Are Family</span>
          <span className="marquee-text">Tiberias Choir - We Are One, We Are Family</span>
          <span className="marquee-text">Tiberias Choir - We Are One, We Are Family</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }

        .marquee {
          display: flex;
          white-space: nowrap;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee-left {
          animation: marquee-left 10s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 10s linear infinite;
        }

        .marquee-text {
          display: inline-block;
          font-size: clamp(2rem, 4vw, 6rem);
          font-weight: bold;
          margin-right: 2rem;
          color: transparent;
          -webkit-text-stroke: 2px #cbacfa;
          text-stroke: 2px #cbacfa;
        }

        .skew-down .marquee-text {
          transform: skewX(-10deg);
        }

        .skew-up .marquee-text {
          transform: skewX(10deg);
        }
      `}</style>
    </div>
  );
};

export default MarqueeText;
