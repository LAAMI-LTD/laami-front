"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Building, Users, Briefcase, X } from "lucide-react";
import { BusinessStructure } from "./types";

interface BusinessStructuresProps {
  businessStructures: BusinessStructure[];
}

export default function BusinessStructures({
  businessStructures,
}: BusinessStructuresProps) {
  const icons = [Building, Users, Briefcase];
  const [selectedStructure, setSelectedStructure] =
    useState<BusinessStructure | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber = "+254707848528";
  const whatsappNumber = "254707848528";

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Professional WhatsApp message with user details
  const handleWhatsApp = (structureName: string) => {
    const { name, email, phone } = formData;

    // Validate required fields
    if (!name.trim()) {
      alert("Please enter your name before sending a WhatsApp message.");
      return;
    }

    const message = encodeURIComponent(
      `Hello,

My name is ${name}, and I am interested in starting a ${structureName} business.

📋 Contact Information:
• Name: ${name}
• Email: ${email || "Not provided"}
• Phone: ${phone || "Not provided"}

I would like to learn more about:
• The registration process
• Requirements and legal obligations
• How your services can assist me in getting started

Kindly provide guidance at your earliest convenience.

Thank you!

---
Sent via Business Registration Portal`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Close modal when clicking outside on mobile
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedStructure(null);
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedStructure(null);
      }
    };

    if (selectedStructure) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedStructure]);

  return (
    <div className="antialiased sm:px-1 px-2">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
        Which Business Structure Fits Your Dream?
      </h3>
      <p className="text-sm sm:text-base md:text-[15px] text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-6">
        Not sure which path is right for you? Most entrepreneurs choose one of
        these three options. We&apos;ll help you pick the perfect fit during our
        consultation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessStructures.map((structure, index) => {
          const Icon = icons[index];
          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedStructure(structure)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedStructure(structure);
                }
              }}
              className="group bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-6
hover:border-[#004d98] dark:hover:border-blue-500
transition-all duration-300 ease-out
hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-[#004d98] dark:text-blue-500">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white">
                    {structure.name}
                  </h4>
                  <p className="text-[#a50044] dark:text-pink-500 text-sm">
                    {structure.tagline}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {structure.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <div className="w-2 h-2 bg-[#a50044] dark:bg-pink-500 rounded-full mt-2 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => setSelectedStructure(structure)}
                  className="text-[#004d98] dark:text-blue-500 hover:text-[#003d7a] dark:hover:text-blue-600 text-sm font-medium inline-flex items-center gap-1"
                >
                  Is this right for me? <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal with full details */}
      {selectedStructure && (
        <div
          className="fixed top-30 sm:top-20 inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            {/* Floating Close Button in Mid-Right */}
            <button
              onClick={() => setSelectedStructure(null)}
              className={`
          absolute top-1/2 right-0 -translate-y-1/2 
          w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg 
          flex items-center justify-center rounded-l-full
          text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500
        `}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4 sm:p-6">
              {/* Modal Header */}
              <div className="pr-10">
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedStructure.name}
                </h4>
                <p className="text-[#a50044] dark:text-pink-500 text-sm sm:text-base mb-4">
                  {selectedStructure.tagline}
                </p>
              </div>

              {/* Description */}
              {selectedStructure.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  {selectedStructure.description}
                </p>
              )}

              {/* Benefits */}
              {selectedStructure.benefits.length > 0 && (
                <>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Benefits:
                  </h5>
                  <ul className="space-y-2 mb-4">
                    {selectedStructure.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                      >
                        <div className="w-2 h-2 bg-[#a50044] dark:bg-pink-500 rounded-full mt-2 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Contact Information Form */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                  Share your details for personalized assistance:
                </h5>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 XXX XXX XXX"
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => handleWhatsApp(selectedStructure.name)}
                  disabled={!formData.name.trim()}
                  className={`
                    flex-1 py-3 px-4 rounded-lg flex items-center justify-center 
                    transition-colors font-semibold text-sm sm:text-base
                    ${
                      !formData.name.trim()
                        ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-[#25D366] text-white hover:bg-[#1ebe57] active:scale-[0.98]"
                    }
                  `}
                >
                  {isMobile ? "WhatsApp" : "Send WhatsApp Message"}
                </button>
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-[0.98] text-sm sm:text-base"
                >
                  {isMobile ? "Call Now" : `Call ${phoneNumber}`}
                </a>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                * Name is required to send WhatsApp message
              </p>
            </div>

            {/* Swipe indicator for mobile (optional) */}
            {isMobile && (
              <div className="sticky bottom-0 left-0 right-0 py-2 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 text-center">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-1"></div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Swipe down to close
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
