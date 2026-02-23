"use client";

// app/terms-of-service/page.tsx
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
          <div className="absolute inset-0 bg-[#a50044]/20 dark:bg-[#a50044]/30 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#a50044]/10 to-[#004d98]/10 dark:from-[#a50044]/20 dark:to-[#004d98]/20 border border-[#a50044]/20 dark:border-[#a50044]/30 group-hover:border-[#a50044]/40 dark:group-hover:border-[#a50044]/50 transition-all">
            <span className="text-[#a50044] dark:text-[#ff6699] group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 ">
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

// ── SVG icons (using same icon set as Privacy Policy) ───────────────────
const Icons = {
  // Legal & Documents
  scroll: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  handshake: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  document: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  prohibited: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  copyright: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75L21 15m-6-6l3-3m-3 3h4.5" />
    </svg>
  ),
  termination: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  liability: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  gavel: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97c.48.212.936.47 1.36.758m0 0c.423.288.79.624 1.09 1.004m-2.45-1.762l-1.588 1.588M21 12c0 .963-.126 1.896-.364 2.784m-2.45-7.876l-1.586 1.586M5.25 4.97c-.48.212-.936.47-1.36.758m0 0c-.423.288-.79.624-1.09 1.004m2.45-1.762l1.588 1.588M3 12c0 .963.126 1.896.364 2.784m0 0l1.586-1.586M7.5 21.818v-.955A4.5 4.5 0 0112 16.5v.955m0 0a4.5 4.5 0 014.5 4.5h-9a4.5 4.5 0 014.5-4.5z" />
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
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
};

