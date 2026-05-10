"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesCTASection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-[#004D97] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Ready to Transform Your Business?
                </h2>

                <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    Let's discuss your needs and create a custom solution
                    that drives real results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contacts"
                        className="inline-flex items-center px-6 sm:px-8 py-3 bg-white text-[#004D97] hover:bg-gray-100 rounded-lg font-semibold transition-all text-sm sm:text-base"
                    >
                        Contact Us Today
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>

                    <Link
                        href="/portfolio"
                        className="inline-flex items-center px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all text-sm sm:text-base"
                    >
                        View Our Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
}