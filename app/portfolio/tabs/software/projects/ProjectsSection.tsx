"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Pause, Play, Search } from "lucide-react";
import { professionalProjects } from "./projects";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004d98]";

function AutoScrollingImageFlow({ images, title }: { images: string[]; title: string }) {
  const [paused, setPaused] = useState(false);
  const carouselImages = [...images, ...images];

  if (!images.length) {
    return (
      <div className="grid h-full place-items-center bg-[#eceef1] text-sm text-neutral-600 dark:bg-[#151923] dark:text-neutral-400">
        Project imagery coming soon
      </div>
    );
  }

  return (
    <div
      className="portfolio-carousel relative h-full overflow-hidden bg-[#eceef1] dark:bg-[#151923]"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} image carousel`}
    >
      <div className="portfolio-image-track flex h-full w-max" style={{ animationPlayState: paused ? "paused" : undefined }}>
        {carouselImages.map((image, index) => (
          <div key={`${image}-${index}`} className="flex h-full shrink-0 items-center justify-center p-4 2xl:p-6">
            <Image
              src={image}
              alt={index < images.length ? `${title} preview ${index + 1}` : ""}
              aria-hidden={index >= images.length}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 78vw, 40rem"
              className="h-full w-auto max-w-[78vw] rounded-sm object-contain shadow-[0_8px_24px_rgba(15,23,42,0.14)] sm:max-w-none"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? `Play ${title} image carousel` : `Pause ${title} image carousel`}
        className={`absolute bottom-3 right-3 z-10 inline-flex h-9 items-center gap-2 rounded-sm bg-white px-3 text-xs font-medium text-neutral-900 shadow-sm transition-colors duration-150 hover:bg-neutral-100 active:scale-[0.97] dark:bg-[#0d111b] dark:text-white dark:hover:bg-[#1b202b] ${focusRing}`}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
        {paused ? "Play" : "Pause"}
      </button>
      <style jsx>{`
        .portfolio-image-track {
          animation: portfolio-scroll 48s linear infinite;
        }
        .portfolio-carousel:hover .portfolio-image-track {
          animation-play-state: paused;
        }
        @keyframes portfolio-scroll {
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .portfolio-image-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [query, setQuery] = useState("");
  const categories = useMemo(
    () => ["All work", ...Array.from(new Set(professionalProjects.map((project) => project.category)))],
    [],
  );

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return professionalProjects.filter((project) => {
      const okCategory = activeCategory === "All work" || project.category === activeCategory;
      const okQuery =
        !q ||
        `${project.title} ${project.description} ${project.category} ${project.tech.join(" ")}`.toLowerCase().includes(q);
      return okCategory && okQuery;
    });
  }, [activeCategory, query]);

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("All work");
  };

  return (
    <section id="portfolio-projects" aria-labelledby="projects-heading" className="w-full scroll-mt-28 py-14 sm:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2
            id="projects-heading"
            className="max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-4xl lg:text-5xl 2xl:text-6xl"
          >
            Projects built to move people forward
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 dark:text-neutral-300 2xl:text-lg">
            A selection of digital products and experiences created with ambitious teams.
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs 2xl:max-w-sm">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            aria-label="Search projects"
            placeholder="Search projects"
            className="h-10 w-full rounded-sm border border-neutral-300 bg-white pl-9 pr-3 text-sm outline-none transition-colors duration-150 placeholder:text-neutral-500 focus:border-[#004d98] dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-blue-400"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter projects by category">
        {categories.map((category) => {
          const selected = activeCategory === category;
          const count =
            category === "All work"
              ? professionalProjects.length
              : professionalProjects.filter((project) => project.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={selected}
              className={`inline-flex shrink-0 items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-150 ${focusRing} ${
                selected
                  ? "bg-[#151515] text-white dark:bg-white dark:text-[#151515]"
                  : "border border-neutral-300 text-neutral-700 hover:border-neutral-500 dark:border-white/15 dark:text-neutral-300 dark:hover:border-white/40"
              }`}
            >
              {category}
              <span className={selected ? "text-white/70 dark:text-black/60" : "text-neutral-500"}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
        Showing {visibleProjects.length} of {professionalProjects.length} projects
      </p>

      {visibleProjects.length ? (
        <div className="flex flex-col gap-4 2xl:gap-5">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="grid overflow-hidden rounded-sm border border-neutral-200 bg-white dark:border-white/10 dark:bg-[#0d111b] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
            >
              {/* Images */}
              <div className="h-60 sm:h-72 lg:h-[clamp(20rem,22vw,32rem)]">
                <AutoScrollingImageFlow images={project.images} title={project.title} />
              </div>

              {/* Details: solid panel, no text over images */}
              <div className="flex flex-col p-5 sm:p-6 lg:p-8 2xl:p-10">
                <div className="mb-4 flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="rounded-sm bg-[#a50044]/10 px-2.5 py-1 text-xs font-semibold text-[#a50044] dark:bg-pink-400/15 dark:text-pink-300">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                </div>

                <div className="flex items-center gap-3">
                  {project.logo && (
                    <Image src={project.logo} alt="" width={128} height={64} sizes="56px" className="h-9 w-14 shrink-0 object-contain" />
                  )}
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white 2xl:text-4xl">
                    {project.title}
                  </h3>
                </div>

                <p className="mt-3 line-clamp-4 text-base leading-7 text-neutral-700 dark:text-neutral-300 2xl:text-lg 2xl:leading-8">
                  {project.description}
                </p>

                {project.features.length > 0 && (
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300 2xl:text-base">
                    {project.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 bg-[#a50044]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                  {project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-sm border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 dark:border-white/15 dark:text-neutral-300"
                        >
                          {technology}
                        </span>
                      ))}
                      {project.tech.length > 5 && <span className="px-1.5 py-1 text-xs text-neutral-600">+{project.tech.length - 5}</span>}
                    </div>
                  )}
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-sm bg-[#004d98] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#003d7a] active:scale-[0.97] ${focusRing}`}
                    >
                      Visit project <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-white/20">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">No projects match your search</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Try another name or category.</p>
          <button
            type="button"
            onClick={resetFilters}
            className={`mt-5 rounded-sm bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white active:scale-[0.97] dark:bg-white dark:text-neutral-900 ${focusRing}`}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}