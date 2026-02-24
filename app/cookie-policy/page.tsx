"use client";

// app/cookie-policy/page.tsx
import Link from "next/link";
import { useState } from "react";

// ── Types ───────────────────────────────────────────────────
type CookieType = "essential" | "preference" | "analytics" | "marketing";

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

// ── Cookie Pill Badge ────────────────────────────────────────
function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-bold rounded-full border transition-all ${
        active
          ? "bg-[#c8a96e] text-[#0a0a0a] border-[#c8a96e]"
          : "bg-transparent text-[#c8a96e] border-[#c8a96e]/40"
      }`}
    >
      {label}
    </span>
  );
}

// ── Cookie Type Card ─────────────────────────────────────────
function CookieCard({
  number,
  type,
  title,
  description,
  tags,
  accent,
}: {
  number: string;
  type: CookieType;
  title: string;
  description: string;
  tags: string[];
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group cursor-default transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px transition-all duration-500"
        style={{ backgroundColor: hovered ? accent : "rgba(200,169,110,0.2)" }}
      />

      <div className="pl-8 pr-4 py-8">
        {/* Number + Title row */}
        <div className="flex items-baseline gap-4 mb-4">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300"
            style={{ color: hovered ? accent : "rgba(200,169,110,0.4)" }}
          >
            {number}
          </span>
          <h3
            className="text-xl font-bold tracking-tight transition-colors duration-300"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: hovered ? "#f5f0e8" : "#d4c9b0",
            }}
          >
            {title}
          </h3>
        </div>

        <p className="text-sm text-[#7a7060] leading-relaxed mb-5 group-hover:text-[#9a9080] transition-colors duration-300">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} label={tag} active={hovered} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Browser Row ───────────────────────────────────────────────
function BrowserRow({
  browser,
  path,
  link,
}: {
  browser: string;
  path: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 border-b border-[#1e1a14] hover:border-[#c8a96e]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]/40 group-hover:bg-[#c8a96e] transition-colors duration-300" />
        <span
          className="text-base font-semibold text-[#d4c9b0] group-hover:text-[#f5f0e8] transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {browser}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#4a4438] group-hover:text-[#7a7060] transition-colors duration-300 hidden sm:block">
          {path}
        </span>
        <span className="text-[#c8a96e]/40 group-hover:text-[#c8a96e] transition-all duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </a>
  );
}

// ── Third-party Row ───────────────────────────────────────────
function ThirdPartyRow({
  name,
  role,
  link,
}: {
  name: string;
  role: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-5 border-b border-[#1e1a14] hover:border-[#c8a96e]/20 transition-all"
    >
      <div>
        <div
          className="text-base font-bold text-[#d4c9b0] group-hover:text-[#f5f0e8] mb-1 transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {name}
        </div>
        <div className="text-xs text-[#4a4438] group-hover:text-[#6a6050] transition-colors">
          {role}
        </div>
      </div>
      <span className="text-xs text-[#c8a96e]/40 group-hover:text-[#c8a96e] group-hover:translate-x-1 transition-all duration-300">
        Privacy Policy ↗
      </span>
    </a>
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

// ── Page ─────────────────────────────────────────────────────
export default function CookiePolicy() {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* Google Font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
          from { width: 0; }
          to { width: 100%; }
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

        {/* Ambient radial glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse at center, #c8a96e 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.02]"
            style={{ background: "radial-gradient(ellipse at center, #8b4b6b 0%, transparent 70%)" }} />
        </div>

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="relative border-b border-[#1e1a14]">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded overflow-hidden">
                <img src="/laami.png" alt="LAAMI" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#4a4438]">
                <span className="text-[#c8a96e]">LAAMI</span> LABS
              </span>
            </div>

            {/* Nav pills */}
            <nav className="hidden sm:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">
              <Link href="/privacy-policy" className="hover:text-[#c8a96e]/70 transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-[#c8a96e]/70 transition-colors">Terms</Link>
              <span className="text-[#c8a96e]/60">Cookies</span>
            </nav>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 pb-32">

          {/* ── Hero ──────────────────────────────────────────── */}
          <FadeSection>
            <section className="pt-24 pb-20 border-b border-[#1e1a14]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#3a3428] mb-8">
                laamilabs.co.ke / cookie-policy
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <div>
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight text-[#f5f0e8] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Cookie
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

          {/* ── Intro ──────────────────────────────────────────── */}
          <FadeSection delay={100}>
            <section className="py-16 border-b border-[#1e1a14] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a3428] mb-3">Overview</p>
                <div className="h-px w-8 bg-[#c8a96e]/40" />
              </div>
              <div>
                <p className="text-base text-[#8a8070] leading-loose">
                  This Cookie Policy explains how{" "}
                  <span className="text-[#c8a96e]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05em", fontStyle: "italic" }}>
                    LAAMI LABS
                  </span>{" "}
                  uses cookies and similar tracking technologies on{" "}
                  <span className="text-[#d4c9b0]">laamilabs.co.ke</span>.
                  By continuing to use our site, you acknowledge and consent
                  to our use of cookies as described herein.
                </p>

                {/* Fun Fact callout */}
                <div className="mt-8 p-5 border border-[#1e1a14] bg-[#0d0d0b]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-3">Etymology</p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    The term &quot;cookie&quot; derives from the computing concept of a{" "}
                    <em className="text-[#7a7060]">&quot;magic cookie&quot;</em> — a
                    packet of data a program receives and sends back unchanged.
                    First used in web browsers by Lou Montulli in 1994.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── What Are Cookies ──────────────────────────────── */}
          <FadeSection delay={150}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="I" title="What Are Cookies" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  Cookies are small text files stored on your device when you visit a website.
                  They enable websites to remember your actions and preferences over time, so
                  you don&apos;t have to keep re-entering them. Cookies also allow us to understand
                  how visitors interact with our content — making it possible to improve
                  performance, security, and personalization at every layer.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── How We Use Cookies ────────────────────────────── */}
          <FadeSection delay={200}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="II" title="How We Use Cookies" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1a14]">
                {[
                  { label: "Authentication", desc: "Keep you signed in securely" },
                  { label: "Preferences", desc: "Remember your settings" },
                  { label: "Analytics", desc: "Understand traffic patterns" },
                  { label: "Security", desc: "Detect fraud and abuse" },
                  { label: "Performance", desc: "Optimize load speed" },
                  { label: "Marketing", desc: "Serve relevant content" },
                ].map(({ label, desc }, i) => (
                  <div
                    key={label}
                    className="group bg-[#0a0a08] p-8 hover:bg-[#0d0d0b] transition-colors duration-300"
                  >
                    <div className="text-xs text-[#3a3428] mb-4 font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
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

          {/* ── Types of Cookies ──────────────────────────────── */}
          <FadeSection delay={250}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="III" title="Types of Cookies" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1e1a14]">
                <CookieCard
                  number="01"
                  type="essential"
                  title="Essential"
                  description="Necessary for core website functionality. These cannot be disabled — they power security, session management, and account access. Without them, the site simply cannot run."
                  tags={["Session", "Authentication", "Security"]}
                  accent="#c8a96e"
                />
                <CookieCard
                  number="02"
                  type="preference"
                  title="Preference"
                  description="These remember your choices: language, theme, region. They make your experience feel tailored without requiring you to reconfigure on every visit."
                  tags={["Language", "Theme", "Region"]}
                  accent="#8b7b5e"
                />
                <CookieCard
                  number="03"
                  type="analytics"
                  title="Analytics"
                  description="Help us understand how visitors interact with our site — which pages perform, where friction occurs, and how to improve. Data is collected anonymously and in aggregate."
                  tags={["Google Analytics", "Page Views", "Behavior"]}
                  accent="#a08060"
                />
                <CookieCard
                  number="04"
                  type="marketing"
                  title="Marketing"
                  description="Track browsing patterns to surface relevant content and measure the effectiveness of campaigns. Managed by both us and trusted third-party partners."
                  tags={["Tracking", "Social Media", "Advertising"]}
                  accent="#7a6b50"
                />
              </div>
            </section>
          </FadeSection>

          {/* ── Third-Party Cookies ────────────────────────────── */}
          <FadeSection delay={300}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IV" title="Third-Party Partners" />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    We work with trusted partners who may set their own cookies.
                    Each operates under their own privacy terms.
                  </p>
                </div>
                <div>
                  <ThirdPartyRow
                    name="Google Analytics"
                    role="Traffic analysis & behavioral reporting"
                    link="https://policies.google.com/privacy"
                  />
                  <ThirdPartyRow
                    name="Stripe"
                    role="Payment processing & fraud prevention"
                    link="https://stripe.com/privacy"
                  />
                  <ThirdPartyRow
                    name="Cloudflare"
                    role="Security, CDN & performance optimization"
                    link="https://www.cloudflare.com/privacypolicy/"
                  />
                  <ThirdPartyRow
                    name="Social Media Platforms"
                    role="Sharing, engagement & social features"
                    link="#"
                  />
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Cookie Duration ───────────────────────────────── */}
          <FadeSection delay={350}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="V" title="Cookie Duration" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1a14]">
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Type A</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                  </div>
                  <h4
                    className="text-2xl font-bold text-[#f5f0e8] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Session Cookies
                  </h4>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    Ephemeral by nature — they exist only for the duration of your browser session.
                    The moment you close the tab, they dissolve. Essential for real-time functionality.
                  </p>
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-[#1e1a14] overflow-hidden">
                      <div className="h-full w-1/3 rounded-full bg-[#c8a96e]/30" />
                    </div>
                    <span className="text-[10px] text-[#3a3428]">Short-lived</span>
                  </div>
                </div>

                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Type B</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                  </div>
                  <h4
                    className="text-2xl font-bold text-[#f5f0e8] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Persistent Cookies
                  </h4>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    These outlive the session — stored on your device for a set period or until
                    manually cleared. They remember who you are across return visits.
                  </p>
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-[#1e1a14] overflow-hidden">
                      <div className="h-full w-5/6 rounded-full bg-[#c8a96e]/30" />
                    </div>
                    <span className="text-[10px] text-[#3a3428]">Long-lived</span>
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Managing Cookies ──────────────────────────────── */}
          <FadeSection delay={400}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VI" title="Managing Cookies" />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-10">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  Your browser gives you full control. Below are direct paths to cookie
                  settings in the most common browsers. Note that disabling non-essential
                  cookies may affect the quality of your experience.
                </p>
              </div>

              <div className="pl-8">
                <BrowserRow
                  browser="Google Chrome"
                  path="Settings → Privacy & Security → Cookies"
                  link="https://support.google.com/chrome/answer/95647"
                />
                <BrowserRow
                  browser="Mozilla Firefox"
                  path="Options → Privacy & Security → Cookies"
                  link="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                />
                <BrowserRow
                  browser="Safari"
                  path="Preferences → Privacy → Cookies"
                  link="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                />
                <BrowserRow
                  browser="Microsoft Edge"
                  path="Settings → Cookies and Site Permissions"
                  link="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                />
              </div>
            </section>
          </FadeSection>

          {/* ── Consent & Updates ─────────────────────────────── */}
          <FadeSection delay={450}>
            <section className="py-16 border-b border-[#1e1a14] grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1a14]">
              <div className="bg-[#0a0a08] p-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a3428] mb-6">
                  VII — Your Consent
                </p>
                <h3
                  className="text-xl font-bold text-[#d4c9b0] mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Consent & Control
                </h3>
                <p className="text-sm text-[#5a5448] leading-relaxed mb-5">
                  Continued use of our website constitutes consent to this policy.
                  On your first visit, our cookie banner lets you accept all, customize
                  preferences, or review this policy in detail.
                </p>
                <p className="text-sm text-[#5a5448] leading-relaxed">
                  You may update your preferences at any time via the{" "}
                  <span className="text-[#c8a96e]/70 italic">Cookie Settings</span>{" "}
                  link in our site footer.
                </p>
              </div>

              <div className="bg-[#0a0a08] p-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a3428] mb-6">
                  VIII — Policy Updates
                </p>
                <h3
                  className="text-xl font-bold text-[#d4c9b0] mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Updates to This Policy
                </h3>
                <p className="text-sm text-[#5a5448] leading-relaxed">
                  We may revise this Cookie Policy periodically in response to changes
                  in technology, regulation, or our practices. Revisions are posted here
                  with an updated effective date. We encourage periodic review.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── Contact ───────────────────────────────────────── */}
          <FadeSection delay={500}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IX" title="Contact" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1a14]">
                <a
                  href="mailto:privacy@laamilabs.co.ke"
                  className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">Email</div>
                  <div
                    className="text-base font-bold text-[#d4c9b0] group-hover:text-[#c8a96e] transition-colors leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    privacy@laamilabs.co.ke
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
          <FadeSection delay={550}>
            <footer className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <p className="text-[10px] text-[#2a2418] uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} LAAMI LABS — All rights reserved
              </p>

              <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em]">
                <Link href="/" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Home
                </Link>
                <Link href="/privacy-policy" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Terms
                </Link>
                <span className="text-[#c8a96e]/40">Cookies</span>
              </div>
            </footer>
          </FadeSection>

        </div>
      </main>
    </>
  );
}