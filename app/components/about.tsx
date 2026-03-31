"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Target,
  Zap,
  Users,
  Building,
  Palette,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: "blue" | "maroon";
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current; // store the ref locally

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const features: Feature[] = [
    {
      title: "Growth-Focused Marketing",
      description:
        "We design and execute digital marketing strategies that go beyond visibility—focused on generating leads, conversions, and measurable business growth.",
      icon: Target,
      color: "blue",
    },
    {
      title: "Content That Converts",
      description:
        "From short-form videos to branded visuals, we create content engineered to capture attention, retain viewers, and drive action.",
      icon: Zap,
      color: "maroon",
    },
    {
      title: "Performance-Driven Ads",
      description:
        "We leverage data-driven paid advertising across platforms to reach the right audience, reduce wasted spend, and maximize ROI.",
      icon: CheckCircle,
      color: "blue",
    },
    {
      title: "Custom Software Solutions",
      description:
        "We build scalable websites, applications, and systems that support business operations and turn digital traffic into structured growth.",
      icon: Building,
      color: "maroon",
    },
    {
      title: "Strategic Brand Positioning",
      description:
        "We craft cohesive brand identities that communicate clarity, credibility, and consistency across all digital touchpoints.",
      icon: Palette,
      color: "blue",
    },
    {
      title: "Client-Centric Partnerships",
      description:
        "We work closely with businesses as growth partners—understanding their goals, solving real problems, and delivering long-term value.",
      icon: Users,
      color: "maroon",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-[#003d7a] dark:bg-[#003d7a]",
      border: "border-[#003d7a] dark:border-[#003d7a]",
      text: "text-[#003d7a] dark:text-blue-500",
    },
    maroon: {
      bg: "bg-[#a50044] dark:bg-[#a50044]",
      border: "border-[#a50044] dark:border-[#a50044]",
      text: "text-[#a50044] dark:text-red-700",
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 bg-white dark:bg-neutral-900 overflow-hidden"
    >
      {/* Background Image with Overlay - FIXED OPACITY */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-10"
          style={{ backgroundImage: "url(/card.png)" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/50 via-white/20 to-white/50 dark:from-gray-950/50 dark:via-gray-950/20 dark:to-gray-950/50" />
      </div>

      {/* Animated Background Shapes - INCREASED OPACITY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Sharp geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300/50 dark:border-blue-500/20 rotate-45 animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-red-300/50 dark:border-red-500/20 -rotate-12 animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-blue-400/30 dark:border-blue-400/20 rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-red-400/30 dark:border-red-400/20 -rotate-45 animate-[spin_25s_linear_infinite]" />

        {/* Sharp pattern elements */}
        <svg
          className="absolute top-0 right-0 w-64 h-64 opacity-10 dark:opacity-5 animate-[spin_30s_linear_infinite]"
          viewBox="0 0 200 200"
        >
          <polygon
            points="100,10 150,90 50,90"
            fill="currentColor"
            className="text-blue-600"
          />
          <polygon
            points="100,190 50,110 150,110"
            fill="currentColor"
            className="text-red-800"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-48 h-48 opacity-10 dark:opacity-5 animate-[spin_40s_linear_infinite_reverse]"
          viewBox="0 0 200 200"
        >
          <rect
            x="50"
            y="50"
            width="100"
            height="100"
            fill="currentColor"
            className="text-blue-600"
            transform="rotate(45 100 100)"
          />
        </svg>

        {/* Grid pattern - INCREASED VISIBILITY */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-3"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with fade-in animation */}
        <div
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className={`text-sm font-medium tracking-wider text-blue-600 dark:text-cyan-400/80 uppercase inline-block transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            Who We Are
          </span>

          <h2
            className={`text-4xl md:text-5xl font-light mt-3 mb-4 text-gray-900 dark:text-white tracking-tight transition-all duration-800 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Laami Labs
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide">
            We Help Businesses Turn Attention Into Revenue
          </p>
        </div>

        {/* Description with slide-in animation */}
        <div
          className={`bg-transparent p-4 mb-10 hover:backdrop-blur-xs shadow-lg hover:shadow-xl transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="space-y-8">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide font-light  mx-auto">
              Laami Labs is a digital marketing and software solutions company
              focused on helping businesses grow, scale, and compete effectively
              in the digital space. We combine creative content, performance
              marketing, and technology to turn visibility into measurable
              results.
            </p>

            <div
              className={`border-l-2 border-blue-500 dark:border-cyan-500/30 pl-6 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed tracking-wide italic">
                We partner with businesses from strategy to execution—building
                strong digital presence, generating consistent leads, and
                developing systems that support long-term growth.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <h3
          className={`text-2xl font-bold mb-8 text-gray-900 dark:text-white transition-all duration-800 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          What Defines Our Work
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            const Icon = feature.icon;
            const delay = 600 + index * 100;

            return (
              <div
                key={index}
                className={`relative h-full group transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: isVisible ? `${delay}ms` : "0ms",
                }}
              >
                <span
                  className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${colors.bg} rounded-lg transition-all duration-300 group-hover:mt-2 group-hover:ml-2`}
                />
                <div
                  className={`relative h-full p-6 bg-white/95 dark:bg-gray-900/95 border-2 ${colors.border} rounded-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-xl`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <Icon
                      className={`w-5 h-5 mt-1 shrink-0 ${colors.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    />
                    <h4
                      className={`text-lg leading-snug font-semibold tracking-tight ${colors.text}`}
                    >
                      {feature.title}
                    </h4>
                  </div>

                  {/* Divider */}
                  <div className="mt-4 mb-3 overflow-hidden">
                    <span
                      className={`block w-10 h-px ${colors.bg} transition-all duration-500 group-hover:w-full`}
                    />
                  </div>

                  {/* Body */}
                  <p className="text-base md:text-[1.05rem] font-normal  leading-[1.7] text-neutral-900 dark:text-white">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
