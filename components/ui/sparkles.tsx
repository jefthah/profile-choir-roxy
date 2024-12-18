"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 1,
    maxSize = 3,
    speed = 1,
    particleColor = "#FFFFFF",
    particleDensity = 200,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: { value: background },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse", // Membuat partikel menjauh saat kursor berada di area tertentu
                },
                onClick: {
                  enable: true,
                  mode: "push", // Menambahkan lebih banyak partikel saat area diklik
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                repulse: {
                  distance: 120, // Jarak antara kursor dan partikel
                  duration: 0.4, // Durasi partikel menjauh
                },
                push: {
                  quantity: 5, // Jumlah partikel yang ditambahkan saat klik
                },
                trail: {
                  delay: 0.02, // Interval partikel saat kursor bergerak
                  quantity: 10, // Jumlah partikel yang dihasilkan dalam mode trail
                  particles: {
                    size: { value: 4 },
                    color: { value: particleColor },
                  },
                },
              },
            },
            particles: {
              number: {
                value: particleDensity,
                density: {
                  enable: true,
                  width: 800, // Properti density yang benar
                  height: 800, // Ditambahkan untuk menyesuaikan area density
                },
              },
              color: {
                value: particleColor,
              },
              shape: {
                type: "circle", // Bentuk partikel
              },
              opacity: {
                value: { min: 0.3, max: 1 },
                animation: {
                  enable: true,
                  speed: 1,
                },
              },
              size: {
                value: { min: minSize, max: maxSize },
                animation: {
                  enable: true,
                  speed: speed,
                },
              },
              move: {
                enable: true,
                speed: speed,
                direction: "none",
                random: true,
                outModes: {
                  default: "out",
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
