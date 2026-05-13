import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Structured data for LAAMI LTD & LAAMI LABS
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LAAMI LTD",
  legalName: "LAAMI LTD",
  url: "https://laamilabs.co.ke",
  logo: "https://laamilabs.co.ke/logo.png",
  brand: {
    "@type": "Brand",
    name: "LAAMI LABS",
  },
  department: {
    "@type": "Organization",
    name: "LAAMI LABS",
    url: "https://laamilabs.co.ke",
    description: "Digital solutions division of LAAMI LTD",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eldoret",
    addressRegion: "KE",
    addressCountry: "Kenya",
  },
  sameAs: [
    "https://www.facebook.com/share/1Zv7PtL4T3/",
    "https://www.instagram.com/laamilabs",
  ],
  description:
    "LAAMI LTD is the parent company of LAAMI LABS, building web and mobile apps, brand identities, and digital solutions for startups and organisations across Kenya and Africa.",
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-950 text-white">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background with ultra-wide optimization */}
          <div className="absolute inset-0">
            <Image
              src="/savanah.png"
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-90"
            />

            {/* Responsive gradient overlay for ultra-wide */}
            <div
              className="absolute inset-0 bg-gradient-to-r 
              from-gray-950/98 via-gray-950/85 to-gray-950/60 
              lg:from-gray-950/95 lg:via-gray-950/80 lg:to-gray-950/50
              xl:from-gray-950/90 xl:via-gray-950/70 xl:to-gray-950/40
              2xl:from-gray-950/85 2xl:via-gray-950/60 2xl:to-gray-950/30
              3xl:from-gray-950/80 3xl:via-gray-950/50 3xl:to-gray-950/20"
            />

            {/* Optional: Add side gradients for ultra-wide to prevent empty space */}
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-950/90 to-transparent hidden 3xl:block" />
          </div>

          {/* Content wrapper with ultra-wide responsive container */}
          <div
            className="relative z-10 w-full mx-auto
            max-w-7xl 
            lg:max-w-[80rem] 
            xl:max-w-[88rem]
            2xl:max-w-[96rem]
            3xl:max-w-[112rem]
            4xl:max-w-[128rem]
            px-4 
            sm:px-6 
            lg:px-8 
            xl:px-12 
            2xl:px-16
            3xl:px-24
            pt-24 
            sm:pt-28 
            md:pt-32 
            lg:pt-40
            pb-16 
            sm:pb-20 
            lg:pb-28
          "
          >
            {/* Main content area with responsive max-width */}
            <div
              className="
              max-w-2xl 
              lg:max-w-3xl
              xl:max-w-[42rem]
              2xl:max-w-[48rem]
              3xl:max-w-[56rem]
            "
            >
              <h1
                className="
                  font-extrabold tracking-tight leading-[1.05] mb-6
                  text-[2.8rem]
                  sm:text-[3.25rem]
                  md:text-[4rem]
                  lg:text-[4.5rem]
                  xl:text-[5rem]
                  2xl:text-[5.5rem]
                  3xl:text-[6rem]
                "
              >
                Grow your
                <br />
                <span className="text-[#a50044]">BUSINESS</span>{" "}
                <span className="text-[#004d98]">Online</span>
              </h1>

              <p
                className="text-gray-300 leading-relaxed mb-10
                text-base 
                sm:text-lg 
                md:text-xl
                lg:text-xl
                xl:text-2xl
                2xl:text-2xl
                3xl:text-3xl
                max-w-xl
                lg:max-w-2xl
                xl:max-w-3xl
              "
              >
                We help businesses attract clients, generate leads, and scale
                faster through{" "}
                <span className="font-semibold text-white">content</span>,{" "}
                <span className="font-semibold text-white">
                  paid advertising
                </span>
                , and{" "}
                <span className="font-semibold text-white">
                  custom digital solutions
                </span>{" "}
                that drive real results.
              </p>

              {/* CTA Buttons with responsive sizing */}
              <div
                className="flex flex-col sm:flex-row gap-4
                sm:gap-6
                lg:gap-8
              "
              >
                {/* Primary CTA */}
                <Link
                  href="/services"
                  className="relative overflow-hidden group inline-flex items-center justify-center
                    px-6 py-3
                    sm:px-8 sm:py-4
                    lg:px-10 lg:py-4
                    xl:px-12 xl:py-5
                    2xl:px-14 2xl:py-6
                    rounded-lg font-semibold
                    text-base 
                    sm:text-lg
                    lg:text-xl
                    xl:text-xl
                    bg-[#a50044] text-white shadow-lg
                    transition-all duration-500 hover:shadow-xl hover:shadow-[#a50044]/30
                    min-w-[12rem]
                    sm:min-w-[14rem]
                    lg:min-w-[16rem]
                  "
                >
                  <span
                    className="absolute inset-0 w-0 h-full left-0 top-0 bg-[#004d98]
                    transition-all duration-500 ease-in-out group-hover:w-full z-0"
                  />
                  <span className="relative z-10 flex items-center">
                    Explore our services
                    <ArrowRight className="ml-2 w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
                  </span>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/portfolio"
                  className="relative overflow-hidden border border-gray-700
                    px-6 py-3
                    sm:px-8 sm:py-4
                    lg:px-10 lg:py-4
                    xl:px-12 xl:py-5
                    2xl:px-14 2xl:py-6
                    rounded-lg font-medium
                    text-base 
                    sm:text-lg
                    lg:text-xl
                    xl:text-xl
                    text-gray-300
                    group inline-flex items-center justify-center
                    transition-all duration-500 hover:border-[#004d98]
                    hover:shadow-lg hover:shadow-[#004d98]/20
                    min-w-[12rem]
                    sm:min-w-[14rem]
                    lg:min-w-[16rem]
                  "
                >
                  <span
                    className="absolute inset-0 w-0 h-full top-0 left-0 bg-[#004d98]/20
                    transition-all duration-500 ease-in-out group-hover:w-full z-0"
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    View Our Work
                  </span>
                </Link>
              </div>

              {/* Optional: Add decorative elements for ultra-wide screens */}
              <div className="mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 3xl:mt-40 hidden lg:block">
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center">
                    <span className="text-sm lg:text-base">
                      Software Development
                    </span>
                  </div>
                  <div className="h-4 w-px bg-gray-700"></div>
                  <div className="flex items-center">
                    <span className="text-sm lg:text-base">
                      Legal & Compliance
                    </span>
                  </div>
                  <div className="h-4 w-px bg-gray-700"></div>
                  <div className="flex items-center">
                    <span className="text-sm lg:text-base">Brand Strategy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: Add content on the side for ultra-wide screens */}
            <div
              className="
              hidden 
              3xl:block 
              absolute right-24 top-1/2 transform -translate-y-1/2
              w-[24rem] 
              bg-gray-900/30 backdrop-blur-sm
              border border-gray-800/50
              rounded-2xl p-8
            "
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#a50044] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    End-to-end solution development
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#004d98] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Legal compliance built-in
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#a50044] to-[#004d98] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Scalable architecture from day one
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Optional: Scroll Indicator for ultra-wide screens */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-gray-400 text-sm font-medium">
                Scroll to explore
              </span>
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
