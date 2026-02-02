import { Code, Smartphone, Database, Cloud } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom web applications using modern frameworks and best practices.",
      color: "#a50044",
      pattern: "dots",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Apps",
      description:
        "iOS & Android applications with native performance and intuitive UI.",
      color: "#004d98",
      pattern: "grid",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend Solutions",
      description: "Scalable APIs, databases, and server infrastructure.",
      color: "#a50044",
      pattern: "diagonal",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Deployment",
      description:
        "Secure cloud hosting, CI/CD pipelines, and DevOps services.",
      color: "#004d98",
      pattern: "circuit",
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const cardWidth = 288;
  const totalCards = services.length;

  // Auto-scroll effect
  useEffect(() => {
    if (
      !isAutoScrolling ||
      isDragging ||
      typeof window === "undefined" ||
      window.innerWidth >= 768
    )
      return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (currentIndex + 1) % totalCards;
        setCurrentIndex(nextIndex);

        carouselRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isAutoScrolling, isDragging, currentIndex, totalCards]);

  // Handle touch/mouse start
  const handleStart = useCallback((clientX: number) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setIsAutoScrolling(false);
    setStartX(clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
    setVelocity(0);
    setLastX(clientX);
    setLastTime(Date.now());
  }, []);

  // Handle move with velocity calculation
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !carouselRef.current) return;

      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        const deltaX = clientX - lastX;
        const newVelocity = deltaX / deltaTime;
        setVelocity(newVelocity);
      }

      const x = clientX;
      const walk = (x - startX) * 1.5;
      carouselRef.current.scrollLeft = scrollLeft - walk;

      setLastX(clientX);
      setLastTime(currentTime);
    },
    [isDragging, startX, scrollLeft, lastX, lastTime],
  );

  // Handle end with momentum and snap
  const handleEnd = useCallback(() => {
    if (!carouselRef.current) return;

    setIsDragging(false);

    const momentum = velocity * 300;
    const targetScroll = carouselRef.current.scrollLeft - momentum;

    const snapIndex = Math.round(targetScroll / cardWidth);
    const clampedIndex = Math.max(0, Math.min(snapIndex, totalCards - 1));

    setCurrentIndex(clampedIndex);

    carouselRef.current.scrollTo({
      left: clampedIndex * cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => setIsAutoScrolling(true), 2000);
  }, [velocity, totalCards]);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX);
    },
    [handleStart],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove],
  );

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleStart(e.clientX);
      e.preventDefault();
    },
    [handleStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [handleMove, isDragging],
  );

  // Clean up mouse events
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) handleEnd();
    };

    const handleMouseLeave = () => {
      if (isDragging) handleEnd();
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, handleEnd]);

  // Manual navigation
  const goToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;

    setIsAutoScrolling(false);
    setCurrentIndex(index);

    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, []);

  const getPatternSVG = (pattern: string, color: string) => {
    const patterns = {
      dots: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="${color}" opacity="0.15"/></svg>`,
      grid: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 20 20 L 0 20" stroke="${color}" stroke-width="1" fill="none" opacity="0.15"/></svg>`,
      diagonal: `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M 0 20 L 20 0" stroke="${color}" stroke-width="2" opacity="0.15"/></svg>`,
      circuit: `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M 0 20 L 20 20 L 20 0 M 20 40 L 20 20 L 40 20" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.15"/><circle cx="20" cy="20" r="2" fill="${color}" opacity="0.2"/></svg>`,
    };
    return patterns[pattern as keyof typeof patterns] || patterns.dots;
  };

  return (
    <div className="relative">
      <h3 className="text-2xl font-medium text-center text-[#004d98] dark:text-white mb-8">
        Our Services
      </h3>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white/90 dark:bg-black/40 backdrop-blur-sm border-2 rounded-xl p-6 overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
            style={{
              borderColor: service.color,
            }}
          >
            {/* Animated Background Pattern */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(getPatternSVG(service.pattern, service.color))}")`,
                backgroundRepeat: "repeat",
              }}
            />

            {/* Animated Corner Accent */}
            <div
              className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 rotate-45 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6"
              style={{
                backgroundColor: service.color,
                opacity: 0.1,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex-grow">
              <div
                className="mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
                style={{ color: service.color }}
              >
                {service.icon}
              </div>
              <h4
                className="text-xl font-medium mb-2 transition-all duration-300"
                style={{ color: service.color }}
              >
                {service.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-100">
                {service.description}
              </p>
            </div>

            <Link
              href="/contacts"
              className="relative z-10 mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
              style={{
                backgroundColor: service.color,
                color: "white",
                display: "block",
              }}
            >
              Get Started
            </Link>

            {/* Animated Bottom Bar */}
            <div
              className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
              style={{
                backgroundColor: service.color,
              }}
            />
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollBehavior: isDragging ? "auto" : "smooth",
            scrollSnapType: "x mandatory",
            scrollPadding: "0 16px",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="relative shrink-0 w-full mx-2 bg-white/90 dark:bg-black/40 backdrop-blur-sm border-2 rounded-xl p-6 overflow-hidden group snap-center transform transition-all duration-300 flex flex-col"
              style={{
                scrollSnapAlign: "center",
                borderColor: service.color,
              }}
            >
              {/* Animated Background Pattern */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(getPatternSVG(service.pattern, service.color))}")`,
                  backgroundRepeat: "repeat",
                  opacity: currentIndex === index ? 0.5 : 0,
                }}
              />

              {/* Animated Corner Accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 transform transition-all duration-500"
                style={{
                  backgroundColor: service.color,
                  opacity: 0.1,
                  transform:
                    currentIndex === index
                      ? "translate(2rem, -2rem) rotate(45deg)"
                      : "translate(3rem, -3rem) rotate(45deg)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex-grow">
                <div
                  className="mb-4 transition-all duration-300"
                  style={{
                    color: service.color,
                    transform:
                      currentIndex === index
                        ? "scale(1.1) rotate(3deg)"
                        : "scale(1)",
                  }}
                >
                  {service.icon}
                </div>
                <h4
                  className="text-xl font-medium mb-2"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-100 text-sm">
                  {service.description}
                </p>
              </div>

              <Link
                href="/contacts"
                className="relative z-10 mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform active:scale-95 text-center"
                style={{
                  backgroundColor: service.color,
                  color: "white",
                  display: "block",
                }}
              >
                Get Started
              </Link>

              {/* Animated Bottom Bar */}
              <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                style={{
                  backgroundColor: service.color,
                  width: currentIndex === index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: currentIndex === index ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  currentIndex === index
                    ? service.color
                    : "rgba(156, 163, 175, 0.5)",
              }}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <svg
              className="w-4 h-4 mr-2 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            Swipe for faster navigation
          </div>
        </div>
      </div>

      {/* Add custom styles for scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
