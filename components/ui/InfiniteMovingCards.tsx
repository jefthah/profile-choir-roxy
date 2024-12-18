"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  // Menggunakan useCallback untuk memastikan stabilitas fungsi
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplikasi elemen untuk efek scroll tanpa henti
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setDirection();
      setSpeed();
    }
  }, [direction, speed]);

  const setDirection = () => {
    if (containerRef.current) {
      const animationDirection =
        direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty(
        "--animation-direction",
        animationDirection
      );
    }
  };

  const setSpeed = () => {
    if (containerRef.current) {
      let duration = "40s"; // Default speed (normal)
      if (speed === "fast") duration = "20s";
      if (speed === "slow") duration = "80s";

      containerRef.current.style.setProperty(
        "--animation-duration",
        duration
      );
    }
  };

  // Efek useEffect dengan dependency addAnimation
  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden", // Layout utama
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max justify-start shrink-0 gap-12 py-4 flex-nowrap animate-scroll", // Animasi scroll
          pauseOnHover && "hover:[animation-play-state:paused]" // Pause saat hover
        )}
      >
        {items.map((item) => (
          <li
            className="min-w-[300px] md:min-w-[400px] max-w-full relative rounded-2xl border border-slate-700 px-6 py-4"
            key={item.name}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
