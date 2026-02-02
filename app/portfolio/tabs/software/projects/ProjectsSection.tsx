"use client";

import { useState } from "react";
import { professionalProjects } from "./projects";

// Auto-scrolling continuous flow
function AutoScrollingImageFlow({
  images,
  title = "",
  index,
}: {
  images: string[];
  title?: string;
  index: number;
}) {
  const accentColor = index % 2 === 0 ? "#004d98" : "#a50044";

  if (images.length === 0) {
    return (
      <div
        className="h-full w-full flex items-center justify-center dark:bg-gray-800/50"
        style={{ backgroundColor: `${accentColor}10` }}
      >
        <span
          className="text-gray-500 dark:text-gray-400"
          style={{ color: accentColor }}
        >
          No images available
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative h-full overflow-hidden dark:bg-gray-800/30"
      style={{ backgroundColor: `${accentColor}05` }}
    >
      {/* Duplicate images for seamless loop */}
      <div className="flex h-full animate-scroll">
        {/* First set */}
        {images.map((image, idx) => (
          <div
            key={`first-${idx}`}
            className="shrink-0 h-full flex pl-1 items-center justify-center"
          >
            <img
              src={image}
              alt={
                title
                  ? `${title} - Image ${idx + 1}`
                  : `Project image ${idx + 1}`
              }
              className="h-full w-auto object-contain rounded-sm"
              style={{
                border: `2px solid ${accentColor}`,
                boxShadow: `0 4px 6px ${accentColor}40`,
              }}
            />
          </div>
        ))}
        {/* Second set for seamless loop */}
        {images.map((image, idx) => (
          <div
            key={`second-${idx}`}
            className="shrink-0 h-full flex items-center justify-center p-2"
          >
            <img
              src={image}
              alt={
                title
                  ? `${title} - Image ${idx + 1}`
                  : `Project image ${idx + 1}`
              }
              className="h-full w-auto object-contain rounded-sm"
              style={{
                border: `2px solid ${accentColor}`,
                boxShadow: `0 4px 6px ${accentColor}40`,
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: 200%;
        }
        .animate-scroll:hover {
          animation-play-state: running !important;
        }
      `}</style>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = professionalProjects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  const categories = [
    "All",
    ...Array.from(new Set(professionalProjects.map((p) => p.category))),
  ];

  const getAccentColor = (index: number) =>
    index % 2 === 0 ? "#004d98" : "#a50044";

  return (
    <section className="min-h-screen  bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
          px-2.5 py-1.5
          sm:px-3 sm:py-1.5
          md:px-3.5 md:py-2
          rounded-sm
          text-xs sm:text-sm
          font-medium
          transition-all duration-200
          hover:scale-[1.03]
          active:scale-[0.97]
          ${
            activeFilter === category
              ? "text-white"
              : "bg-transparent hover:opacity-90"
          }
        `}
                style={{
                  backgroundColor:
                    activeFilter === category
                      ? getAccentColor(categories.indexOf(category) % 2)
                      : "transparent",
                  border: `1.5px solid ${getAccentColor(
                    categories.indexOf(category) % 2,
                  )}`,
                  color:
                    activeFilter === category
                      ? "white"
                      : getAccentColor(categories.indexOf(category) % 2),
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-3">
          {filteredProjects.map((project, index) => {
            const accentColor = getAccentColor(index);

            return (
              <div
                key={project.id}
                className="group overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl "
              >
                {/* Project Image with Auto-scrolling Flow */}
                <div className="h-48 sm:h-56 md:h-64">
                  {project.images && project.images.length > 0 ? (
                    <AutoScrollingImageFlow
                      images={project.images}
                      title={project.title}
                      index={index}
                    />
                  ) : (
                    <div
                      className="h-full w-full flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <span
                        className="text-sm sm:text-base"
                        style={{ color: accentColor }}
                      >
                        No images available
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 sm:p-8">
                  {/* Category & Year */}
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span
                      className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Title with Logo */}
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                    )}
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
                      style={{ color: accentColor }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6 sm:mb-8">
                    <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs sm:text-sm"
                          style={{
                            backgroundColor: `${accentColor}10`,
                            color: accentColor,
                            border: `1px solid ${accentColor}30`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 sm:mb-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs sm:text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Key Features
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={i}
                          className="text-sm sm:text-base flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span
                            className="mt-0.5 sm:mt-1 flex-shrink-0"
                            style={{ color: accentColor }}
                          >
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        style={{
                          backgroundColor: accentColor,
                          color: "white",
                        }}
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Visit Site
                      </a>
                    )}
                                   </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div
              className="text-5xl sm:text-6xl mb-4"
              style={{ color: "#004d98" }}
            >
              🔍
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 dark:text-white">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
