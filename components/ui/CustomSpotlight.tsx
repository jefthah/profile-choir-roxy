"use client";
import React from "react";
import { cn } from "@/lib/utils";

type CustomSpotlightProps = {
  className?: string;
};

export const CustomSpotlight = ({ className }: CustomSpotlightProps) => {
  return (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-to-r from-purple-600 via-indigo-400 to-transparent blur-3xl opacity-80",
        className
      )}
      style={{
        animation: "pulse 5s infinite",
      }}
    ></div>
  );
};
