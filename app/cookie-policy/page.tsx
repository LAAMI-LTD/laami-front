"use client";

// app/cookie-policy/page.tsx
import Link from "next/link";

// ── Section component with modern design (adapted from Privacy Policy) ───
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="flex items-start gap-4">
        {/* Icon with modern styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#004d98]/20 dark:bg-[#004d98]/30 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#004d98]/10 to-[#a50044]/10 dark:from-[#004d98]/20 dark:to-[#a50044]/20 border border-[#004d98]/20 dark:border-[#004d98]/30 group-hover:border-[#004d98]/40 dark:group-hover:border-[#004d98]/50 transition-all">
            <span className="text-[#004d98] dark:text-[#6fa8ff] group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[#0d1b2e] dark:text-white font-poppins">
            {title}
          </h3>
          <div className="prose prose-sm max-w-none text-[#334155] dark:text-[#94a3b8] space-y-3 font-poppins">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Browser Guide Component ─────────────────────────────────
function BrowserGuide({
  browser,
  instructions,
  link,
}: {
  browser: string;
  instructions: string;
  link: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-[#004d98]/20 dark:border-[#004d98]/30 hover:border-[#a50044]/30 transition-colors group">
      <h5 className="font-semibold text-[#004d98] dark:text-[#6fa8ff] mb-2 font-poppins">
        {browser}
      </h5>
      <p className="text-sm text-[#0d1b2e] dark:text-[#e6eeff] mb-2 font-poppins">
        {instructions}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#a50044] hover:text-[#004d98] dark:text-[#ff6699] dark:hover:text-[#6fa8ff] transition-colors inline-flex items-center gap-1 font-poppins"
      >
        Learn how to manage cookies
        <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
      </a>
    </div>
  );
}

// ── SVG icons ───────────────────────────────────
const Icons = {
  cookie: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  list: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  handshake: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  clock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.074-.04.148-.083.22-.128.332-.183.582-.495.645-.869l.213-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  refresh: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.57 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  arrowLeft: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  funFact: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
};

// ── Page ─────────────────────────────────────────────────────
export default function CookiePolicy() {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#030712] dark:to-[#111827] font-poppins">
      {/* Modern background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/25 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative mt-16">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Brand with modern styling */}
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#004d98]/20 dark:bg-[#004d98]/30 rounded-2xl blur-2xl" />
              <div className="relative w-14 h-14 ">
                <img
                  src="/laami.png"
                  alt="laami logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight font-poppins">
                <span className="text-[#a50044] dark:text-[#ff6699]">
                  LAAMI
                </span>
                <span className="text-[#004d98] dark:text-[#6fa8ff]">
                  {" "}
                  LABS
                </span>
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-[#004d98] to-[#a50044] mt-1 rounded-full" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0d1b2e] dark:text-white mb-4 font-poppins">
            Cookie{" "}
            <span className="text-[#004d98] dark:text-[#6fa8ff]">Policy</span>
          </h1>
          <p className="text-lg text-[#475569] dark:text-[#94a3b8] font-poppins">
            Last updated:{" "}
            <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
              {effectiveDate}
            </span>
          </p>
        </section>

        {/* ── Content card ──────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#004d98] to-[#a50044] rounded-3xl blur-xl opacity-20" />

            <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl border border-[#004d98]/10 dark:border-[#004d98]/30 shadow-xl overflow-hidden">
              {/* Modern header accent */}
              <div className="h-2 bg-gradient-to-r from-[#004d98] via-[#a50044] to-[#004d98]" />

              <div className="px-6 sm:px-10 md:px-12 py-12 space-y-12">
                {/* Intro with modern styling */}
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#004d98] to-[#a50044] rounded-full" />
                  <p className="pl-4 text-lg text-[#334155] dark:text-[#cbd5e1] leading-relaxed font-poppins">
                    This Cookie Policy explains how{" "}
                    <span className="font-bold text-[#a50044] dark:text-[#ff6699]">
                      LAAMI LABS
                    </span>{" "}
                    (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses
                    cookies and similar technologies on our website{" "}
                    <span className="font-bold text-[#004d98] dark:text-[#6fa8ff]">
                      laamilabs.co.ke
                    </span>
                    . By using our website, you consent to the use of cookies as
                    described in this policy.
                  </p>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#004d98]/10 dark:border-[#004d98]/30" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-[#0f172a] px-4 text-xs uppercase tracking-wider text-[#004d98]/50 dark:text-[#6fa8ff]/50 font-poppins">
                      Your Privacy Matters
                    </span>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                  <Section title="What Are Cookies" icon={Icons.cookie}>
                    <p>
                      Cookies are small text files that are placed on your computer or
                      mobile device when you visit a website. They are widely used to
                      make websites work more efficiently and provide useful
                      information to website owners. Cookies help us enhance your
                      browsing experience, remember your preferences, and understand
                      how you interact with our content.
                    </p>
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#004d98]/5 to-[#a50044]/5 rounded-xl border border-[#004d98]/20 dark:border-[#a50044]/30">
                      <p className="text-sm text-[#004d98] dark:text-[#6fa8ff] font-medium font-poppins flex items-start gap-2">
                        <span className="text-[#a50044] dark:text-[#ff6699] shrink-0 mt-0.5">
                          {Icons.funFact}
                        </span>
                        <span>
                          🍪 <span className="font-semibold">Fun Fact:</span> The name &quot;cookie&quot; comes from
                          &quot;magic cookie,&quot; a term used in computing for a
                          packet of data that a program receives and sends back
                          unchanged.
                        </span>
                      </p>
                    </div>
                  </Section>

                  <Section title="How We Use Cookies" icon={Icons.search}>
                    <p className="mb-4">
                      We use cookies for a variety of purposes, including:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        ["Authentication", "To keep you logged in to your account"],
                        ["Preferences", "To remember your settings and preferences"],
                        ["Analytics", "To understand how visitors use our website"],
                        ["Security", "To protect your account and our services"],
                        ["Performance", "To improve website speed and functionality"],
                        ["Marketing", "To deliver relevant content and advertisements"],
                      ].map(([category, description]) => (
                        <li key={category} className="flex items-start gap-2.5">
                          <span className="mt-1 text-[#a50044] dark:text-[#ff6699] shrink-0">
                            {Icons.check}
                          </span>
                          <span className="text-sm font-poppins">
                            <span className="font-semibold text-[#0d1b2e] dark:text-white">
                              {category}:
                            </span>{" "}
                            {description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section title="Types of Cookies We Use" icon={Icons.list}>
                    <div className="space-y-6">
                      {/* Essential Cookies */}
                      <div className="border-l-4 border-[#004d98] pl-4">
                        <h4 className="font-bold text-[#004d98] dark:text-[#6fa8ff] mb-2 font-poppins">
                          Essential Cookies
                        </h4>
                        <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                          These cookies are necessary for the website to function
                          properly. They enable core functionality such as security,
                          network management, and account access. You cannot opt-out
                          of these cookies.
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {["Session", "Authentication", "Security"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#004d98]/10 rounded text-xs text-[#004d98] dark:text-[#6fa8ff] font-poppins"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Preference Cookies */}
                      <div className="border-l-4 border-[#a50044] pl-4">
                        <h4 className="font-bold text-[#a50044] dark:text-[#ff6699] mb-2 font-poppins">
                          Preference Cookies
                        </h4>
                        <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                          These cookies remember your choices and preferences to
                          provide enhanced, personalized features. They remember
                          things like your language preferences and region.
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {["Language", "Theme", "Region"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#a50044]/10 rounded text-xs text-[#a50044] dark:text-[#ff6699] font-poppins"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="border-l-4 border-[#004d98] pl-4">
                        <h4 className="font-bold text-[#004d98] dark:text-[#6fa8ff] mb-2 font-poppins">
                          Analytics Cookies
                        </h4>
                        <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                          These cookies help us understand how visitors interact with
                          our website by collecting and reporting information
                          anonymously. We use this data to improve our content and
                          user experience.
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {["Google Analytics", "Page Views", "Behavior"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#004d98]/10 rounded text-xs text-[#004d98] dark:text-[#6fa8ff] font-poppins"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="border-l-4 border-[#a50044] pl-4">
                        <h4 className="font-bold text-[#a50044] dark:text-[#ff6699] mb-2 font-poppins">
                          Marketing Cookies
                        </h4>
                        <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                          These cookies track your browsing habits to deliver
                          advertisements that are relevant to you. They also help
                          measure the effectiveness of our marketing campaigns.
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {["Tracking", "Social Media", "Advertising"].map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-[#a50044]/10 rounded text-xs text-[#a50044] dark:text-[#ff6699] font-poppins"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section title="Third-Party Cookies" icon={Icons.handshake}>
                    <p className="mb-4">
                      In addition to our own cookies, we may also use various
                      third-party cookies to report usage statistics, deliver
                      advertisements, and improve our services. These include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Google Analytics",
                          description: "Used to analyze website traffic and user behavior",
                          link: "https://policies.google.com/privacy",
                          color: "blue"
                        },
                        {
                          name: "Stripe",
                          description: "Used for payment processing and fraud prevention",
                          link: "https://stripe.com/privacy",
                          color: "red"
                        },
                        {
                          name: "Cloudflare",
                          description: "Provides security and performance optimization",
                          link: "https://www.cloudflare.com/privacypolicy/",
                          color: "blue"
                        },
                        {
                          name: "Social Media Platforms",
                          description: "For sharing content and social features",
                          link: "#",
                          color: "red"
                        },
                      ].map(({ name, description, link, color }) => (
                        <div
                          key={name}
                          className={`p-4 rounded-lg border ${
                            color === "blue"
                              ? "border-[#004d98]/20 dark:border-[#004d98]/30 hover:border-[#004d98]/40"
                              : "border-[#a50044]/20 dark:border-[#a50044]/30 hover:border-[#a50044]/40"
                          } transition-colors group`}
                        >
                          <h5 className={`font-semibold ${
                            color === "blue"
                              ? "text-[#004d98] dark:text-[#6fa8ff]"
                              : "text-[#a50044] dark:text-[#ff6699]"
                          } mb-2 font-poppins`}>
                            {name}
                          </h5>
                          <p className="text-sm text-[#334155] dark:text-[#94a3b8] mb-2 font-poppins">
                            {description}
                          </p>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xs ${
                              color === "blue"
                                ? "text-[#a50044] hover:text-[#004d98] dark:text-[#ff6699] dark:hover:text-[#6fa8ff]"
                                : "text-[#004d98] hover:text-[#a50044] dark:text-[#6fa8ff] dark:hover:text-[#ff6699]"
                            } transition-colors inline-flex items-center gap-1 font-poppins`}
                          >
                            Learn More
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="Cookie Duration" icon={Icons.clock}>
                    <p className="mb-4">
                      Cookies can remain on your device for different periods of time:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#a50044] mt-2"></span>
                        <div>
                          <span className="font-semibold text-[#a50044] dark:text-[#ff6699] font-poppins">
                            Session Cookies:
                          </span>
                          <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                            These are temporary cookies that expire when you close
                            your browser. They are essential for the website to
                            function properly during your visit.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#004d98] mt-2"></span>
                        <div>
                          <span className="font-semibold text-[#004d98] dark:text-[#6fa8ff] font-poppins">
                            Persistent Cookies:
                          </span>
                          <p className="text-sm text-[#334155] dark:text-[#94a3b8] font-poppins">
                            These cookies remain on your device for a set period or
                            until you delete them. They help us remember your
                            preferences for future visits.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section title="How to Manage Cookies" icon={Icons.settings}>
                    <p className="mb-4">
                      Most web browsers allow you to control cookies through their
                      settings. You can choose to accept all cookies, reject all
                      cookies, or be notified when a cookie is set. However, please
                      note that blocking certain types of cookies may impact your
                      experience on our website.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <BrowserGuide
                        browser="Google Chrome"
                        instructions="Settings → Privacy and Security → Cookies and other site data"
                        link="https://support.google.com/chrome/answer/95647"
                      />
                      <BrowserGuide
                        browser="Mozilla Firefox"
                        instructions="Options → Privacy & Security → Cookies and Site Data"
                        link="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                      />
                      <BrowserGuide
                        browser="Safari"
                        instructions="Preferences → Privacy → Cookies and website data"
                        link="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                      />
                      <BrowserGuide
                        browser="Microsoft Edge"
                        instructions="Settings → Cookies and site permissions → Cookies and site data"
                        link="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      />
                    </div>
                  </Section>

                  <Section title="Your Consent" icon={Icons.check}>
                    <p className="mb-4">
                      By continuing to use our website, you consent to our use of
                      cookies as described in this policy. When you first visit our
                      site, you will see a cookie banner where you can:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Accept all cookies",
                        "Customize your cookie preferences",
                        "View this detailed cookie policy",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 text-[#a50044] dark:text-[#ff6699] shrink-0">
                            {Icons.check}
                          </span>
                          <span className="text-sm font-poppins">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">
                      You can change your cookie preferences at any time by clicking
                      the &quot;Cookie Settings&quot; link in the footer of our
                      website.
                    </p>
                  </Section>

                  <Section title="Updates to This Policy" icon={Icons.refresh}>
                    <p>
                      We may update this Cookie Policy from time to time to reflect
                      changes in technology, regulation, or our business practices.
                      Any changes will be posted on this page with an updated revision
                      date. We encourage you to review this policy periodically.
                    </p>
                  </Section>

                  <Section title="Contact Us" icon={Icons.mail}>
                    <p className="mb-4">
                      If you have any questions about our use of cookies, please
                      contact us:
                    </p>

                    {/* Modern contact card */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="mailto:privacy@laamilabs.co.ke"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#004d98]/5 dark:bg-[#004d98]/10 border border-[#004d98]/10 dark:border-[#004d98]/30 hover:border-[#004d98]/30 dark:hover:border-[#004d98]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#004d98]/10 dark:bg-[#004d98]/20 text-[#004d98] dark:text-[#6fa8ff] group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.57 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#004d98]/60 dark:text-[#6fa8ff]/60 font-poppins">
                            Email
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white group-hover:text-[#004d98] dark:group-hover:text-[#6fa8ff] transition-colors font-poppins">
                            privacy@laamilabs.co.ke
                          </div>
                        </div>
                      </a>

                      <a
                        href="tel:+234707848528"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#a50044]/5 dark:bg-[#a50044]/10 border border-[#a50044]/10 dark:border-[#a50044]/30 hover:border-[#a50044]/30 dark:hover:border-[#a50044]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#a50044]/10 dark:bg-[#a50044]/20 text-[#a50044] dark:text-[#ff6699] group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#a50044]/60 dark:text-[#ff6699]/60 font-poppins">
                            Phone
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white group-hover:text-[#a50044] dark:group-hover:text-[#ff6699] transition-colors font-poppins">
                            +234 707 848 528
                          </div>
                        </div>
                      </a>

                      <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#004d98]/5 to-[#a50044]/5 border border-[#004d98]/20 dark:border-[#a50044]/30">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#004d98]/10 to-[#a50044]/10 text-[#004d98] dark:text-[#6fa8ff]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-[#004d98]/60 dark:text-[#6fa8ff]/60 font-poppins">
                            Office
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white font-poppins">
                            Eldoret, Kenya
                          </div>
                        </div>
                      </div>
                    </div>
                  </Section>
                </div>

                {/* Footer note */}
                <div className="pt-8 border-t border-[#004d98]/10 dark:border-[#004d98]/30">
                  <p className="text-center text-sm text-[#64748b] dark:text-[#94a3b8] font-poppins">
                    © {new Date().getFullYear()} LAAMI LABS. This Cookie Policy is
                    part of our commitment to transparency and your privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Navigation Buttons ────────────────────────────────── */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#004d98] hover:bg-[#0061be] text-white text-sm font-semibold transition-all shadow-lg shadow-[#004d98]/20 hover:shadow-xl hover:shadow-[#004d98]/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98] focus-visible:ring-offset-2 font-poppins"
            >
              {Icons.arrowLeft}
              Back to Home
            </Link>

            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#004d98] text-[#004d98] dark:border-[#6fa8ff] dark:text-[#6fa8ff] font-semibold text-sm hover:bg-[#004d98]/5 dark:hover:bg-[#6fa8ff]/10 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98] shadow-lg font-poppins"
            >
              Privacy Policy
              {Icons.arrowRight}
            </Link>

            <Link
              href="/terms-of-service"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#a50044] text-[#a50044] dark:border-[#ff6699] dark:text-[#ff6699] font-semibold text-sm hover:bg-[#a50044]/5 dark:hover:bg-[#ff6699]/10 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a50044] shadow-lg font-poppins"
            >
              Terms of Service
              {Icons.arrowRight}
            </Link>
          </div>

          {/* ── Footer links ────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms-of-service", label: "Terms of Service" },
              { href: "/cookie-policy", label: "Cookie Policy", active: true },
            ].map(({ href, label, active }) => (
              <Link
                key={href}
                href={href}
                className={`
                  text-sm font-medium transition-colors font-poppins
                  ${
                    active
                      ? "text-[#004d98] dark:text-[#6fa8ff]"
                      : "text-[#64748b] dark:text-[#94a3b8] hover:text-[#004d98] dark:hover:text-[#6fa8ff]"
                  }
                `}
              >
                {label}
                {active && (
                  <span className="ml-2 inline-block w-1 h-1 rounded-full bg-[#004d98] dark:bg-[#6fa8ff]" />
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Grid background styles */}
      <style jsx>{`
        .bg-grid-slate-100 {
          background-image:
            linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .dark .bg-grid-slate-900\/25 {
          background-image:
            linear-gradient(
              to right,
              rgba(15, 23, 42, 0.25) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(15, 23, 42, 0.25) 1px,
              transparent 1px
            );
        }
      `}</style>
    </main>
  );
}