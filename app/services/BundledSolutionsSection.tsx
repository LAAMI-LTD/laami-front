"use client";

import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Package,
    Rocket,
    Sparkles,
    TrendingUp,
} from "lucide-react";

export default function BundledSolutionsSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#95184B]/10 text-[#95184B] dark:bg-[#95184B]/20 px-4 py-1 rounded-full text-sm mb-4">
                        <Package className="w-4 h-4" />
                        <span>Service 06</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Bundled <span className="text-[#95184B]">Solutions</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Complete packages that combine multiple services for maximum value.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#95184B]/10 rounded-lg flex items-center justify-center mb-4">
                            <Rocket className="w-6 h-6 text-[#95184B]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Startup Launch Package</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">Perfect for new businesses.</p>
                        <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Logo design</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Website (landing page or multipage)</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Social media setup</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Basic AI chatbot</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Business registration support</li>
                        </ul>
                        <div className="text-lg sm:text-xl font-bold text-[#95184B]">KES 30,000 - 80,000</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border-2 border-[#95184B] shadow-lg relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#95184B] text-white px-3 py-0.5 rounded-full text-xs font-semibold">RECOMMENDED</div>
                        <div className="w-12 h-12 bg-[#95184B]/10 rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-[#95184B]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">SME Growth Package</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">For scaling businesses.</p>
                        <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Website or web app</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Social media management</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Ads management</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> AI automation system</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Basic financial systems setup</li>
                        </ul>
                        <div className="text-lg sm:text-xl font-bold text-[#95184B]">KES 80,000 - 200,000</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#95184B]/10 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-[#95184B]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Digital Transformation Package</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">For established businesses.</p>
                        <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Fullstack system</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> AI automation + workflows</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Branding + marketing system</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Financial reporting system</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Business process optimization</li>
                        </ul>
                        <div className="text-lg sm:text-xl font-bold text-[#95184B]">KES 200,000+</div>
                    </div>
                </div>

                {/* Business Launch Package */}
                <div className="mt-10 sm:mt-12 bg-[#004D97] rounded-xl p-6 sm:p-8 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Business Launch Package</h3>
                    <p className="text-white/80 mb-4 text-sm sm:text-base">Complete end-to-end business setup solution</p>
                    <div className="text-2xl sm:text-3xl font-bold mb-4">KES 80,000</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Website Development</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Logo & Brand Identity</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Social Media Setup</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> AI Chatbot Setup</li>
                        </ul>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Business Support Services</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 30 Days Post-Launch Support</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Marketing Materials</li>
                        </ul>
                    </div>
                    <Link href="/contacts" className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#004D97] rounded-lg font-semibold hover:bg-gray-100 transition-all text-sm sm:text-base">
                        Get This Package <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}