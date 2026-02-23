"use client";

// app/privacy-policy/page.tsx
import Link from "next/link";

// ── Section component with modern design ───────────────────
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

// ── SVG icons (enhanced) ───────────────────────────────────
const Icons = {
  lock: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  clipboard: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H9a2.25 2.25 0 01-2.25-2.25V9.75M15.75 18V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18v1.578c0 1.135-.845 2.098-1.976 2.192a48.573 48.573 0 01-10.093 0C3.095 21.776 2.25 20.823 2.25 19.686v-9.42c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M18.75 12h-4.5M18.75 15h-4.5"
      />
    </svg>
  ),
  bulb: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  ),
  chart: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  cookie: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  handshake: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>
  ),
  globe: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.05 9.05 0 100-18 9.05 9.05 0 000 18zM2.25 12h19.5M12 21c1.8 0 3.3-4.03 3.3-9S13.8 3 12 3s-3.3 4.03-3.3 9 1.5 9 3.3 9z"
      />
    </svg>
  ),
  scale: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97c.48.212.936.47 1.36.758m0 0c.423.288.79.624 1.09 1.004m-2.45-1.762l-1.588 1.588M21 12c0 .963-.126 1.896-.364 2.784m-2.45-7.876l-1.586 1.586M5.25 4.97c-.48.212-.936.47-1.36.758m0 0c-.423.288-.79.624-1.09 1.004m2.45-1.762l1.588 1.588M3 12c0 .963.126 1.896.364 2.784m0 0l1.586-1.586M7.5 21.818v-.955A4.5 4.5 0 0112 16.5v.955m0 0a4.5 4.5 0 014.5 4.5h-9a4.5 4.5 0 014.5-4.5z"
      />
    </svg>
  ),
  shield: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  child: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    </svg>
  ),
  mail: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.57 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  ),
  arrowLeft: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  ),
  check: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  ),
};

