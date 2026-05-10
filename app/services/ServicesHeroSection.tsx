"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ServicesHeroSection() {
    return (
        <section className="relative overflow-hidden py-32 sm:py-24 lg:py-32 text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/service.avif"
                    alt="Office background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Theme Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004D97]/70 via-[#004D97]/60 to-[#95184B]/65" />

                {/* Soft Gradient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-[-0.04em] leading-[0.95] mb-6">
                        Modern Services
                        <span className="block text-white/75 font-medium">
                            Built for Growth
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-8 text-white/75 font-normal mb-8 sm:mb-10">
                        Complete digital solutions for modern businesses —
                        from software development and AI automation to
                        marketing, design, and operational support.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contacts"
                            className="group inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm sm:text-base font-medium text-[#004D97] transition-all duration-300 hover:scale-[1.02] hover:bg-white/95"
                        >
                            Get Started

                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/portfolio"
                            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:bg-white/15"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}