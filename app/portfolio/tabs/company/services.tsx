"use client";

import { useState, useEffect } from "react";
import { FileText, X } from "lucide-react";
import { Service } from "./types";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Professional WhatsApp message for service inquiry
  const handleWhatsApp = (serviceTitle: string) => {
    const { name, email, phone, additionalInfo } = formData;

    // Validate required fields
    if (!name.trim()) {
      alert("Please enter your name before sending a WhatsApp message.");
      return;
    }

    const message = encodeURIComponent(
      `Hello,

I'm interested in your ${serviceTitle} service.

📋 Contact Information:
• Name: ${name}
• Email: ${email || "Not provided"}
• Phone: ${phone || "Not provided"}
${additionalInfo ? `• Additional Information: ${additionalInfo}` : ""}

I would like to:
• Get started with this service
• Learn more about the process and timeline
• Understand the requirements and pricing

Please contact me to discuss the next steps.

Thank you!

---
Sent via Business Registration Portal - Services Inquiry`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // Reset form when service changes
  const handleSelectService = (service: Service) => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      additionalInfo: "",
    });
    setSelectedService(service);
  };

  // Close modal when clicking outside on mobile
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedService(null);
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };

    if (selectedService) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <div>
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8">
        What We Handle For You
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:px-1 px-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-[#004d98]/50 dark:hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2 group-hover:text-[#004d98] dark:group-hover:text-blue-500 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
              <div className="text-[#004d98] dark:text-blue-500">
                <FileText className="w-8 h-8" />
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-white/10">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Typically takes
                </span>
                <p className="text-gray-900 dark:text-white font-medium">
                  {service.time}
                </p>
              </div>
              <button
                onClick={() => handleSelectService(service)}
                className="px-4 py-2 bg-[#004d98] dark:bg-blue-600 text-white rounded-lg text-sm hover:bg-[#003d7a] dark:hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95"
              >
                Let&apos;s Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for service inquiry */}
      {selectedService && (
        <div
          className="fixed top-42 sm:top-20 inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg relative">
            {/* Floating Close Button - Mid-right */}
            <button
              onClick={() => setSelectedService(null)}
              className={`
    absolute top-1/2 right-0 -translate-y-1/2
    w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg
    flex items-center justify-center rounded-l-full
    text-gray-600 dark:text-gray-400 
    hover:text-gray-900 dark:hover:text-white 
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500
  `}
              aria-label="Close service inquiry modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4 sm:p-6">
              {/* Modal Header */}
              <div className="flex items-start gap-3 mb-4 pr-10">
                <div className="text-[#004d98] dark:text-blue-500 mt-1 shrink-0">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    {selectedService.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {selectedService.description}
                  </p>
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 sm:p-4 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">
                    Processing Time
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">
                    {selectedService.time}
                  </p>
                </div>
              </div>

              {/* Contact Information Form */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">
                  Share your details to get started:
                </h5>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="service-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="service-name"
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
                        htmlFor="service-email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="service-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service-phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="service-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 XXX XXX XXX"
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="additionalInfo"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements, timeline preferences, or questions about this service..."
                      rows={3}
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#004d98] dark:focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleWhatsApp(selectedService.title)}
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

            {/* Swipe indicator for mobile */}
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
