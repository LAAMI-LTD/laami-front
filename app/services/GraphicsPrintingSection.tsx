"use client";

import {
    Palette,
    PenTool,
    Printer,
} from "lucide-react";

export default function GraphicsPrintingSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#004D97]/10 text-[#004D97] dark:bg-[#004D97]/20 px-4 py-1 rounded-full text-sm mb-4">
                        <Palette className="w-4 h-4" />
                        <span>Service 04</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Graphics <span className="text-[#004D97]">Design</span> & Printing
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Creative design solutions and branded print materials.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <PenTool className="w-5 h-5 text-[#004D97]" />
                            Graphic Design
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">Posters, Flyers, Social media designs, Brochures, Business materials</p>
                        <div className="text-xl sm:text-2xl font-bold text-[#004D97]">KES 300 per design</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-[#004D97]" />
                            Branding Design
                        </h3>
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-gray-200 dark:border-gray-700 gap-2">
                                <span className="text-gray-700 dark:text-gray-300">Logo design</span>
                                <span className="font-bold text-[#004D97]">KES 1,000</span>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <span className="text-gray-700 dark:text-gray-300">Animated logo</span>
                                <span className="font-bold text-[#004D97]">KES 2,000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-[#004D97]/5 dark:bg-[#004D97]/10 rounded-xl p-5 sm:p-6 border border-[#004D97]/20">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Printer className="w-5 h-5 text-[#004D97]" />
                        Printing Services
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Posters</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Banners</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Business cards</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Brochures</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Company profiles</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Stickers</span>
                        <span className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg text-center text-xs sm:text-sm">Branded materials</span>
                    </div>
                </div>
            </div>
        </section>
    );
}