"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Layout,
  PenTool,
  Camera,
  TrendingUp,
  Users,
  BarChart,
  MessageSquare,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function MarketingDesignContent() {
  const [activeTab, setActiveTab] = useState<"graphics" | "social">("graphics");

  // Graphics Design Data
  const graphicsPortfolio = [
    {
      title: "Brand Identity Package",
      description:
        "Complete brand identity including logo, color palette, and brand guidelines.",
      type: "Branding",
      image: "/portfolio/brand.png",
      link: "/portfolio/graphics/branding",
    },
    {
      title: "Web & Mobile UI/UX",
      description:
        "User interface designs for web applications and mobile platforms.",
      type: "UI/UX",
      image: "/portfolio/64/home1.png",
      link: "/portfolio#software",
    },
    {
      title: "Marketing Materials",
      description:
        "Brochures, banners, and social media graphics for marketing campaigns.",
      type: "Marketing",
      image: "/portfolio/marketing.png",
      link: "/portfolio/graphics/marketing",
    },
  ];

  const graphicsServices = [
    {
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Brand Identity",
      description:
        "Logo design, color theory, typography, and complete brand guidelines.",
    },
    {
      icon: <Layout className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "UI/UX Design",
      description:
        "User-centered interface designs for web and mobile applications.",
    },
    {
      icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Illustration",
      description: "Custom illustrations, icons, and vector graphics.",
    },
    {
      icon: <Camera className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Photo Editing",
      description: "Professional photo retouching and manipulation services.",
    },
  ];

  const socialServices = [
    {
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Social Strategy",
      description:
        "Custom social media strategies aligned with business objectives.",
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Community Management",
      description: "Engaging with audiences and building brand communities.",
    },
    {
      icon: <BarChart className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Analytics & Reporting",
      description: "Detailed performance tracking and ROI analysis.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Content Creation",
      description: "High-quality content tailored for each social platform.",
    },
  ];

  // Fixed: Added dark mode color variants for black icons
  const socialPlatforms = [
    { 
      name: "Instagram", 
      icon: <FaInstagram />, 
      color: "#E4405F",
      darkColor: "#E4405F" // Same for dark mode
    },
    { 
      name: "Facebook", 
      icon: <FaFacebookF />, 
      color: "#1877F2",
      darkColor: "#1877F2"
    },
    { 
      name: "TikTok", 
      icon: <FaTiktok />, 
      color: "#000000",
      darkColor: "#FFFFFF" // White for dark mode
    },
    { 
      name: "Twitter/X", 
      icon: <SiX />, 
      color: "#000000",
      darkColor: "#FFFFFF" // White for dark mode
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedinIn />, 
      color: "#0A66C2",
      darkColor: "#0A66C2"
    },
    { 
      name: "YouTube", 
      icon: <FaYoutube />, 
      color: "#FF0000",
      darkColor: "#FF0000"
    },
  ];

  const designProcess = [
    {
      step: "01",
      title: "Discovery",
      desc: "Understanding your brand and goals",
    },
    { step: "02", title: "Concept", desc: "Creating initial design concepts" },
    { step: "03", title: "Refinement", desc: "Iterating based on feedback" },
    { step: "04", title: "Delivery", desc: "Final files and style guides" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 px-4 sm:px-0">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
          Marketing &{" "}
          <span className="text-[#004d98] dark:text-blue-500">Design</span>{" "}
          Services
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
          Comprehensive creative solutions from brand design to social media
          marketing, delivering visual excellence and measurable results for
          your business.
        </p>
      </div>

      {/* Tab Navigation - Mobile Optimized */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-black/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-1 sm:p-1.5">
          <button
            onClick={() => setActiveTab("graphics")}
            className={`
              px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300
              ${
                activeTab === "graphics"
                  ? "bg-[#004d98] dark:bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }
            `}
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Graphics Design</span>
              <span className="xs:hidden">Design</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`
              px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300
              ${
                activeTab === "social"
                  ? "bg-[#a50044] dark:bg-pink-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }
            `}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Social Media</span>
              <span className="xs:hidden">Social</span>
            </span>
          </button>
        </div>
      </div>

      {/* Graphics Design Content */}
      {activeTab === "graphics" && (
        <div className="space-y-12 sm:space-y-16 animate-fade-in">
          {/* Services */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-6 sm:mb-8">
              Design Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {graphicsServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6 hover:border-[#004d98] dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="text-[#004d98] dark:text-blue-500 mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Showcase */}
          <div>
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
                Design Portfolio
              </h3>
              <Link
                href="/portfolio?tab=graphics"
                className="text-[#004d98] dark:text-blue-500 hover:text-[#003d7a] dark:hover:text-blue-400 transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                View All Designs <ArrowRight className="w-4 h-4" />
              </Link>
            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {graphicsPortfolio.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#004d98] dark:hover:border-blue-500 transition-all duration-500"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 dark:from-black via-black/40 dark:via-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#004d98] dark:bg-blue-600 text-white rounded-full text-xs sm:text-sm">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-medium text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300 dark:text-gray-200">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Design Process */}
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-6 sm:mb-8">
              Our Design Process
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {designProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#004d98] dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg mx-auto mb-3 sm:mb-4">
                    {process.step}
                  </div>
                  <h4 className="text-base sm:text-lg text-gray-900 dark:text-white font-medium mb-2">
                    {process.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {process.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4 sm:pt-8">
            <Link
              href="/contacts"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#004d98] dark:bg-blue-600 text-white rounded-xl font-medium text-base sm:text-lg hover:bg-[#003d7a] dark:hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Request Design Quote
            </Link>
          </div>
        </div>
      )}

      {/* Social Media Content */}
      {activeTab === "social" && (
        <div className="space-y-12 sm:space-y-16 animate-fade-in">
          {/* Services */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-6 sm:mb-8">
              Marketing Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {socialServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-5 sm:p-6 hover:border-[#a50044] dark:hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="text-[#a50044] dark:text-pink-500 mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Platforms */}
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-6 sm:mb-8">
              Platforms We Master
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
              {socialPlatforms.map((platform, index) => (
                <div key={index} className="text-center group">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: `rgba(var(--platform-rgb), 0.1)`,
                      border: `2px solid rgba(var(--platform-rgb), 0.3)`,
                    }}
                  >
                    <div
                      className="text-2xl sm:text-3xl"
                      style={{
                        color: `rgb(var(--platform-rgb))`,
                      }}
                    >
                      {platform.icon}
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">
                    {platform.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Marketing Services Section */}
          <div className="bg-gradient-to-r from-[#a50044]/10 dark:from-[#a50044]/20 to-[#004d98]/10 dark:to-[#004d98]/20 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white mb-4 sm:mb-6">
              Complete Marketing Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-800/60 p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Paid Advertising
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  Strategic Google, Facebook, Instagram, and TikTok ad campaigns
                  with A/B testing and conversion tracking.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li>• PPC Campaign Management</li>
                  <li>• Retargeting Strategies</li>
                  <li>• Conversion Rate Optimization</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800/60 p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Video Production & Editing
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  Professional video content creation for social media, YouTube,
                  and advertising campaigns.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li>• Social Media Reels & Shorts</li>
                  <li>• YouTube Content Strategy</li>
                  <li>• Commercial Video Production</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800/60 p-5 sm:p-6 rounded-lg">
                <h4 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-3">
                  Content Marketing
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  Strategic content creation that engages audiences and drives
                  conversions across all platforms.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li>• Blog & Article Writing</li>
                  <li>• Email Marketing Campaigns</li>
                  <li>• SEO-Optimized Content</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4 sm:pt-8">
            <Link
              href="/contacts"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#a50044] dark:bg-pink-600 text-white rounded-xl font-medium text-base sm:text-lg hover:bg-[#8a0038] dark:hover:bg-pink-700 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Boost Your Social Presence
            </Link>
          </div>
        </div>
      )}

      {/* CSS for fade-in animation and platform colors */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
      
      {/* Inline styles for CSS variables */}
      <style jsx global>{`
        :root {
          --platform-instagram-rgb: 228, 64, 95;
          --platform-facebook-rgb: 24, 119, 242;
          --platform-tiktok-light-rgb: 0, 0, 0;
          --platform-tiktok-dark-rgb: 255, 255, 255;
          --platform-twitter-light-rgb: 0, 0, 0;
          --platform-twitter-dark-rgb: 255, 255, 255;
          --platform-linkedin-rgb: 10, 102, 194;
          --platform-youtube-rgb: 255, 0, 0;
        }

        .dark {
          --platform-tiktok-rgb: var(--platform-tiktok-dark-rgb);
          --platform-twitter-rgb: var(--platform-twitter-dark-rgb);
        }

        :root:not(.dark) {
          --platform-tiktok-rgb: var(--platform-tiktok-light-rgb);
          --platform-twitter-rgb: var(--platform-twitter-light-rgb);
        }

        /* Platform-specific CSS variables */
        [data-platform="instagram"] {
          --platform-rgb: var(--platform-instagram-rgb);
        }
        [data-platform="facebook"] {
          --platform-rgb: var(--platform-facebook-rgb);
        }
        [data-platform="tiktok"] {
          --platform-rgb: var(--platform-tiktok-rgb);
        }
        [data-platform="twitter"] {
          --platform-rgb: var(--platform-twitter-rgb);
        }
        [data-platform="linkedin"] {
          --platform-rgb: var(--platform-linkedin-rgb);
        }
        [data-platform="youtube"] {
          --platform-rgb: var(--platform-youtube-rgb);
        }
      `}</style>
    </div>
  );
}