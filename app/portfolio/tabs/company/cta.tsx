// components/tab-content/company/CTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <div className="text-center pt-8 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          href="/contacts"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#004d98] dark:bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-[#003d7a] dark:hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          Start Your Business Journey
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/downloads/stress-free-business-guide.pdf"
          className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 border-2 border-[#a50044] dark:border-pink-500 text-[#a50044] dark:text-pink-500 rounded-lg font-medium text-lg hover:bg-[#a50044] hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-all duration-300 group"
          download
        >
          Get Free Setup Guide
        </Link>
      </div>
      <p className="mt-8 text-gray-600 dark:text-gray-400">
        Still wondering where to begin? Let&apos;s chat about your vision –
        <a
          href="https://wa.me/254711372214?text=Hello%20I%20would%20like%20to%20book%20a%20free%2030-minute%20business%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-[#009868] dark:text-green-500 hover:text-[#003d7a] dark:hover:text-blue-600 font-medium"
        >
          Chat with us on WhatsApp
        </a>
      </p>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
        No obligation, just honest advice about your best next steps
      </p>
    </div>
  );
}