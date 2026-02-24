"use client";

// app/privacy-policy/page.tsx
import Link from "next/link";

// ── Animated Section Wrapper ─────────────────────────────────
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

// ── Section Title ─────────────────────────────────────────────
function SectionTitle({ roman, title }: { roman: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-5">
      <span className="text-xs text-[#c8a96e]/40 uppercase tracking-[0.3em] font-bold">
        {roman}
      </span>
      <div className="h-px flex-1 bg-[#1e1a14]" />
      <h2
        className="text-2xl sm:text-3xl font-bold text-[#f5f0e8]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

// ── Right Row ─────────────────────────────────────────────────
function RightRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-4 py-4 border-b border-[#1e1a14] hover:border-[#c8a96e]/20 transition-colors">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c8a96e]/30 group-hover:bg-[#c8a96e] transition-colors shrink-0" />
      <div>
        <span
          className="font-semibold text-[#d4c9b0] group-hover:text-[#f5f0e8] transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05em" }}
        >
          {title}
        </span>
        {desc && (
          <span className="text-sm text-[#5a5448] group-hover:text-[#7a7060] transition-colors ml-2">
            — {desc}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Bullet List Item ──────────────────────────────────────────
function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="group flex items-start gap-3 py-2">
      <span className="mt-2 w-1 h-1 rounded-full bg-[#c8a96e]/40 group-hover:bg-[#c8a96e] transition-colors shrink-0" />
      <span className="text-sm text-[#6a6050] group-hover:text-[#8a8070] leading-relaxed transition-colors">
        {children}
      </span>
    </li>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(3%, 2%); }
          30% { transform: translate(-1%, 4%); }
          40% { transform: translate(4%, -1%); }
          50% { transform: translate(-3%, 3%); }
          60% { transform: translate(2%, -2%); }
          70% { transform: translate(-4%, 1%); }
          80% { transform: translate(1%, -4%); }
          90% { transform: translate(3%, 3%); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .grain::after {
          content: '';
          position: fixed;
          inset: -200%;
          width: 400%;
          height: 400%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
          animation: grain 8s steps(1) infinite;
          z-index: 100;
        }

        ::selection {
          background: #c8a96e;
          color: #0a0a0a;
        }
      `}</style>

      <main className="grain relative min-h-screen bg-[#0a0a08] text-[#7a7060]" style={{ fontFamily: "'DM Mono', monospace" }}>

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse at center, #c8a96e 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.02]"
            style={{ background: "radial-gradient(ellipse at center, #4b6b8b 0%, transparent 70%)" }} />
        </div>

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="relative border-b border-[#1e1a14]">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded overflow-hidden">
                <img src="/laami.png" alt="LAAMI" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#4a4438]">
                <span className="text-[#c8a96e]">LAAMI</span> LABS
              </span>
            </div>

            <nav className="hidden sm:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">
              <span className="text-[#c8a96e]/60">Privacy</span>
              <Link href="/cookie-policy" className="hover:text-[#c8a96e]/70 transition-colors">Cookies</Link>
              <Link href="/terms-of-service" className="hover:text-[#c8a96e]/70 transition-colors">Terms</Link>
            </nav>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 pb-32">

          {/* ── Hero ──────────────────────────────────────────── */}
          <FadeSection>
            <section className="pt-24 pb-20 border-b border-[#1e1a14]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#3a3428] mb-8">
                laamilabs.co.ke / privacy-policy
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <div>
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight text-[#f5f0e8] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Privacy
                  </h1>
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      WebkitTextStroke: "1px rgba(200,169,110,0.4)",
                      color: "transparent",
                    }}
                  >
                    Policy
                  </h1>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-3 pb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">
                    Effective
                  </span>
                  <span
                    className="text-lg text-[#c8a96e]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {effectiveDate}
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a4438]">
                      Current Version
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Intro ─────────────────────────────────────────── */}
          <FadeSection delay={100}>
            <section className="py-16 border-b border-[#1e1a14] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a3428] mb-3">Overview</p>
                <div className="h-px w-8 bg-[#c8a96e]/40" />
              </div>
              <div>
                <p className="text-base text-[#8a8070] leading-loose">
                  At{" "}
                  <span className="text-[#c8a96e]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05em", fontStyle: "italic" }}>
                    LAAMI LABS
                  </span>
                  , accessible from{" "}
                  <span className="text-[#d4c9b0]">laamilabs.co.ke</span>,
                  the privacy of our visitors is a paramount concern.
                  This document outlines the categories of information we
                  collect, the reasons we collect it, and how we use it
                  to deliver and improve our services.
                </p>

                <div className="mt-8 p-5 border border-[#1e1a14] bg-[#0d0d0b]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-3">Commitment</p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    We are committed to handling your personal data with care,
                    transparency, and in full compliance with applicable data
                    protection laws including the GDPR and CCPA.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Consent ───────────────────────────────────────── */}
          <FadeSection delay={150}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="I" title="Consent" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its terms. Your continued use of our services following
                  any updates to this policy constitutes acceptance of those changes.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── Information We Collect ────────────────────────── */}
          <FadeSection delay={200}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="II" title="Information We Collect" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    Data is collected transparently and only for the purposes stated.
                  </p>
                </div>
                <div className="space-y-4 text-sm text-[#6a6050] leading-loose">
                  <p>
                    The personal information we request, and the reasons we request it,
                    will always be made clear to you at the point of collection.
                  </p>
                  <p>
                    If you contact us directly, we may receive additional information
                    such as your name, email address, phone number, the contents of
                    your message and any attachments, and other information you choose
                    to provide.
                  </p>
                  <p>
                    When you register for an account, we may ask for contact
                    information including your name, company name, address,
                    email address, and telephone number.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── How We Use Your Information ───────────────────── */}
          <FadeSection delay={250}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="III" title="How We Use Your Information" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1a14]">
                {[
                  { num: "01", label: "Operate", desc: "Provide and maintain our website" },
                  { num: "02", label: "Improve", desc: "Personalize and expand our services" },
                  { num: "03", label: "Analyze", desc: "Understand how you use our site" },
                  { num: "04", label: "Develop", desc: "Build new products and features" },
                  { num: "05", label: "Communicate", desc: "Correspond directly or via partners" },
                  { num: "06", label: "Protect", desc: "Detect and prevent fraud" },
                ].map(({ num, label, desc }) => (
                  <div
                    key={label}
                    className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors duration-300"
                  >
                    <div className="text-xs text-[#3a3428] mb-4 font-bold">{num}</div>
                    <div
                      className="text-lg font-bold text-[#d4c9b0] group-hover:text-[#f5f0e8] mb-2 transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {label}
                    </div>
                    <div className="text-xs text-[#4a4438] group-hover:text-[#6a6050] transition-colors">
                      {desc}
                    </div>
                    <div className="mt-6 h-px w-0 group-hover:w-full bg-[#c8a96e]/30 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </FadeSection>

          {/* ── Log Files ─────────────────────────────────────── */}
          <FadeSection delay={300}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IV" title="Log Files" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="space-y-4">
                  <p className="text-sm text-[#6a6050] leading-loose">
                    LAAMI LABS follows standard industry practice in maintaining log files.
                    These files record visitor activity on our servers as part of our hosting
                    analytics infrastructure.
                  </p>
                  <div className="p-5 border border-[#1e1a14] bg-[#0d0d0b]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-3">
                      Data Points Logged
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["IP Addresses", "Browser Type", "ISP", "Date & Time", "Referring Pages", "Click Count"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#5a5448]">
                          <span className="w-1 h-1 rounded-full bg-[#c8a96e]/30" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-[#3a3428]">
                      These are not linked to any personally identifiable information.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Cookies & Web Beacons ─────────────────────────── */}
          <FadeSection delay={325}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="V" title="Cookies & Web Beacons" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="space-y-4 text-sm text-[#6a6050] leading-loose">
                  <p>
                    Like most websites, LAAMI LABS uses cookies to store information
                    about visitor preferences and the pages accessed. This data is used
                    to optimize the user experience by customizing page content based on
                    browser type and browsing patterns.
                  </p>
                  <p>
                    For a detailed account of how we use cookies specifically, please
                    review our{" "}
                    <Link
                      href="/cookie-policy"
                      className="text-[#c8a96e] hover:text-[#d4b97e] transition-colors underline underline-offset-4 decoration-[#c8a96e]/30"
                    >
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Advertising Partners ──────────────────────────── */}
          <FadeSection delay={350}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VI" title="Advertising Partners" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    Third-party networks operate under their own policies.
                  </p>
                </div>
                <div className="space-y-4 text-sm text-[#6a6050] leading-loose">
                  <p>
                    Third-party ad servers and networks may use technologies such
                    as cookies, JavaScript, or Web Beacons in advertisements and
                    links appearing on LAAMI LABS. These are sent directly to your
                    browser, and your IP address is automatically received at that point.
                  </p>
                  <p>
                    LAAMI LABS has no access to or control over the cookies used
                    by third-party advertisers. We recommend consulting their
                    individual privacy policies for full details.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Third Party Policies ──────────────────────────── */}
          <FadeSection delay={375}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VII" title="Third-Party Policies" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  This Privacy Policy applies solely to LAAMI LABS and does not extend
                  to third-party advertisers or external websites linked from our platform.
                  We advise consulting the respective Privacy Policies of any third-party
                  services you interact with, including instructions on how to opt out
                  of certain data practices.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── CCPA + GDPR ───────────────────────────────────── */}
          <FadeSection delay={400}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VIII" title="Your Legal Rights" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1a14]">
                {/* CCPA */}
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">California</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">CCPA</span>
                  </div>
                  <p className="text-xs text-[#4a4438] leading-relaxed mb-6">
                    Under the California Consumer Privacy Act, California residents have the right to:
                  </p>
                  <ul className="space-y-1">
                    {[
                      "Request disclosure of personal data categories collected",
                      "Request deletion of collected personal data",
                      "Opt out of the sale of personal data",
                    ].map((item) => <BulletItem key={item}>{item}</BulletItem>)}
                  </ul>
                  <p className="mt-6 text-xs text-[#3a3428]">
                    We respond to all requests within one calendar month.
                  </p>
                </div>

                {/* GDPR */}
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">European Union</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">GDPR</span>
                  </div>
                  <p className="text-xs text-[#4a4438] leading-relaxed mb-6">
                    Every user holds the following data protection rights:
                  </p>
                  <div className="pl-4">
                    {[
                      ["Access", "Request copies of your personal data"],
                      ["Rectification", "Correct inaccurate information"],
                      ["Erasure", "Request deletion of your data"],
                      ["Restrict", "Limit how your data is processed"],
                      ["Object", "Object to data processing"],
                      ["Portability", "Transfer data to another organization"],
                    ].map(([right, desc]) => (
                      <RightRow key={right} title={right} desc={desc} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Children's Information ────────────────────────── */}
          <FadeSection delay={425}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IX" title="Children's Information" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    Protecting children online is a priority.
                  </p>
                </div>
                <div className="space-y-4 text-sm text-[#6a6050] leading-loose">
                  <p>
                    We encourage parents and guardians to observe, participate in,
                    and monitor their children&apos;s online activity. LAAMI LABS does
                    not knowingly collect personally identifiable information from
                    children under the age of 13.
                  </p>
                  <p>
                    If you believe your child has submitted personal information on
                    our website, please contact us immediately. We will make every
                    effort to promptly remove such information from our records.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Contact ───────────────────────────────────────── */}
          <FadeSection delay={450}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="X" title="Contact" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1a14]">
                <a
                  href="mailto:inquiry@laamilabs.co.ke"
                  className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">Email</div>
                  <div
                    className="text-base font-bold text-[#d4c9b0] group-hover:text-[#c8a96e] transition-colors leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    inquiry@laamilabs.co.ke
                  </div>
                  <div className="mt-4 text-[#3a3428] group-hover:translate-x-1 transition-transform text-xs">→</div>
                </a>

                <a
                  href="tel:+234707848528"
                  className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">Phone</div>
                  <div
                    className="text-base font-bold text-[#d4c9b0] group-hover:text-[#c8a96e] transition-colors leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    +234 707 848 528
                  </div>
                  <div className="mt-4 text-[#3a3428] group-hover:translate-x-1 transition-transform text-xs">→</div>
                </a>

                <div className="bg-[#0a0a08] p-8">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">Office</div>
                  <div
                    className="text-base font-bold text-[#d4c9b0] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Eldoret, Kenya
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[#3a3428]">EA +3</div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Footer ────────────────────────────────────────── */}
          <FadeSection delay={500}>
            <footer className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <p className="text-[10px] text-[#2a2418] uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} LAAMI LABS — All rights reserved
              </p>

              <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em]">
                <Link href="/" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Home
                </Link>
                <span className="text-[#c8a96e]/40">Privacy</span>
                <Link href="/cookie-policy" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Cookies
                </Link>
                <Link href="/terms-of-service" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Terms
                </Link>
              </div>
            </footer>
          </FadeSection>

        </div>
      </main>
    </>
  );
}