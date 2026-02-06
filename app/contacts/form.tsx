import { useState } from "react";
import { serviceOptions } from "./serviceChoices";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 1500);
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.message) {
      alert(
        "Please fill in at least First Name, Last Name, and Message to send via WhatsApp",
      );
      return;
    }

    const phoneNumber = "+254707848528";
    
    // Find the service label
    const selectedService = serviceOptions.find(
      (opt) => opt.value === formData.service
    );
    const serviceLabel = selectedService ? selectedService.label : "Not specified";

    const message = `Hello, my name is ${formData.firstName} ${formData.lastName}. 

Service Interest: ${serviceLabel}
Email: ${formData.email || "Not provided"}
Phone: ${formData.phone || "Not provided"}

Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Sharp Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[#004d98] opacity-5 dark:opacity-10 transform rotate-45"></div>
        <div className="absolute bottom-32 right-[15%] w-48 h-48 bg-[#a50044] opacity-5 dark:opacity-10 transform -rotate-12"></div>
        <div className="absolute top-1/3 right-[20%] w-32 h-32 bg-[#004d98] opacity-10 dark:opacity-15 transform rotate-15"></div>
        <div className="absolute bottom-1/4 left-[25%] w-40 h-40 bg-[#a50044] opacity-5 dark:opacity-10 transform -rotate-30"></div>

        {/* Sharp Lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#004d98] to-[#a50044] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#a50044] to-[#004d98] opacity-10"></div>

        {/* Grid Pattern - Sharp */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#004d98 1.5px, transparent 1.5px), linear-gradient(90deg, #004d98 1.5px, transparent 1.5px)`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto px-2 py-12 lg:py-20 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Cards Container */}
              <div className="relative">
                <div className="absolute -inset-2 bg-[#004d98] dark:bg-[#004d98] rounded-2xl opacity-10 dark:opacity-10 blur-xl"></div>
                <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#004d98] rounded-full"></div>
                    Contact Info
                  </h3>

                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#004d98] rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                          <div className="relative w-12 h-12 bg-[#004d98] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={2.5}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                            Call/WhatsApp
                          </h4>
                          <a
                            href="tel:+254707848528"
                            className="text-base font-bold text-neutral-800 dark:text-neutral-200 hover:text-[#004d98] dark:hover:text-[#004d98] transition-colors"
                          >
                            +254 707 848 528
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#a50044] rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                          <div className="relative w-12 h-12 bg-[#a50044] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={2.5}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                            Email
                          </h4>
                          <a
                            href="mailto:hello@laamilabs.co.ke"
                            className="text-base text-neutral-800 dark:text-neutral-200 hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors break-all"
                          >
                            hello@laamilabs.co.ke
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="group">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#004d98] rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                          <div className="relative w-12 h-12 bg-[#004d98] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-0 transition-all duration-300">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={2.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={2.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                            Location
                          </h4>
                          <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                            Eldoret, Kenya
                            <br />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                              Serving clients globally
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Card */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/24.jpg')" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004d98]/95 to-[#004d98]/70"></div>

                <div className="relative p-8 text-white">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-xl"></div>
                      <div className="relative w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            strokeWidth={2.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-center mb-3">
                    24-Hour Response
                  </h4>
                  <p className="text-center mb-6 text-white/90 font-medium text-sm">
                    Need urgent help? We&apos;re here for you. Call us directly
                    for immediate assistance.
                  </p>
                  <a
                    href="tel:+254707848528"
                    className="flex items-center justify-center gap-2 bg-white text-[#004d98] font-bold px-6 py-3 rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={2.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-2 bg-[#a50044] dark:bg-[#a50044] rounded-2xl opacity-10 dark:opacity-10 blur-xl"></div>
              <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-2 md:p-10 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-[#a50044] rounded-full"></div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      Send a Message
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm font-medium mt-1">
                      Fill out the form below and we&apos;ll respond within 24
                      hours
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => handleFocus("firstName")}
                        onBlur={handleBlur}
                        className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:border-[#004d98] dark:focus:border-[#004d98] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 font-medium"
                      />
                      <label
                        htmlFor="firstName"
                        className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                          formData.firstName || focusedField === "firstName"
                            ? "top-2 text-xs text-[#004d98] dark:text-[#004d98]"
                            : "top-4 text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        First Name *
                      </label>
                      {focusedField === "firstName" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004d98] dark:bg-[#004d98]"></div>
                      )}
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => handleFocus("lastName")}
                        onBlur={handleBlur}
                        className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:border-[#004d98] dark:focus:border-[#004d98] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 font-medium"
                      />
                      <label
                        htmlFor="lastName"
                        className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                          formData.lastName || focusedField === "lastName"
                            ? "top-2 text-xs text-[#004d98] dark:text-[#004d98]"
                            : "top-4 text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        Last Name *
                      </label>
                      {focusedField === "lastName" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004d98] dark:bg-[#004d98]"></div>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:border-[#a50044] dark:focus:border-[#a50044] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 font-medium"
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                        formData.email || focusedField === "email"
                          ? "top-2 text-xs text-[#a50044] dark:text-[#a50044]"
                          : "top-4 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      Email Address *
                    </label>
                    {focusedField === "email" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a50044] dark:bg-[#a50044]"></div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus("phone")}
                      onBlur={handleBlur}
                      className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:border-[#004d98] dark:focus:border-[#004d98] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 font-medium"
                    />
                    <label
                      htmlFor="phone"
                      className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                        formData.phone || focusedField === "phone"
                          ? "top-2 text-xs text-[#004d98] dark:text-[#004d98]"
                          : "top-4 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      Phone Number
                    </label>
                    {focusedField === "phone" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004d98] dark:bg-[#004d98]"></div>
                    )}
                  </div>

                  {/* Service Dropdown */}
                  <div className="relative group">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => handleFocus("service")}
                      onBlur={handleBlur}
                      className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl appearance-none focus:outline-none focus:border-[#a50044] dark:focus:border-[#a50044] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 font-medium"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="service"
                      className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                        formData.service || focusedField === "service"
                          ? "top-2 text-xs text-[#a50044] dark:text-[#a50044]"
                          : "top-4 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      Service Interest
                    </label>
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {focusedField === "service" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a50044] dark:bg-[#a50044]"></div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      className="w-full px-5 py-4 bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:border-[#004d98] dark:focus:border-[#004d98] focus:bg-white dark:focus:bg-neutral-800 transition-all duration-300 resize-none font-medium pt-6"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${
                        formData.message || focusedField === "message"
                          ? "top-2 text-xs text-[#004d98] dark:text-[#004d98]"
                          : "top-4 text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      Your Message *
                    </label>
                    {focusedField === "message" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004d98] dark:bg-[#004d98]"></div>
                    )}
                  </div>

                  {/* Dual Submit Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={
                        isSubmitting ||
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email ||
                        !formData.message
                      }
                      className="group relative w-full overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#004d98] to-[#004d98]/90"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#a50044] to-[#004d98] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-base">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth={2.5}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <span>Send via Email</span>
                          </>
                        )}
                      </div>
                    </button>

                    {/* WhatsApp Submit Button */}
                    <button
                      onClick={handleWhatsAppSubmit}
                      disabled={
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.message
                      }
                      className="group relative w-full overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E]"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-base">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.491-8.418" />
                        </svg>
                        <span>Send via WhatsApp</span>
                      </div>
                    </button>
                  </div>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                      <div className="relative p-4 flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="square"
                              strokeLinejoin="miter"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="text-white">
                          <h4 className="font-bold text-base mb-1">
                            Our Email is currently not oparational
                          </h4>
                          <p className="text-sm font-medium">
                            Email us at hello@laamilabs.co.ke
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}