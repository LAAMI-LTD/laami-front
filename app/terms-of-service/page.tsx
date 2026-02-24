"use client";

// app/terms-of-service/page.tsx
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

// ── Bullet Item ───────────────────────────────────────────────
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

// ── Definition Row ────────────────────────────────────────────
function DefRow({ term, definition }: { term: string; definition: string }) {
  return (
    <div className="group flex items-start gap-4 py-5 border-b border-[#1e1a14] hover:border-[#c8a96e]/20 transition-colors">
      <span
        className="shrink-0 text-sm font-bold text-[#c8a96e]/60 group-hover:text-[#c8a96e] transition-colors w-28"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1em" }}
      >
        &quot;{term}&quot;
      </span>
      <span className="text-sm text-[#6a6050] group-hover:text-[#8a8070] leading-relaxed transition-colors">
        {definition}
      </span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function TermsOfService() {
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
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-[0.02]"
            style={{ background: "radial-gradient(ellipse at center, #6b4b8b 0%, transparent 70%)" }} />
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
              <Link href="/privacy-policy" className="hover:text-[#c8a96e]/70 transition-colors">Privacy</Link>
              <Link href="/cookie-policy" className="hover:text-[#c8a96e]/70 transition-colors">Cookies</Link>
              <span className="text-[#c8a96e]/60">Terms</span>
            </nav>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 pb-32">

          {/* ── Hero ──────────────────────────────────────────── */}
          <FadeSection>
            <section className="pt-24 pb-20 border-b border-[#1e1a14]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#3a3428] mb-8">
                laamilabs.co.ke / terms-of-service
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <div>
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight text-[#f5f0e8] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Terms of
                  </h1>
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      WebkitTextStroke: "1px rgba(200,169,110,0.4)",
                      color: "transparent",
                    }}
                  >
                    Service
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
                  Welcome to{" "}
                  <span className="text-[#c8a96e]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05em", fontStyle: "italic" }}>
                    LAAMI LABS
                  </span>
                  . By accessing or using our website at{" "}
                  <span className="text-[#d4c9b0]">laamilabs.co.ke</span>,
                  you agree to be bound by these Terms of Service and all applicable
                  laws and regulations. If you do not agree with any of these terms,
                  you are prohibited from using or accessing this site.
                </p>

                <div className="mt-8 p-5 border border-[#1e1a14] bg-[#0d0d0b]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-3">Legal Notice</p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    These Terms constitute a legally binding agreement between you and
                    LAAMI LABS. Please read them carefully before using our services.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Agreement to Terms ────────────────────────────── */}
          <FadeSection delay={150}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="I" title="Agreement to Terms" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  By accessing our services, you confirm that you are at least 18 years old
                  or have parental or guardian consent, and that you agree to comply with
                  these terms. These terms constitute a legally binding agreement between
                  you and LAAMI LABS.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── Definitions ───────────────────────────────────── */}
          <FadeSection delay={175}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="II" title="Definitions" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    Key terms used throughout this agreement.
                  </p>
                </div>
                <div className="pl-4">
                  <DefRow
                    term="Company"
                    definition="Referred to as 'We', 'Us', or 'Our' — refers to LAAMI LABS, Eldoret, Kenya."
                  />
                  <DefRow
                    term="Service"
                    definition="The website and all associated services provided by LAAMI LABS at laamilabs.co.ke."
                  />
                  <DefRow
                    term="User"
                    definition="Referred to as 'You' or 'Your' — any individual accessing or using the Service."
                  />
                  <DefRow
                    term="Content"
                    definition="Text, images, videos, audio, or any other material that can be posted, uploaded, or shared on our Service."
                  />
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── User Accounts ─────────────────────────────────── */}
          <FadeSection delay={200}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="III" title="User Accounts" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="space-y-6">
                  <p className="text-sm text-[#6a6050] leading-loose">
                    When you create an account with us, you must provide accurate,
                    complete, and current information. Failure to do so constitutes a
                    breach of the Terms, which may result in immediate termination of
                    your account.
                  </p>

                  <div className="p-6 border border-[#1e1a14] bg-[#0d0d0b]">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-4">
                      Your Responsibilities
                    </p>
                    <ul className="space-y-1">
                      {[
                        "Maintaining the security and confidentiality of your account",
                        "All activities that occur under your account credentials",
                        "Notifying us immediately of any unauthorized use or breach",
                      ].map((item) => <BulletItem key={item}>{item}</BulletItem>)}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── User Content ──────────────────────────────────── */}
          <FadeSection delay={225}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IV" title="User Content" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div>
                  <p className="text-xs text-[#4a4438] leading-relaxed">
                    You retain ownership. We receive a license to operate.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-sm text-[#6a6050] leading-loose">
                    Our Service allows you to post, link, store, share, and otherwise
                    make available certain information, text, graphics, videos, or other
                    material. You retain all rights to your Content, but grant us a
                    license to use it in connection with operating the Service.
                  </p>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">
                      By posting Content, you warrant that:
                    </p>
                    <ul className="space-y-1">
                      {[
                        "The Content is yours or you hold the right to use it",
                        "The Content does not violate any third-party rights",
                        "The Content is not illegal, harmful, or misleading",
                        "You will not impersonate any person or entity",
                      ].map((item) => <BulletItem key={item}>{item}</BulletItem>)}
                    </ul>
                  </div>

                  <p className="text-sm text-[#5a5448] leading-loose">
                    We reserve the right to remove any Content that violates these terms
                    without prior notice.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Prohibited Activities ─────────────────────────── */}
          <FadeSection delay={250}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="V" title="Prohibited Activities" />

              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-8">
                <div />
                <p className="text-sm text-[#6a6050] leading-loose">
                  You may not access or use the Service for any purpose other than
                  that for which we make it available. Commercial use requires explicit
                  prior endorsement from LAAMI LABS.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1a14]">
                {[
                  { num: "01", label: "Legal Violations", desc: "Violate any applicable laws or regulations" },
                  { num: "02", label: "IP Infringement", desc: "Infringe on intellectual property rights" },
                  { num: "03", label: "Harassment", desc: "Harass, abuse, or harm another person" },
                  { num: "04", label: "Impersonation", desc: "Impersonate any person or entity" },
                  { num: "05", label: "Interference", desc: "Disrupt or interfere with the Service" },
                  { num: "06", label: "Unauthorized Access", desc: "Attempt to breach our systems" },
                  { num: "07", label: "Data Harvesting", desc: "Collect personal information of others" },
                  { num: "08", label: "Malicious Content", desc: "Post spam, malware, or harmful content" },
                  { num: "09", label: "Illegal Use", desc: "Use the Service for any unlawful purpose" },
                ].map(({ num, label, desc }) => (
                  <div
                    key={label}
                    className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors duration-300"
                  >
                    <div className="text-xs text-[#3a3428] mb-4 font-bold">{num}</div>
                    <div
                      className="text-base font-bold text-[#d4c9b0] group-hover:text-[#f5f0e8] mb-2 transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {label}
                    </div>
                    <div className="text-xs text-[#4a4438] group-hover:text-[#6a6050] transition-colors">
                      {desc}
                    </div>
                    <div className="mt-6 h-px w-0 group-hover:w-full bg-[#c8a96e]/20 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </FadeSection>

          {/* ── Intellectual Property ─────────────────────────── */}
          <FadeSection delay={275}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VI" title="Intellectual Property" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="space-y-5">
                  <p className="text-sm text-[#6a6050] leading-loose">
                    The Service and its original content, features, and functionality
                    are and will remain the exclusive property of LAAMI LABS and its
                    licensors. Our trademarks and trade dress may not be used in
                    connection with any product or service without our prior written
                    consent.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["LAAMI LABS", "LAAMI", "All logos & designs"].map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 border border-[#c8a96e]/20 text-[#c8a96e]/60 text-xs uppercase tracking-[0.15em]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Copyright Policy ──────────────────────────────── */}
          <FadeSection delay={300}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VII" title="Copyright Policy" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="space-y-4 text-sm text-[#6a6050] leading-loose">
                  <p>
                    We respect the intellectual property rights of others. It is our
                    policy to respond promptly to any claim that Content posted on the
                    Service infringes the copyright or other intellectual property
                    rights of any person.
                  </p>
                  <p>
                    If you are a copyright owner or authorized to act on behalf of one,
                    report alleged infringements to our Copyright Agent at{" "}
                    <a
                      href="mailto:inquiry@laamilabs.co.ke"
                      className="text-[#c8a96e] hover:text-[#d4b97e] transition-colors underline underline-offset-4 decoration-[#c8a96e]/30"
                    >
                      inquiry@laamilabs.co.ke
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Termination + Liability ────────────────────────── */}
          <FadeSection delay={325}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="VIII" title="Termination & Liability" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1a14]">
                {/* Termination */}
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Account</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">Termination</span>
                  </div>
                  <p className="text-sm text-[#5a5448] leading-relaxed mb-4">
                    We may terminate or suspend your account immediately, without prior
                    notice or liability, for any reason including breach of these Terms.
                  </p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    To terminate your account voluntarily, discontinue using the Service
                    or contact us to request deletion.
                  </p>
                </div>

                {/* Liability */}
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Damages</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428]">Limitation</span>
                  </div>
                  <p className="text-xs text-[#4a4438] leading-relaxed mb-4">
                    LAAMI LABS shall not be liable for any indirect, incidental, or
                    consequential damages arising from:
                  </p>
                  <ul className="space-y-1">
                    {[
                      "Your use or inability to use the Service",
                      "Third-party conduct or content on the Service",
                      "Unauthorized access to your transmissions",
                      "Content obtained from the Service",
                    ].map((item) => <BulletItem key={item}>{item}</BulletItem>)}
                  </ul>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Disclaimer ────────────────────────────────────── */}
          <FadeSection delay={350}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="IX" title="Disclaimer of Warranties" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                <div />
                <div className="p-6 border border-[#1e1a14] bg-[#0d0d0b]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]/50 mb-4">
                    As-Is Basis
                  </p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    The Service is provided on an{" "}
                    <span className="text-[#d4c9b0]">&quot;AS IS&quot;</span> and{" "}
                    <span className="text-[#d4c9b0]">&quot;AS AVAILABLE&quot;</span>{" "}
                    basis, without warranties of any kind — whether express or implied,
                    including but not limited to warranties of merchantability, fitness
                    for a particular purpose, or non-infringement.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Governing Law + Changes ───────────────────────── */}
          <FadeSection delay={375}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="X" title="Governing Law & Changes" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1a14]">
                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Jurisdiction</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                  </div>
                  <p className="text-sm text-[#5a5448] leading-relaxed mb-4">
                    These Terms shall be governed and construed in accordance with the
                    laws of{" "}
                    <span className="text-[#d4c9b0]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Kenya
                    </span>
                    , without regard to conflict of law provisions.
                  </p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    Our failure to enforce any provision will not be considered a
                    waiver. Invalid provisions will be severed; remaining terms
                    remain in full effect.
                  </p>
                </div>

                <div className="bg-[#0a0a08] p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40">Revisions</span>
                    <div className="h-px flex-1 bg-[#1e1a14]" />
                  </div>
                  <p className="text-sm text-[#5a5448] leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. If a
                    revision is material, we will try to provide at least{" "}
                    <span className="text-[#d4c9b0]">30 days&apos; notice</span>{" "}
                    prior to new terms taking effect.
                  </p>
                  <p className="text-sm text-[#5a5448] leading-relaxed">
                    Continued use of the Service after revisions become effective
                    constitutes acceptance of the revised terms.
                  </p>
                </div>
              </div>
            </section>
          </FadeSection>

          {/* ── Acknowledgement ───────────────────────────────── */}
          <FadeSection delay={400}>
            <section className="py-16 border-b border-[#1e1a14]">
              <div className="p-8 border border-[#c8a96e]/10 bg-[#0d0d0b]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]/40 mb-5">
                  Acknowledgement
                </p>
                <p
                  className="text-xl sm:text-2xl font-bold text-[#d4c9b0] leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  By using the Service, you acknowledge that you have read these
                  Terms of Service and agree to be bound by them.
                </p>
              </div>
            </section>
          </FadeSection>

          {/* ── Contact ───────────────────────────────────────── */}
          <FadeSection delay={425}>
            <section className="py-16 border-b border-[#1e1a14]">
              <SectionTitle roman="XI" title="Contact" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1e1a14]">
                <a
                  href="mailto:legal@laamilabs.co.ke"
                  className="group bg-[#0a0a08] hover:bg-[#0d0d0b] p-8 transition-colors"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#3a3428] mb-4">Legal Email</div>
                  <div
                    className="text-base font-bold text-[#d4c9b0] group-hover:text-[#c8a96e] transition-colors leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    legal@laamilabs.co.ke
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
          <FadeSection delay={475}>
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
                <Link href="/cookie-policy" className="text-[#3a3428] hover:text-[#c8a96e]/60 transition-colors">
                  Cookies
                </Link>
                <span className="text-[#c8a96e]/40">Terms</span>
              </div>
            </footer>
          </FadeSection>

        </div>
      </main>
    </>
  );
}