// ── Page ─────────────────────────────────────────────────────
export default function TermsOfService() {
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
              <div className="absolute inset-0 bg-[#a50044]/20 dark:bg-[#a50044]/30 rounded-2xl blur-2xl" />
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
            Terms of{" "}
            <span className="text-[#a50044] dark:text-[#ff6699]">Service</span>
          </h1>
          <p className="text-lg text-[#475569] dark:text-[#94a3b8] font-poppins">
            Last updated:{" "}
            <span className="font-semibold text-[#004d98] dark:text-[#6fa8ff]">
              {effectiveDate}
            </span>
          </p>
        </section>

        {/* ── Content card ──────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#004d98] to-[#a50044] rounded-3xl blur-xl opacity-20" />

            <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl border border-[#a50044]/10 dark:border-[#a50044]/30 shadow-xl overflow-hidden">
              {/* Modern header accent */}
              <div className="h-2 bg-gradient-to-r from-[#004d98] via-[#a50044] to-[#004d98]" />

              <div className="px-6 sm:px-10 md:px-12 py-12 space-y-12">
                {/* Intro with modern styling */}
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#004d98] to-[#a50044] rounded-full" />
                  <p className="pl-4 text-lg text-[#334155] dark:text-[#cbd5e1] leading-relaxed font-poppins">
                    Welcome to{" "}
                    <span className="font-bold text-[#a50044] dark:text-[#ff6699]">
                      LAAMI LABS
                    </span>
                    . By accessing or using our website at{" "}
                    <span className="font-bold text-[#004d98] dark:text-[#6fa8ff]">
                      laamilabs.co.ke
                    </span>
                    , you agree to be bound by these Terms of Service and all
                    applicable laws and regulations. If you do not agree with any of
                    these terms, you are prohibited from using or accessing this
                    site.
                  </p>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#a50044]/10 dark:border-[#a50044]/30" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-[#0f172a] px-4 text-xs uppercase tracking-wider text-[#a50044]/50 dark:text-[#ff6699]/50 font-poppins">
                      Legal Agreement
                    </span>
                  </div>
                </div>

                {/* Sections with increased spacing */}
                <div className="space-y-12">
                  <Section title="Agreement to Terms" icon={Icons.handshake}>
                    <p>
                      By accessing our services, you confirm that you are at least 18
                      years old or have parental/guardian consent, and that you agree
                      to comply with these terms. These terms constitute a legally
                      binding agreement between you and LAAMI LABS.
                    </p>
                  </Section>

                  <Section title="Definitions" icon={Icons.scroll}>
                    <div className="space-y-3">
                      <p>
                        <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
                          &quot;Company&quot;
                        </span>{" "}
                        (referred to as either &quot;the Company&quot;,
                        &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                        Agreement) refers to LAAMI LABS, Eldoret, Kenya.
                      </p>
                      <p>
                        <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
                          &quot;Service&quot;
                        </span>{" "}
                        refers to the website and all associated services provided by
                        LAAMI LABS.
                      </p>
                      <p>
                        <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
                          &quot;User&quot;
                        </span>{" "}
                        (referred to as &quot;You&quot;, &quot;Your&quot;) refers to
                        any individual accessing or using the Service.
                      </p>
                      <p>
                        <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
                          &quot;Content&quot;
                        </span>{" "}
                        refers to text, images, videos, audio, or any other material
                        that can be posted, uploaded, or shared on our Service.
                      </p>
                    </div>
                  </Section>

                  <Section title="User Accounts" icon={Icons.user}>
                    <div className="space-y-4">
                      <p>
                        When you create an account with us, you must provide accurate,
                        complete, and current information. Failure to do so
                        constitutes a breach of the Terms, which may result in
                        immediate termination of your account.
                      </p>

                      <div className="bg-gradient-to-r from-[#a50044]/5 to-[#004d98]/5 p-5 rounded-xl border border-[#a50044]/20 dark:border-[#004d98]/30">
                        <p className="font-semibold mb-2 text-[#0d1b2e] dark:text-white font-poppins">
                          You are responsible for:
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Maintaining the security of your account",
                            "All activities that occur under your account",
                            "Notifying us immediately of any unauthorized use",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span className="mt-1 text-[#a50044] dark:text-[#ff6699] shrink-0">
                                {Icons.check}
                              </span>
                              <span className="text-sm font-poppins">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Section>

                  <Section title="User Content" icon={Icons.document}>
                    <div className="space-y-4">
                      <p>
                        Our Service allows you to post, link, store, share and
                        otherwise make available certain information, text, graphics,
                        videos, or other material. You retain all rights to your
                        Content, but you grant us a license to use it.
                      </p>

                      <p className="font-semibold text-[#0d1b2e] dark:text-white font-poppins">
                        By posting Content, you represent and warrant that:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "The Content is yours or you have the right to use it",
                          "The Content does not violate any third-party rights",
                          "The Content is not illegal, harmful, or misleading",
                          "You will not impersonate any person or entity",
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
                        We reserve the right to remove any Content that violates these
                        terms without prior notice.
                      </p>
                    </div>
                  </Section>

                  <Section title="Prohibited Activities" icon={Icons.prohibited}>
                    <div className="space-y-3">
                      <p>
                        You may not access or use the Service for any purpose other
                        than that for which we make it available. The Service may not
                        be used in connection with any commercial purposes except
                        those specifically endorsed or approved by us.
                      </p>

                      <p className="font-semibold mt-4 text-[#0d1b2e] dark:text-white font-poppins">
                        As a user, you agree not to:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        {[
                          "Violate any applicable laws or regulations",
                          "Infringe on intellectual property rights",
                          "Harass, abuse, or harm another person",
                          "Impersonate any person or entity",
                          "Interfere with or disrupt the Service",
                          "Attempt to gain unauthorized access to our systems",
                          "Collect or track personal information of others",
                          "Use the Service for any illegal or unauthorized purpose",
                          "Post spam, malware, or malicious content",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-1 text-[#a50044] dark:text-[#ff6699] shrink-0">
                              {Icons.check}
                            </span>
                            <span className="text-sm font-poppins">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Intellectual Property" icon={Icons.copyright}>
                    <div className="space-y-4">
                      <p>
                        The Service and its original content (excluding Content
                        provided by users), features, and functionality are and will
                        remain the exclusive property of LAAMI LABS and its licensors.
                      </p>

                      <p>
                        Our trademarks and trade dress may not be used in connection
                        with any product or service without our prior written consent.
                        This includes:
                      </p>

                      <div className="flex flex-wrap gap-3 mt-2">
                        {[
                          "LAAMI LABS",
                          "LAAMI",
                          "All logos and designs",
                        ].map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 rounded-full bg-gradient-to-r from-[#a50044]/10 to-[#004d98]/10 text-[#0d1b2e] dark:text-white text-sm font-medium font-poppins border border-[#a50044]/20 dark:border-[#004d98]/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Section>

                  <Section title="Copyright Policy" icon={Icons.copyright}>
                    <p>
                      We respect the intellectual property rights of others. It is our
                      policy to respond to any claim that Content posted on the
                      Service infringes the copyright or other intellectual property
                      rights of any person.
                    </p>
                    <p className="mt-3">
                      If you are a copyright owner or authorized to act on behalf of
                      one, please report any alleged infringements by contacting our
                      Copyright Agent at{" "}
                      <a
                        href="mailto:copyright@laamilabs.co.ke"
                        className="text-[#004d98] dark:text-[#6fa8ff] hover:text-[#a50044] dark:hover:text-[#ff6699] underline-offset-4 underline font-medium transition-colors font-poppins"
                      >
                        inquiry@laamilabs.co.ke
                      </a>
                      .
                    </p>
                  </Section>

                  <Section title="Termination" icon={Icons.termination}>
                    <p>
                      We may terminate or suspend your account and bar access to the
                      Service immediately, without prior notice or liability, under
                      our sole discretion, for any reason whatsoever, including
                      without limitation a breach of the Terms.
                    </p>
                    <p className="mt-3">
                      If you wish to terminate your account, you may simply
                      discontinue using the Service or contact us to request account
                      deletion.
                    </p>
                  </Section>

                  <Section title="Limitation of Liability" icon={Icons.liability}>
                    <div className="space-y-3">
                      <p>
                        In no event shall LAAMI LABS, nor its directors, employees,
                        partners, agents, suppliers, or affiliates, be liable for any
                        indirect, incidental, special, consequential or punitive
                        damages, including without limitation, loss of profits, data,
                        use, goodwill, or other intangible losses, resulting from:
                      </p>
                      <ul className="space-y-2 mt-3">
                        {[
                          "Your use or inability to use the Service",
                          "Any conduct or content of any third party on the Service",
                          "Any content obtained from the Service",
                          "Unauthorized access, use, or alteration of your transmissions or content",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-1 text-[#a50044] dark:text-[#ff6699] shrink-0">
                              {Icons.check}
                            </span>
                            <span className="text-sm font-poppins">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section title="Disclaimer of Warranties" icon={Icons.liability}>
                    <p>
                      The Service is provided on an &quot;AS IS&quot; and &quot;AS
                      AVAILABLE&quot; basis. The Service is provided without
                      warranties of any kind, whether express or implied, including,
                      but not limited to, implied warranties of merchantability,
                      fitness for a particular purpose, non-infringement or course of
                      performance.
                    </p>
                  </Section>

                  <Section title="Governing Law" icon={Icons.gavel}>
                    <p>
                      These Terms shall be governed and construed in accordance with
                      the laws of Kenya, without regard to its conflict of law
                      provisions.
                    </p>
                    <p className="mt-3">
                      Our failure to enforce any right or provision of these Terms
                      will not be considered a waiver of those rights. If any
                      provision of these Terms is held to be invalid or unenforceable
                      by a court, the remaining provisions of these Terms will remain
                      in effect.
                    </p>
                  </Section>

                  <Section title="Changes to Terms" icon={Icons.refresh}>
                    <p>
                      We reserve the right, at our sole discretion, to modify or
                      replace these Terms at any time. If a revision is material, we
                      will try to provide at least 30 days&apos; notice prior to any
                      new terms taking effect. What constitutes a material change will
                      be determined at our sole discretion.
                    </p>
                    <p className="mt-3">
                      By continuing to access or use our Service after those revisions
                      become effective, you agree to be bound by the revised terms.
                    </p>
                  </Section>

                  <Section title="Contact Us" icon={Icons.mail}>
                    <p className="mb-4">
                      If you have any questions about these Terms of Service, please
                      contact us:
                    </p>

                    {/* Modern contact card */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="mailto:legal@laamilabs.co.ke"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#a50044]/5 dark:bg-[#a50044]/10 border border-[#a50044]/10 dark:border-[#a50044]/30 hover:border-[#a50044]/30 dark:hover:border-[#a50044]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#a50044]/10 dark:bg-[#a50044]/20 text-[#a50044] dark:text-[#ff6699] group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.57 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#a50044]/60 dark:text-[#ff6699]/60 font-poppins">
                            Email
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white group-hover:text-[#a50044] dark:group-hover:text-[#ff6699] transition-colors font-poppins">
                            legal@laamilabs.co.ke
                          </div>
                        </div>
                      </a>

                      <a
                        href="tel:+234707848528"
                        className="group flex items-center gap-3 p-4 rounded-xl bg-[#004d98]/5 dark:bg-[#004d98]/10 border border-[#004d98]/10 dark:border-[#004d98]/30 hover:border-[#004d98]/30 dark:hover:border-[#004d98]/50 transition-all"
                      >
                        <div className="p-2 rounded-lg bg-[#004d98]/10 dark:bg-[#004d98]/20 text-[#004d98] dark:text-[#6fa8ff] group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#004d98]/60 dark:text-[#6fa8ff]/60 font-poppins">
                            Phone
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white group-hover:text-[#004d98] dark:group-hover:text-[#6fa8ff] transition-colors font-poppins">
                            +234 707 848 528
                          </div>
                        </div>
                      </a>

                      <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#a50044]/5 to-[#004d98]/5 border border-[#a50044]/20 dark:border-[#004d98]/30">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[#a50044]/10 to-[#004d98]/10 text-[#a50044] dark:text-[#ff6699]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-[#a50044]/60 dark:text-[#ff6699]/60 font-poppins">
                            Office
                          </div>
                          <div className="text-sm font-medium text-[#0d1b2e] dark:text-white font-poppins">
                            Eldoret, Kenya
                          </div>
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section title="Acknowledgement" icon={Icons.check}>
                    <p className="font-semibold text-[#0d1b2e] dark:text-white">
                      BY USING THE SERVICE OR OTHER SERVICES PROVIDED BY LAAMI LABS,
                      YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
                      AGREE TO BE BOUND BY THEM.
                    </p>
                  </Section>
                </div>

                {/* Footer note */}
                <div className="pt-8 border-t border-[#a50044]/10 dark:border-[#a50044]/30">
                  <p className="text-center text-sm text-[#64748b] dark:text-[#94a3b8] font-poppins">
                    © {new Date().getFullYear()} LAAMI LABS. All rights reserved.
                    These Terms of Service were last updated on{" "}
                    <span className="font-semibold text-[#a50044] dark:text-[#ff6699]">
                      {effectiveDate}
                    </span>
                    .
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#a50044] text-[#a50044] dark:border-[#ff6699] dark:text-[#ff6699] font-semibold text-sm hover:bg-[#a50044]/5 dark:hover:bg-[#ff6699]/10 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a50044] shadow-lg font-poppins"
            >
              Read Privacy Policy
              {Icons.arrowRight}
            </Link>
          </div>

          {/* ── Footer links ────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/terms-of-service", label: "Terms of Service", active: true },
              { href: "/cookie-policy", label: "Cookie Policy" },
            ].map(({ href, label, active }) => (
              <Link
                key={href}
                href={href}
                className={`
                  text-sm font-medium transition-colors font-poppins
                  ${
                    active
                      ? "text-[#a50044] dark:text-[#ff6699]"
                      : "text-[#64748b] dark:text-[#94a3b8] hover:text-[#a50044] dark:hover:text-[#ff6699]"
                  }
                `}
              >
                {label}
                {active && (
                  <span className="ml-2 inline-block w-1 h-1 rounded-full bg-[#a50044] dark:bg-[#ff6699]" />
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