// ── Page ─────────────────────────────────────────────────────
export default function PrivacyPolicy() {
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
            Privacy{" "}
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
                    At{" "}
                    <span className="font-bold text-[#a50044] dark:text-[#ff6699]">
                      LAAMI LABS
                    </span>
                    , accessible from{" "}
                    <span className="font-bold text-[#004d98] dark:text-[#6fa8ff]">
                      laamilabs.co.ke
                    </span>
                    , one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information
                    that is collected and recorded by LAAMI LABS and how we use
                    it.
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

                {/* Sections with increased spacing */}
                <div className="space-y-12">
                  <Section title="Consent" icon={Icons.lock}>
                    <p>
                      By using our website, you hereby consent to our Privacy
                      Policy and agree to its terms.
                    </p>
                  </Section>

                  <Section
                    title="Information We Collect"
                    icon={Icons.clipboard}
                  >
                    <p>
                      The personal information that you are asked to provide,
                      and the reasons why you are asked to provide it, will be
                      made clear to you at the point we ask you to provide your
                      personal information.
                    </p>
                    <p>
                      If you contact us directly, we may receive additional
                      information about you such as your name, email address,
                      phone number, the contents of the message and/or
                      attachments you may send us, and any other information you
                      may choose to provide.
                    </p>
                    <p>
                      When you register for an Account, we may ask for your
                      contact information, including items such as name, company
                      name, address, email address, and telephone number.
                    </p>
                  </Section>

                  <Section
                    title="How We Use Your Information"
                    icon={Icons.bulb}
                  >
                    <p>
                      We use the information we collect in various ways,
                      including to:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {[
                        "Provide, operate, and maintain our website",
                        "Improve, personalize, and expand our website",
                        "Understand and analyze how you use our website",
                        "Develop new products, services, and features",
                        "Communicate with you directly or through partners",
                        "Send you emails",
                        "Find and prevent fraud",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 text-[#004d98] dark:text-[#6fa8ff] shrink-0">
                            {Icons.check}
                          </span>
                          <span className="text-sm font-poppins">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section title="Log Files" icon={Icons.chart}>
                    <p>
                      LAAMI LABS follows a standard procedure of using log
                      files. These files log visitors when they visit websites.
                      All hosting companies do this as part of hosting
                      services&apos; analytics. The information collected by log
                      files includes internet protocol (IP) addresses, browser
                      type, Internet Service Provider (ISP), date and time
                      stamp, referring/exit pages, and possibly the number of
                      clicks. These are not linked to any personally
                      identifiable information.
                    </p>
                  </Section>

                  <Section title="Cookies and Web Beacons" icon={Icons.cookie}>
                    <p>
                      Like any other website, LAAMI LABS uses
                      &apos;cookies&apos;. These cookies are used to store
                      information including visitors&apos; preferences and the
                      pages on the website that the visitor accessed or visited.
                      The information is used to optimize the users&apos;
                      experience by customizing our web page content based on
                      visitors&apos; browser type and/or other information.
                    </p>
                    <p>
                      For more general information on cookies, please read{" "}
                      <a
                        href="https://www.privacypolicyonline.com/what-are-cookies/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#004d98] dark:text-[#6fa8ff] hover:text-[#a50044] dark:hover:text-[#ff6699] underline-offset-4 underline font-medium transition-colors font-poppins"
                      >
                        &quot;What Are Cookies&quot;
                      </a>
                    </p>
                  </Section>

                  <Section title="Advertising Partners" icon={Icons.handshake}>
                    <p>
                      You may consult this list to find the Privacy Policy for
                      each of the advertising partners of LAAMI LABS.
                    </p>
                    <p>
                      Third-party ad servers or ad networks use technologies
                      like cookies, JavaScript, or Web Beacons that are used in
                      their respective advertisements and links that appear on
                      LAAMI LABS, which are sent directly to users&apos;
                      browsers. They automatically receive your IP address when
                      this occurs.
                    </p>
                    <p>
                      Note that LAAMI LABS has no access to or control over
                      these cookies that are used by third-party advertisers.
                    </p>
                  </Section>

                  <Section title="Third Party Policies" icon={Icons.globe}>
                    <p>
                      LAAMI LABS&apos;s Privacy Policy does not apply to other
                      advertisers or websites. Thus, we are advising you to
                      consult the respective Privacy Policies of these
                      third-party ad servers for more detailed information. It
                      may include their practices and instructions about how to
                      opt-out of certain options.
                    </p>
                  </Section>

                  <Section title="CCPA Privacy Rights" icon={Icons.scale}>
                    <p>
                      Under the CCPA, among other rights, California consumers
                      have the right to:
                    </p>
                    <ul className="space-y-3 mt-3">
                      {[
                        "Request that a business disclose the categories and specific pieces of personal data collected.",
                        "Request that a business delete any personal data about the consumer collected.",
                        "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 text-[#004d98] dark:text-[#6fa8ff] shrink-0">
                            {Icons.check}
                          </span>
                          <span className="text-sm font-poppins">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      If you make a request, we have one month to respond to
                      you. Please contact us to exercise any of these rights.
                    </p>
                  </Section>

                  <Section
                    title="GDPR Data Protection Rights"
                    icon={Icons.shield}
                  >
                    <p>
                      Every user is entitled to the following data protection
                      rights:
                    </p>
                    <ul className="space-y-3 mt-3">
                      {[
                        [
                          "The right to access",
                          "Request copies of your personal data.",
                        ],
                        [
                          "The right to rectification",
                          "Request correction of inaccurate information.",
                        ],
                        [
                          "The right to erasure",
                          "Request erasure of your personal data.",
                        ],
                        [
                          "The right to restrict processing",
                          "Request restriction of processing your data.",
                        ],
                        [
                          "The right to object to processing",
                          "Object to our processing of your data.",
                        ],
                        [
                          "The right to data portability",
                          "Request transfer of your data to another organization.",
                        ],
                      ].map(([right, desc]) => (
                        <li key={right} className="flex items-start gap-2.5">
                          <span className="mt-1 text-[#004d98] dark:text-[#6fa8ff] shrink-0">
                            {Icons.check}
                          </span>
                          <span className="text-sm font-poppins">
                            <span className="font-semibold text-[#0d1b2e] dark:text-white">
                              {right}
                            </span>{" "}
                            — {desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3">
                      If you make a request, we have one month to respond to
                      you.
                    </p>
                  </Section>

                  <Section title="Children's Information" icon={Icons.child}>
                    <p>
                      Another part of our priority is adding protection for
                      children while using the internet. We encourage parents
                      and guardians to observe, participate in, and/or monitor
                      and guide their online activity.
                    </p>
                    <p>
                      LAAMI LABS does not knowingly collect any Personal
                      Identifiable Information from children under the age of
                      13. If you think that your child provided this kind of
                      information on our website, please contact us immediately
                      and we will do our best to promptly remove such
                      information from our records.
                    </p>
                  </Section>

                  <Section title="Contact Us" icon={Icons.mail}>
                    <p>
                      If you have any questions or suggestions about our Privacy
                      Policy, do not hesitate to contact us:
                    </p>

                    {/* Modern contact card */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="mailto:inquiry@laamilabs.co.ke"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#004d98]/5 dark:bg-[#004d98]/10 border border-[#004d98]/10 dark:border-[#004d98]/30 hover:border-[#004d98]/30 dark:hover:border-[#004d98]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#004d98]/10 dark:bg-[#004d98]/20 text-[#004d98] dark:text-[#6fa8ff] group-hover:scale-110 transition-transform">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.57 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#004d98]/60 dark:text-[#6fa8ff]/60 font-poppins">
                            Email
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white group-hover:text-[#004d98] dark:group-hover:text-[#6fa8ff] transition-colors font-poppins">
                            inquiry@laamilabs.co.ke
                          </div>
                        </div>
                      </a>

                      <a
                        href="tel:+234707848528"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#a50044]/5 dark:bg-[#a50044]/10 border border-[#a50044]/10 dark:border-[#a50044]/30 hover:border-[#a50044]/30 dark:hover:border-[#a50044]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#a50044]/10 dark:bg-[#a50044]/20 text-[#a50044] dark:text-[#ff6699] group-hover:scale-110 transition-transform">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
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

                      <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-[#004d98]/5 dark:bg-[#004d98]/10 border border-[#004d98]/10 dark:border-[#004d98]/30">
                        <div className="p-2 rounded-lg bg-[#004d98]/10 dark:bg-[#004d98]/20 text-[#004d98] dark:text-[#6fa8ff]">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
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
                    By using LAAMI LABS, you agree to the terms outlined in this
                    privacy policy. This policy is effective as of{" "}
                    <span className="font-semibold text-[#004d98] dark:text-[#6fa8ff]">
                      {effectiveDate}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Back to Home ────────────────────────────────── */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#004d98] hover:bg-[#0061be] text-white text-sm font-semibold transition-all shadow-lg shadow-[#004d98]/20 hover:shadow-xl hover:shadow-[#004d98]/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004d98] focus-visible:ring-offset-2 font-poppins"
            >
              {Icons.arrowLeft}
              Back to Home
            </Link>
          </div>

          {/* ── Footer links ────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              {
                href: "/privacy-policy",
                label: "Privacy Policy",
                active: true,
              },
              { href: "/terms-of-service", label: "Terms of Service" },
              { href: "/cookie-policy", label: "Cookie Policy" },
            ].map(({ href, label, active }) => (
              <a
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
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Add these styles to your global CSS or add to your layout */}
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
