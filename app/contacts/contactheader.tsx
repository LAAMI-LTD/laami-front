"use client";

export default function CCTA() {
  return (
    <>
      {/* Main Content Section */}
      <section
        id="contact"
        className="relative min-h-[60vh] overflow-hidden bg-white dark:bg-neutral-900"
      >
        {/* Background images for both themes */}
        <div className="absolute inset-0 z-0">
          {/* Light mode image */}
          <div
            className="absolute inset-0 bg-cover bg-center dark:hidden"
            style={{
              backgroundImage: "url('/card4.png')",
            }}
          />
          {/* Dark mode image */}
          <div
            className="absolute inset-0 bg-cover bg-left hidden dark:block"
            style={{
              backgroundImage: "url('/fabric-logo-2.png')",
            }}
          />

          {/* Gradient overlay with mix-blend */}
          {/* <div
            className="absolute inset-0 bg-linear-to-r from-[#004d98] via-[#004d98]/90 to-[#004d98] dark:from-transparent dark:via-transparent dark:to-transparent"
            // style={{ mixBlendMode: "overlay" }}
          /> */}
          {/* Soft overlay (more readable than mix-blend) */}
          <div
            className="absolute inset-0 bg-linear-to-r from-white/80 via-white/30 to-transparent dark:from-neutral-900/95 dark:via-neutral-900/60 dark:to-neutral-900/40 md:dark:to-transparent"
            // style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 py-2 m-4 pt-30">
          {" "}
          <div className="max-w-2xl animate-[fadeIn_1s_ease-out_0.3s] md:pl-32">
            <h2 className="font-sans font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl xl:text-5xl text-gray-900 dark:text-white">
              Ready to build something
              <span className="block text-[#004d98] dark:text-[#a50044]">
                truly meaningful?
              </span>
            </h2>
     
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive adjustments */
          @media (max-width: 640px) {
            .fixed-nav-container {
              padding: 0 1rem;
            }
          }
        `}</style>
      </section>
    </>
  );
}
