"use client";

import Link from "next/link";
import {
    ArrowRight,
    Bot,
    CheckCircle2,
    Database,
    Zap,
} from "lucide-react";

export default function AiSolutionsSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/30 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#004D97]/10 text-[#004D97] dark:bg-[#004D97]/20 px-4 py-1 rounded-full text-sm mb-4">
                        <Bot className="w-4 h-4" />
                        <span>Service 02</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        AI <span className="text-[#004D97]">Solutions</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Automate operations, improve customer engagement, and increase efficiency using AI systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#004D97]/10 rounded-lg flex items-center justify-center mb-4">
                            <Bot className="w-6 h-6 text-[#004D97]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Starter AI Package</h3>
                        <div className="text-2xl font-bold text-[#004D97] mb-2">KES 15,000</div>
                        <div className="text-sm text-gray-500 mb-4">+ KES 2,000/month support</div>
                        <ul className="space-y-2 mb-6 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> AI chatbot (WhatsApp/Website)</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> FAQ automation</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Basic customer handling system</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border-2 border-[#004D97] shadow-lg relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#004D97] text-white px-3 py-0.5 rounded-full text-xs font-semibold">POPULAR</div>
                        <div className="w-12 h-12 bg-[#004D97]/10 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-[#004D97]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Growth AI Package</h3>
                        <div className="text-2xl font-bold text-[#004D97] mb-2">KES 25,000</div>
                        <div className="text-sm text-gray-500 mb-4">+ KES 4,000/month support</div>
                        <ul className="space-y-2 mb-6 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> AI chatbot + lead qualification</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> CRM integration</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Automated responses + workflows</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Basic analytics dashboard</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-[#004D97]/10 rounded-lg flex items-center justify-center mb-4">
                            <Database className="w-6 h-6 text-[#004D97]" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise AI Package</h3>
                        <div className="text-2xl font-bold text-[#004D97] mb-2">KES 40,000</div>
                        <div className="text-sm text-gray-500 mb-4">+ KES 6,000/month support</div>
                        <ul className="space-y-2 mb-6 text-sm">
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Custom AI workflows</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Advanced automation systems</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Business intelligence dashboards</li>
                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Multi-platform AI integration</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-[#004D97]/5 dark:bg-[#004D97]/10 rounded-xl p-5 sm:p-6 border border-[#004D97]/20">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Training & Adoption</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">Staff AI awareness training, prompt engineering basics, AI tools adoption for business teams</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="text-xl sm:text-2xl font-bold text-[#004D97]">KES 7,000 per session</span>
                        <Link href="/contacts" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#004D97] hover:bg-[#003d7a] text-white rounded-lg transition-all text-sm sm:text-base">
                            Book Training <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}