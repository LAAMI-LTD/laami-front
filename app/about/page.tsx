import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lightbulb, Target, UsersRound } from "lucide-react";
import Footer from "../components/footer";

const SITE_URL = "https://laamilabs.co.ke";

export const metadata: Metadata = {
  title: "About Us | LAAMI LTD",
  description: "Meet the LAAMI LTD team and learn how we bring technology, design, and business growth together.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About Us | LAAMI LTD",
    description: "Meet the LAAMI LTD team and learn how we bring technology, design, and business growth together.",
    siteName: "LAAMI LTD",
    locale: "en_KE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "The LAAMI LTD team" }],
  },
};

const team = [
  { name: "Keter Titus", role: "Director", initials: "KT", accent: "from-[#004d98] to-[#285f99]" },
  { name: "Isaac Ferdinand", role: "Chief Developer", initials: "IF", accent: "from-[#a50044] to-[#c34270]" },
  { name: "Felix Ongeri", role: "Business Development", initials: "FO", accent: "from-[#203b54] to-[#41728c]" },
];

const principles = [
  {
    number: "01",
    title: "Start with people",
    description: "We listen first, understand the real need, and shape the work around the people it is meant to help.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Make it useful",
    description: "Every digital experience should be clear, considered, and practical to use in the real world.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Build for progress",
    description: "We bring creative thinking and technology together to help organisations move forward with confidence.",
    icon: Target,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-neutral-950 dark:bg-[#080b12] dark:text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-sm bg-[#a50044]/[0.07] blur-3xl dark:bg-[#a50044]/[0.13]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#004d98] dark:text-blue-300">
            <span className="h-px w-8 bg-[#a50044]" />About LAAMI LTD
          </p>
          <div className="grid gap-9 lg:grid-cols-[1fr_20rem] lg:items-end">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Good ideas deserve <span className="text-[#a50044]">good people.</span>
            </h1>
            <div className="border-l-2 border-[#a50044] pl-5">
              <p className="text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg">
                We are a team of builders and problem-solvers bringing technology, design, and business growth together.
              </p>
              <Link href="#our-team" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#004d98] transition-colors duration-150 hover:text-[#a50044] dark:text-blue-300 dark:hover:text-pink-300">
                Meet the team <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <div className="rounded-sm border border-neutral-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Our home</span>
              <p className="mt-2 text-lg font-semibold">Eldoret, Kenya</p>
            </div>
            <div className="rounded-sm border border-neutral-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Our focus</span>
              <p className="mt-2 text-lg font-semibold">Digital growth</p>
            </div>
            <div className="rounded-sm border border-neutral-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Part of</span>
              <p className="mt-2 text-lg font-semibold">LAAMI LTD</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a50044]">Who we are</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A partner for the work ahead.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg sm:leading-8">
            <p>LAAMI LABS is the digital solutions division of LAAMI LTD. We help businesses grow, scale, and compete with thoughtful technology, creative content, and performance-minded marketing.</p>
            <p>From the first conversation to the finished experience, we work closely with our clients to understand what matters, solve practical problems, and create work that supports long-term progress.</p>
            <Link href="/portfolio" className="group inline-flex items-center gap-2 pt-1 text-sm font-semibold text-neutral-950 dark:text-white">
              Explore our work <ArrowUpRight size={16} className="transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a50044]">How we work</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Thoughtful from the start.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="rounded-sm border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.14em] text-neutral-400">{number}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#004d98]/[0.07] text-[#004d98] dark:bg-blue-400/10 dark:text-blue-300"><Icon size={19} strokeWidth={1.7} /></span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="our-team" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a50044]">Our team</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Good work, together.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-400">A close-knit team bringing leadership, technical craft, and business perspective to every project.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {team.map((person, index) => (
              <article key={person.name} className="group overflow-hidden rounded-sm border border-neutral-200 bg-white dark:border-white/10 dark:bg-white/[0.035]">
                <div className={`relative flex h-52 items-end overflow-hidden bg-gradient-to-br ${person.accent} p-6 sm:h-60`}>
                  <span aria-hidden="true" className="absolute -right-5 -top-10 text-[10rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.11] transition-transform duration-200 ease-out group-hover:-translate-y-1">{person.initials}</span>
                  <span className="absolute left-6 top-6 rounded-sm border border-white/25 bg-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">0{index + 1}</span>
                  <div className="relative grid h-16 w-16 place-items-center rounded-sm border border-white/35 bg-white/15 text-xl font-semibold tracking-wide text-white backdrop-blur-sm">{person.initials}</div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold tracking-tight">{person.name}</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-sm bg-[#101722] px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Let&apos;s build something meaningful</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Have a good idea? Let&apos;s talk.</h2>
          </div>
          <Link href="/contacts" className="inline-flex w-fit items-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors duration-150 hover:bg-[#f2d8e2] active:scale-[0.97]">
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
