"use client";

import {
    Briefcase,
    Building2,
    Calculator,
    Settings,
} from "lucide-react";

export default function CompanySupportSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">
                <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#004D97]/10 text-[#004D97] dark:bg-[#004D97]/20 px-4 py-1 rounded-full text-sm mb-4">
                        <Briefcase className="w-4 h-4" />
                        <span>Service 05</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Company <span className="text-[#004D97]">Support</span> Services
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        Support beyond technology and marketing — setup, compliance, and financial/operational systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#004D97] mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Business Registration & Compliance</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Company registration guidance</li>
                            <li>• KRA PIN registration support</li>
                            <li>• Basic compliance advisory</li>
                            <li>• Business documentation setup</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-[#004D97] mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Financial Support Services</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Bookkeeping setup</li>
                            <li>• Expense tracking systems</li>
                            <li>• Invoicing templates</li>
                            <li>• Cash flow tracking</li>
                            <li>• Basic financial reporting</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
                        <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-[#004D97] mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">IT & Business Systems Support</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Business process digitization</li>
                            <li>• Internal systems setup</li>
                            <li>• Workflow automation</li>
                            <li>• Data organization systems</li>
                            <li>• Basic IT consultancy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}