import { useState } from "react";
import { serviceOptions } from "./serviceChoices";

type ContactProps = {
  facebookUrl: string;
  instagramUrl: string;
};

export default function Contact({ facebookUrl, instagramUrl }: ContactProps) {
  const SOCIAL_LINKS = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/laamilabs",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.318.975.975 1.256 2.242 1.318 3.608.058 1.266.069 1.646.069 4.841 0 3.195-.012 3.575-.069 4.841-.062 1.366-.343 2.633-1.318 3.608-.975.975-2.242 1.256-3.608 1.318-1.266.058-1.646.069-4.85.069-3.204 0-3.584-.012-4.85-.069-1.366-.062-2.633-.343-3.608-1.318-.975-.975-1.256-2.242-1.318-3.608C2.175 15.575 2.163 15.195 2.163 12c0-3.195.012-3.575.069-4.841.062-1.366.343-2.633 1.318-3.608.975-.975 2.242-1.256 3.608-1.318C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.773.131 4.602.443 3.635 1.41 2.668 2.377 2.356 3.548 2.297 4.827.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.059 1.279.371 2.45 1.338 3.417.967.967 2.138 1.279 3.417 1.338C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.279-.059 2.45-.371 3.417-1.338.967-.967 1.279-2.138 1.338-3.417.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.279-.371-2.45-1.338-3.417-.967-.967-2.138-1.279-3.417-1.338C15.668.014 15.259 0 12 0z" />
          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z" />
          <circle cx="18.406" cy="5.594" r="1.44" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1Zv7PtL4T3/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/laami-labs-b294a13ab",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@laamilabs?si=qHe32r0mx_7Uy5fY",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@laamilabs",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      label: "Discord",
      href: "https://discord.gg/mhu6kTgRB",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

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
      (opt) => opt.value === formData.service,
    );
    const serviceLabel = selectedService
      ? selectedService.label
      : "Not specified";

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
        <div className="max-w-7xl mx-auto">
          <div className="flex sm:flex-row flex-col items-center gap-8">
            {/* Contact Information */}
            <div className="max-w-xl space-y-6">
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
                            Komora Center, 2nd Floor
                            <br />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                              Eldoret -Kenya
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Social links */}
                    <div className="pt-4 border-t border-[#004d98]/10 dark:border-[#004d98]/20">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#004d98]/50 dark:text-[#6fa8ff]/50 mb-3">
                        Follow us
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SOCIAL_LINKS.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LAAMi LABS on ${s.label}`}
                            title={s.label}
                            className="
                          w-9 h-9 rounded-xl
                          flex items-center justify-center
                          bg-[#004d98]/8 dark:bg-[#004d98]/15
                          text-[#004d98] dark:text-[#6fa8ff]
                          hover:bg-[#004d98] hover:text-white
                          dark:hover:bg-[#004d98] dark:hover:text-white
                          border border-[#004d98]/15 dark:border-[#004d98]/30
                          transition-colors duration-150
                        "
                          >
                            {s.icon}
                          </a>
                        ))}
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
            <div className="flex-1 relative ">
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
