import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/service/laptop.jpg"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-950/80 to-gray-950/70 md:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-[3.25rem] md:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] mb-6">
              Bring your
              <br />
              <span className="text-[#a50044]">IDEAS</span>{" "}
              <span className="text-[#004d98] font-extrabold">to Life</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mb-10">
              We help businesses, nonprofits, and startups move faster with{" "}
              <span className="font-semibold text-white">working software</span>
              ,{" "}
              <span className="font-semibold text-white">legal structure</span>,
              and a{" "}
              <span className="font-semibold text-white">
                professional brand
              </span>{" "}
              —built to last.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary Button */}
              <a
                href="/contacts"
                className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-base md:text-lg bg-[#a50044] text-white shadow-lg transition-all duration-500 hover:shadow-xl"
              >
                {/* Swipe Overlay */}
                <span className="absolute inset-0 w-0 h-full left-0 top-0 bg-[#004d98] transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>

                {/* Text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center">
                  Let&apos;s Talk <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </a>

              {/* Secondary Button */}
              <a
                href="/portfolio"
                className="relative overflow-hidden border border-gray-700 px-8 py-4 rounded-lg font-medium text-base md:text-lg text-gray-300 group inline-flex items-center justify-center transition-all duration-500 hover:border-[#004d98]"
              >
                {/* Swipe Overlay */}
                <span className="absolute inset-0 w-0 h-full top-0 left-0 bg-[#004d98] transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>

                {/* Text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  See What We&apos;ve Done
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
