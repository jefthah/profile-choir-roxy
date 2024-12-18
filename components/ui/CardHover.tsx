import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    instagramLink: string;
    imageSrc: string;
    content?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // IntersectionObserver untuk mendeteksi card aktif di mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetIndex = cardRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            setVisibleIndex(targetIndex);
          }
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -20% 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => !isMobile && setHoveredIndex(idx)} // Hover hanya untuk desktop
          onMouseLeave={() => !isMobile && setHoveredIndex(null)}
        >
          <AnimatePresence>
            {(!isMobile && hoveredIndex === idx) ||
            (isMobile && visibleIndex === idx) ? (
              <motion.div
                className="absolute inset-0 h-full w-full bg-[#18212F] dark:bg-[#6A0DAD]/[0.6] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            ) : null}
          </AnimatePresence>
          <Card
            imageSrc={item.imageSrc}
            instagramLink={item.instagramLink}
            isActive={visibleIndex === idx && isMobile}
          >
            {item.content ? item.content : <CardTitle>{item.title}</CardTitle>}
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  children,
  imageSrc,
  instagramLink,
  isActive,
}: {
  className?: string;
  children: React.ReactNode;
  imageSrc: string;
  instagramLink: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border-2 border-[#18212F] relative z-20",
        "group-hover:border-[#6A0DAD]",
        isActive && "border-[#6A0DAD]"
      )}
    >
      {/* Layout diubah dengan breakpoint */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-48 lg:flex-shrink-0 relative mt-4">
          <img
            src={imageSrc}
            alt="Member"
            loading="lazy"
            className="w-full h-[300px] md:h-[256px] object-cover object-center rounded-2xl"
          />
        </div>
        <div className="w-full text-center lg:text-left">
          {children}
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex justify-center lg:justify-start items-center space-x-2 text-[#E1306C] hover:text-[#C13584]"
          >
            <FaInstagram size={20} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
      className
    )}
  >
    {children}
  </p>
);
