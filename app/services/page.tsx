"use client";

import { useEffect, useRef, useState } from "react";
import {
    Code2,
    Bot,
    Megaphone,
    Palette,
    Briefcase,
    Package,
} from "lucide-react";

import SoftwareDevelopmentSection from "./SoftwareDevelopmentSection";
import AiSolutionsSection from "./AiSolutionsSection";
import DigitalMarketingSection from "./DigitalMarketingSection";
import GraphicsPrintingSection from "./GraphicsPrintingSection";
import CompanySupportSection from "./CompanySupportSection";
import BundledSolutionsSection from "./BundledSolutionsSection";
import Footer from "../components/footer";
import ServicesHeroSection from "./ServicesHeroSection";
import ServicesCTASection from "./ServicesCTASection";
import SectionDivider from "./SectionDivider";

export default function ServicesPage() {
    // Section refs
    const softwareRef = useRef<HTMLDivElement | null>(null);
    const aiRef = useRef<HTMLDivElement | null>(null);
    const marketingRef = useRef<HTMLDivElement | null>(null);
    const designRef = useRef<HTMLDivElement | null>(null);
    const supportRef = useRef<HTMLDivElement | null>(null);
    const bundledRef = useRef<HTMLDivElement | null>(null);

    const categoriesSectionRef = useRef<HTMLElement | null>(null);

    const [showFloatingNav, setShowFloatingNav] = useState(false);
    const [activeSection, setActiveSection] = useState("software");

    // Smooth scroll + update URL hash
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Update URL without page reload
            window.history.pushState(null, "", `#${id}`);
        }
    };

    const categories = [
        {
            id: "software",
            name: "Software Development",
            icon: <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: softwareRef,
            color: "#004D97",
        },
        {
            id: "ai",
            name: "AI Solutions",
            icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: aiRef,
            color: "#95184B",
        },
        {
            id: "marketing",
            name: "Digital Marketing",
            icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: marketingRef,
            color: "#004D97",
        },
        {
            id: "design",
            name: "Graphics & Printing",
            icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: designRef,
            color: "#95184B",
        },
        {
            id: "support",
            name: "Company Support",
            icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: supportRef,
            color: "#004D97",
        },
        {
            id: "bundled",
            name: "Bundled Solutions",
            icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
            ref: bundledRef,
            color: "#95184B",
        },
    ];

    // Show floating nav after categories scroll out
    useEffect(() => {
        const categoriesSection = categoriesSectionRef.current;

        if (!categoriesSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowFloatingNav(!entry.isIntersecting);
            },
            {
                threshold: 0.15,
            }
        );

        observer.observe(categoriesSection);

        return () => observer.disconnect();
    }, []);

    // Track active section
    useEffect(() => {
        const sections = categories.map((cat) =>
            document.getElementById(cat.id)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Helper function to get button color based on category color and active state
    const getButtonColor = (catColor: string, isActive: boolean) => {
        if (isActive) return catColor;
        return "bg-white/80 dark:bg-gray-900/80";
    };

    const getMobileButtonColor = (catColor: string, isActive: boolean) => {
        if (isActive) return catColor;
        return "text-gray-700 dark:text-gray-300";
    };

    return (
        <>
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <ServicesHeroSection />

                {/* Category Navigation */}
                <section
                    ref={categoriesSectionRef}
                    className="py-8 sm:py-14 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, #95184B08 0%, #004D9708 50%, #95184B08 100%)"
                    }}
                >
                    {/* Decorative Theme Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#95184B]/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#004D97]/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] relative z-10">
                        {/* Mobile Bento Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-5">
                            {categories.map((cat, index) => (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollToSection(cat.id)}
                                    className={`
                        group relative overflow-hidden rounded-3xl
                        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                        backdrop-blur-sm p-4 sm:p-6
                        
                        ${index === 0 ? "col-span-2 md:col-span-1" : ""}
                        ${index === 3 ? "col-span-2 md:col-span-1" : ""}
                        
                        // Theme-based styling
                        ${cat.color === "#004D97"
                                            ? "bg-gradient-to-br from-white via-[#004D97]/5 to-white dark:from-gray-900 dark:via-[#004D97]/10 dark:to-gray-900 border-[#004D97]/30 hover:border-[#004D97]/60"
                                            : "bg-gradient-to-br from-white via-[#95184B]/5 to-white dark:from-gray-900 dark:via-[#95184B]/10 dark:to-gray-900 border-[#95184B]/30 hover:border-[#95184B]/60"
                                        }
                        border-2
                    `}
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                                        style={{
                                            background: cat.color
                                        }}
                                    />

                                    {/* Pulsing Background */}
                                    <div
                                        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${cat.color}40, ${cat.color}10)`,
                                        }}
                                    />

                                    {/* Content */}
                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col justify-between group">

                                        {/* Icon */}
                                        <div
                                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group"
                                            style={{
                                                background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}05)`,
                                                boxShadow: `0 4px 12px ${cat.color}20`,
                                                color: cat.color,
                                            }}
                                        >
                                            <div className="transition-colors duration-300 group-hover:text-white">
                                                {cat.icon}
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="mt-1">
                                            <h3 className="text-sm text-start sm:text-lg font-bold tracking-[-0.02em] text-gray-900 dark:text-white leading-tight transition-colors duration-300 group-hover:text-white">
                                                {cat.name}
                                            </h3>

                                            {/* Explore */}
                                            <div className="mt-3 flex items-center text-xs sm:text-sm font-semibold transition-all duration-300 group-hover:translate-x-2">
                                                <span className="text-gray-500 group-hover:text-white transition-colors duration-300">
                                                    Explore
                                                </span>

                                                <span className="ml-1 text-gray-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent Bar */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                        style={{
                                            background: `linear-gradient(90deg, ${cat.color}, ${cat.color}40)`,
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Sections */}

                {/* Services Sections */}

                <div
                    id="software"
                    ref={softwareRef}
                    className="scroll-mt-24"
                >
                    <SoftwareDevelopmentSection />
                </div>

                <SectionDivider />

                <div
                    id="ai"
                    ref={aiRef}
                    className="scroll-mt-24"
                >
                    <AiSolutionsSection />
                </div>

                <SectionDivider flip />

                <div
                    id="marketing"
                    ref={marketingRef}
                    className="scroll-mt-24"
                >
                    <DigitalMarketingSection />
                </div>

                <SectionDivider />

                <div
                    id="design"
                    ref={designRef}
                    className="scroll-mt-24"
                >
                    <GraphicsPrintingSection />
                </div>

                <SectionDivider flip />

                <div
                    id="support"
                    ref={supportRef}
                    className="scroll-mt-24"
                >
                    <CompanySupportSection />
                </div>

                <SectionDivider />

                <div
                    id="bundled"
                    ref={bundledRef}
                    className="scroll-mt-24"
                >
                    <BundledSolutionsSection />
                </div>

                {/* Floating Desktop Navigation */}
                <div
                    className={`hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[999] flex-col gap-3 transition-all duration-500 ${showFloatingNav
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10 pointer-events-none"
                        }`}
                >
                    {categories.map((cat) => {
                        const isActive = activeSection === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => scrollToSection(cat.id)}
                                className={`group relative flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 ${isActive
                                    ? `text-white border-[${cat.color}]`
                                    : `${getButtonColor(cat.color, isActive)} text-gray-700 dark:text-gray-300 border-white/20`
                                    }`}
                                style={{
                                    backgroundColor: isActive ? cat.color : undefined,
                                    borderColor: isActive ? cat.color : undefined,
                                }}
                                title={cat.name}
                            >
                                <div style={{ color: isActive ? "white" : cat.color }}>
                                    {cat.icon}
                                </div>

                                {/* Tooltip */}
                                <span className="absolute left-16 whitespace-nowrap px-3 py-2 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    style={{
                                        backgroundColor: cat.color
                                    }}
                                >
                                    {cat.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Floating Mobile Bottom Navigation */}
                <div
                    className={`lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 ${showFloatingNav
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10 pointer-events-none"
                        }`}
                >
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-white/20 shadow-2xl">
                        {categories.map((cat) => {
                            const isActive = activeSection === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollToSection(cat.id)}
                                    className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${isActive
                                        ? "text-white"
                                        : getMobileButtonColor(cat.color, isActive)
                                        }`}
                                    style={{
                                        backgroundColor: isActive ? cat.color : undefined,
                                    }}
                                >
                                    <div style={{ color: isActive ? "white" : cat.color }}>
                                        {cat.icon}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <ServicesCTASection />
            </div>
            <Footer />
        </>
    );
}