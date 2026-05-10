"use client";

import {
    BarChart,
    Mail,
    Megaphone,
    MessageSquare,
    TrendingUp,
    Users,
} from "lucide-react";

export default function DigitalMarketingSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#95184B]/10 text-[#95184B] dark:bg-[#95184B]/20 px-4 py-1 rounded-full text-sm mb-4">
                        <Megaphone className="w-4 h-4" />
                        <span>Service 03</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Digital <span className="text-[#95184B]">Marketing</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Build online presence, attract customers, and run effective campaigns.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#95184B]" />
                            Social Media Management
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Starter Package</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">8 posts/month (Meta + TikTok) - Content creation, scheduling & posting</p>
                                <div className="text-xl font-bold text-[#95184B] mt-2">KES 5,000/month</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Growth Package</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">16 posts/month (4 posts/week) - Content strategy + scheduling + posting - Basic engagement support</p>
                                <div className="text-xl font-bold text-[#95184B] mt-2">KES 8,000/month</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-[#95184B]" />
                            Paid Advertising
                        </h3>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">Facebook / Instagram Ads setup & management, campaign monitoring & optimization, basic reporting</p>
                            <div className="text-xl font-bold text-[#95184B]">KES 5,000/month</div>
                            <p className="text-xs text-gray-500 mt-2">*Ad spend paid separately by client</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-[#95184B]/5 dark:bg-[#95184B]/10 rounded-xl p-4 sm:p-5 border border-[#95184B]/20">
                        <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-[#95184B] mb-3" />
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Marketing</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Strategic content creation that engages audiences and drives conversions.</p>
                    </div>
                    <div className="bg-[#95184B]/5 dark:bg-[#95184B]/10 rounded-xl p-4 sm:p-5 border border-[#95184B]/20">
                        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#95184B] mb-3" />
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">SEO Optimization</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Improve search rankings and drive organic traffic to your website.</p>
                    </div>
                    <div className="bg-[#95184B]/5 dark:bg-[#95184B]/10 rounded-xl p-4 sm:p-5 border border-[#95184B]/20">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#95184B] mb-3" />
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email Marketing</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Newsletter campaigns and automated email sequences.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}