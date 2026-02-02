// components/tab-content/company/Heading.tsx
import { MapPin } from "lucide-react";

export default function Heading() {
  return (
    <div className="text-center px-2">
      <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
        Launch Your{" "}
        <span className="text-[#004d98] dark:text-blue-500">
          COMPANY
        </span>
        <br />
        <span className="text-[#a50044] dark:text-pink-500">
          Without the Headache
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
        Tired of confusing government procedures? We transform complex
        registration into a simple, stress-free process so you can focus on
        what you do best - running your business.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
        <span>
          Helping entrepreneurs launch successfully in all 47 counties
        </span>
      </div>
    </div>
  );
}