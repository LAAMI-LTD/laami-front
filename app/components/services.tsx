interface Service {
  title: string;
  description: string;
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function Services() {
  const CIRCLE_RADIUS = "clamp(11rem, 10vw, 16rem)";
  const services: Service[] = [
    {
      title: "Attract Attention",
      description:
        "We create high-performing content—videos, graphics, and campaigns—that stop the scroll and bring your ideal customers to you.",
      position: "bottom-right",
    },
    {
      title: "Generate Leads",
      description:
        "Through targeted paid advertising and smart funnels, we turn attention into qualified leads ready to buy.",
      position: "bottom-left",
    },
    {
      title: "Convert & Close",
      description:
        "We design landing pages, messaging, and systems that turn visitors into paying clients consistently.",
      position: "top-right",
    },
    {
      title: "Scale with Systems",
      description:
        "From websites to custom software, we build digital systems that automate, optimize, and scale your business growth.",
      position: "top-left",
    },
  ];

  const getClipPath = (position: string) => {
    switch (position) {
      case "bottom-right":
        return `circle(${CIRCLE_RADIUS} at 100% 100%)`;
      case "bottom-left":
        return `circle(${CIRCLE_RADIUS} at 0% 100%)`;
      case "top-right":
        return `circle(${CIRCLE_RADIUS} at 100% 0%)`;
      case "top-left":
        return `circle(${CIRCLE_RADIUS} at 0% 0%)`;
      default:
        return `circle(${CIRCLE_RADIUS} at 100% 100%)`;
    }
  };

  const getTextAlignment = (position: string) => {
    if (position.includes("right")) {
      return "lg:pr-52";
    }
    return "lg:pl-48";
  };

  const images = [
    "/service/code.avif", // code/software
    "/service/corporate.avif", // business/documents
    "/service/design.avif", // design/creativity
    "/service/keyboard.avif", // growth/analytics
  ];

  // Color palette
  const colors = {
    maroon: "#a50044",
    barcelonaBlue: "#004d98",
    darkMaroon: "#8a0038",
    darkBarcelonaBlue: "#003d7a",
  };

  return (
    <section
      id="services"
      className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-center py-20 px-8 xl:px-0 flex flex-col justify-center transition-colors duration-300"
    >
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap");

        .service-title {
          font-family: "Playfair Display", serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }

        .service-card {
          position: relative;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .dark .service-card {
          background-color: #262626; /* Neutral-800 for dark mode */
        }

        .service-card:hover {
          box-shadow: 0.063rem 0.063rem 1.25rem 0.375rem rgba(0, 0, 0, 0.1);
        }

        .dark .service-card:hover {
          box-shadow: 0.063rem 0.063rem 1.25rem 0.375rem rgba(0, 0, 0, 0.53);
        }

        .accent-bg {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
          top: 0;
          left: 0;
        }

        /* Maroon color */
        .maroon-bg {
          background-color: ${colors.maroon};
        }

        .dark .maroon-bg {
          background-color: ${colors.darkMaroon};
        }

        /* Barcelona Blue color */
        .blue-bg {
          background-color: ${colors.barcelonaBlue};
        }

        .dark .blue-bg {
          background-color: ${colors.darkBarcelonaBlue};
        }

        /* Initial state - confined to corner */
        .service-card .accent-bg {
          clip-path: circle(
            calc(6.25rem + 7.5vw) at var(--corner-x, 100%) var(--corner-y, 100%)
          );
        }

        /* Hover state - expands to cover entire card */
        .service-card:hover .accent-bg {
          clip-path: circle(
            150% at var(--corner-x, 100%) var(--corner-y, 100%)
          ) !important;
        }

        .service-card:hover .service-description {
          color: #ffffff;
          transition-delay: 0.2s;
        }

        .dark .service-card:hover .service-description {
          color: #ffffff;
        }

        .service-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: none;
        }

        @media (min-width: 1000px) {
          .service-circle {
            display: block;
          }
        }

        .service-content {
          position: relative;
          z-index: 10;
        }

        /* Smooth transition for text color */
        .service-description {
          transition: color 0.5s ease 0.2s;
        }
      `}</style>

      <span className="text-gray-600 dark:text-neutral-300 text-lg max-w-lg mx-auto mb-2 capitalize flex items-center justify-center transition-colors duration-300">
        How we help you grow
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-[#a50044] dark:text-[#a50044] ml-3 w-6 h-6 transition-colors duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </span>

      <h1 className="text-gray-800 dark:text-neutral-100 text-4xl md:text-5xl xl:text-6xl font-semibold max-w-3xl mx-auto mb-16 leading-snug transition-colors duration-300">
        Services Designed to Grow Your Business
      </h1>
      <div className="flex flex-wrap justify-center mb-10">
        <div className="max-w-4xl flex flex-wrap gap-4 justify-center">
          {[
            "Graphics Design",
            "Register your company",
            "Websites",
            "Mobile Apps",
          ].map((title, index) => {
            const isMaroon = index % 2 === 0;
            const color = isMaroon ? "#a50044" : "#004d98";

            return (
              <div
                key={index}
                className={`relative overflow-hidden border rounded-md px-4 py-2 text-center cursor-pointer group`}
                style={{ borderColor: color, color: color }}
              >
                {/* Swipe overlay */}
                <div
                  className="absolute top-0 left-0 w-0 h-full bg-current transition-all duration-500 ease-in-out group-hover:w-full"
                  style={{ backgroundColor: color, zIndex: 0 }}
                />

                {/* Text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid-offer text-left grid sm:grid-cols-2 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
        {services.map((service, index) => {
          // Calculate corner position for CSS custom properties
          const getCornerPosition = (position: string) => {
            switch (position) {
              case "bottom-right":
                return { x: "100%", y: "100%" };
              case "bottom-left":
                return { x: "0%", y: "100%" };
              case "top-right":
                return { x: "100%", y: "0%" };
              case "top-left":
                return { x: "0%", y: "0%" };
              default:
                return { x: "100%", y: "100%" };
            }
          };

          const corner = getCornerPosition(service.position);
          // Alternate between maroon and blue - even indices get maroon, odd get blue
          const isMaroon = index % 2 === 0;
          const bgClass = isMaroon ? "maroon-bg" : "blue-bg";
          const iconColor = isMaroon ? colors.maroon : colors.barcelonaBlue;

          return (
            <div
              key={index}
              className="service-card p-10 relative rounded-lg overflow-hidden shadow-lg dark:shadow-neutral-800/30 transition-all duration-300"
            >
              {/* Accent background layer */}
              <div
                className={`accent-bg ${bgClass}`}
                style={
                  {
                    "--corner-x": corner.x,
                    "--corner-y": corner.y,
                  } as React.CSSProperties
                }
              />

              {/* Image layer */}
              <div
                className="service-circle"
                style={{
                  backgroundImage: `url(${images[index]})`,
                  clipPath: getClipPath(service.position),
                  [service.position.includes("bottom") ? "bottom" : "top"]: 0,
                  [service.position.includes("right") ? "right" : "left"]: 0,
                }}
              />

              {/* Content */}
              <div
                className={`service-content ${getTextAlignment(service.position)}`}
              >
                <h2 className="service-title capitalize text-gray-800 dark:text-neutral-100 mb-4 text-2xl xl:text-3xl leading-snug transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="service-description text-gray-600 dark:text-neutral-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Optional: Add a small corner indicator */}
              <div className="absolute top-4 right-4 z-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={iconColor}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        <div className="max-w-4xl flex flex-wrap gap-4 justify-center">
          {["SEO", "Marketing", "Social Media", "Tech Support"].map(
            (title, index) => {
              const isMaroon = index % 2 === 0;
              const color = isMaroon ? "#a50044" : "#004d98";

              return (
                <div
                  key={index}
                  className={`relative overflow-hidden border rounded-md px-4 py-2 text-center cursor-pointer group`}
                  style={{ borderColor: color, color: color }}
                >
                  {/* Swipe overlay */}
                  <div
                    className="absolute top-0 left-0 w-0 h-full bg-current transition-all duration-500 ease-in-out group-hover:w-full"
                    style={{ backgroundColor: color, zIndex: 0 }}
                  />

                  {/* Text */}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    {title}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 max-w-2xl mx-auto">
        <p className="text-lg text-gray-600 dark:text-neutral-300 mb-6 transition-colors duration-300">
          Not sure what you need? Let&apos;s figure it out together.
        </p>
        <a
          href="/contacts"
          className="inline-flex items-center space-x-2 bg-[#a50044] hover:bg-[#003d7a] dark:bg-[#004d98] dark:hover:bg-[#8a0038] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-neutral-800/50"
        >
          <span>Get Your Free Growth Audit</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
