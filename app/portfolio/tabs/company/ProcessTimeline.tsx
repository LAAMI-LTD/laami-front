// components/tab-content/company/ProcessTimeline.tsx
import {
  ArrowRight,
  Building,
  FileText,
  Globe,
  Shield,
  MapPin,
  Users,
  Briefcase,
  CheckCircle,
  Target,
} from "lucide-react";
import { RegistrationStep } from "./types";

interface ProcessTimelineProps {
  registrationSteps: RegistrationStep[];
}

export default function ProcessTimeline({
  registrationSteps,
}: ProcessTimelineProps) {
  const icons = [
    Target,
    FileText,
    FileText,
    CheckCircle,
    Building,
    Users,
    MapPin,
    Shield,
    Briefcase,
    Globe,
    Briefcase,
    ArrowRight,
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 antialiased relative overflow-hidden">
      {/* Background Geometric Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
        {/* Sharp triangular patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#004d98]" 
             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#a50044]" 
             style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-[#004d98]" 
             style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }} />
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-[#a50044] rotate-45" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-[#004d98]" 
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
      </div>

      <div className="text-center mb-12 md:mb-16 relative z-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 animate-fade-in">
          Your Stress-Free Journey to Business Launch
        </h3>
        <p className="text-sm sm:text-base md:text-[15px] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-6 animate-fade-in-delay">
          We walk with you through every step—from your initial idea to opening
          day and beyond. No government queues, no confusing forms, just smooth
          sailing.
        </p>
      </div>

      <div className="space-y-8 relative z-10">
        {registrationSteps.map((step, index) => {
          const Icon = icons[index];
          const isEven = index % 2 === 0;
          const isLast = index === registrationSteps.length - 1;

          return (
            <div 
              key={index}
              className="animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Row */}
              <div className={`flex ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                {/* Step Number Box (Desktop) */}
                <div className="hidden md:flex flex-col items-center">
                  <div
                    className={`w-28 py-4 border-2 border-[#004d98] dark:border-blue-500 rounded-lg ${
                      isEven ? "mr-4" : "ml-4"
                    } flex flex-col items-center justify-center bg-white dark:bg-gray-800/60 shadow-sm relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
                  >
                    {/* Sharp corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#004d98] dark:bg-blue-500 opacity-10"
                         style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                    
                    <div className="text-2xl font-extrabold tabular-nums text-[#004d98] dark:text-blue-500 tracking-tight relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="text-[10px] font-semibold text-[#a50044] dark:text-pink-500 mt-1 tracking-wider uppercase relative z-10">
                      {step.days}
                    </div>
                  </div>
                  {!isLast && (
                    <div className="h-full border-l-4 border-transparent">
                      <div
                        className={`border-l-4 ${
                          isEven ? "mr-4" : "ml-4"
                        } h-full border-[#004d98]/30 dark:border-blue-500/30 border-dashed animate-dash`}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-auto border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800/40 backdrop-blur-sm hover:border-[#004d98] dark:hover:border-blue-500 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group relative overflow-hidden">
                  {/* Sharp geometric accent shapes */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#004d98] opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity duration-300"
                       style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#a50044] opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity duration-300"
                       style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
                  
                  {/* Mobile Layout */}
                  <div className="md:hidden relative z-10">
                    {/* Mobile Header with Icon */}
                    <div className="flex items-start gap-4 p-5 border-b border-gray-100 dark:border-white/5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a50044]/10 dark:bg-pink-500/20 flex items-center justify-center relative overflow-hidden group-hover:bg-[#a50044]/15 dark:group-hover:bg-pink-500/25 transition-colors duration-300">
                        {/* Small corner accent */}
                        <div className="absolute top-0 right-0 w-4 h-4 bg-[#004d98] opacity-20"
                             style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                        {Icon && (
                          <Icon className="w-6 h-6 text-[#a50044] dark:text-pink-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold uppercase mb-1 text-[#a50044] dark:text-pink-500 tracking-wider">
                          Step {index + 1} — {step.days}
                        </div>
                        <h4 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white leading-5">
                          {step.step}
                        </h4>
                      </div>
                    </div>

                    {/* Mobile Description */}
                    <div className="p-5 pt-4">
                      <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-5">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:flex-row items-center relative z-10">
                    <div className="flex-auto p-6">
                      <h4 className="text-lg lg:text-xl text-gray-900 dark:text-white font-semibold tracking-tight mb-2 leading-snug group-hover:text-[#004d98] dark:group-hover:text-blue-400 transition-colors duration-300">
                        {step.step}
                      </h4>
                      <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-6">
                        {step.desc}
                      </p>
                    </div>

                    {/* Desktop Icon */}
                    <div className="w-28 p-6 flex items-center justify-center">
                      <div className="w-18 h-18 rounded-full bg-[#a50044]/10 dark:bg-pink-500/20 flex items-center justify-center relative overflow-hidden group-hover:bg-[#a50044]/15 dark:group-hover:bg-pink-500/25 transition-all duration-300 group-hover:scale-110">
                        {/* Sharp corner accent in icon circle */}
                        <div className="absolute top-0 right-0 w-6 h-6 bg-[#004d98] opacity-15"
                             style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                        {Icon && (
                          <Icon className="w-8 h-8 text-[#a50044] dark:text-pink-500 relative z-10 group-hover:rotate-6 transition-transform duration-300" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector (Desktop only) */}
              {!isLast && (
                <>
                  {isEven ? (
                    // Left to Right connector
                    <div className="hidden md:flex items-start flex-row">
                      <div className="border-t-4 border-r-4 border-transparent">
                        <div className="w-14 ml-14 h-14 border-l-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed border-b-4 rounded-bl-full animate-dash"></div>
                      </div>
                      <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-14 border-b-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed animate-dash"></div>
                      </div>
                      <div className="w-14 mt-14 mr-14 h-14 border-r-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed border-t-4 rounded-tr-full animate-dash"></div>
                    </div>
                  ) : (
                    // Right to Left connector
                    <div className="hidden md:flex items-start flex-row-reverse">
                      <div className="border-t-4 border-l-4 border-transparent">
                        <div className="w-14 mr-14 h-14 border-r-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed border-b-4 rounded-br-full animate-dash"></div>
                      </div>
                      <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-14 border-b-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed animate-dash"></div>
                      </div>
                      <div className="w-14 mt-14 ml-14 h-14 border-l-4 border-[#004d98]/30 dark:border-blue-500/30 border-dashed border-t-4 rounded-tl-full animate-dash"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.5s ease-out both;
        }

        .animate-dash {
          stroke-dasharray: 10;
          animation: dash 20s linear infinite;
        }
      `}</style>
    </section>
  );
}