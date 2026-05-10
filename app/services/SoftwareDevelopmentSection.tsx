"use client";

import {
    Code2,
    CheckCircle2,
    Smartphone,
    Globe,
    Clock,
    MessageSquare,
    ShieldCheck,
    Wrench,
    ArrowRight,
    Layers,
    Zap,
    Users,
    Sparkles,
    Rocket,
    Star,
    Clock3,
    RefreshCcw,
    AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const BLUE = "#004D97";
const CRIMSON = "#95184B";
const BLUE_LIGHT = "#E8F0F9";
const CRIMSON_LIGHT = "#F5E8EE";
const BLUE_DARK = "#003570";
const CRIMSON_DARK = "#6E1138";

export default function SoftwareDevelopmentSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F8FA] dark:bg-gray-950 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px]">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase mb-6"
                        style={{ backgroundColor: BLUE, color: "#fff" }}
                    >
                        <span>Service 01</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-5">
                        Software{" "}
                        <span style={{ color: BLUE }}>Development</span>
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mx-auto">
                        Custom websites, native applications, and enterprise platforms built to scale.
                    </p>
                </div>

                {/* ── WEB DEVELOPMENT ── */}
                <div className="mb-20">
                    {/* Section label */}
                    <div className="flex items-center gap-4 mb-10">
                        <div
                            className="flex items-center gap-3 px-5 py-3"
                            style={{ backgroundColor: BLUE }}
                        >
                            <Globe className="w-5 h-5 text-white" />
                            <h3 className="text-base font-bold text-white tracking-wide uppercase">Web Development</h3>
                        </div>
                        <div className="hidden lg:block h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Card 1 — Static Sites */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#004D97] transition-colors duration-300">
                            {/* Card header */}
                            <div className="px-7 py-5 border-b-4" style={{ borderBottomColor: BLUE }}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Static &amp; Business Websites</h4>
                                        <p className="text-gray-400 text-sm mt-1">Ideal for startups, portfolios &amp; local businesses</p>
                                    </div>
                                    <Code2 className="w-5 h-5 mt-1 shrink-0" style={{ color: BLUE }} />
                                </div>
                            </div>

                            <div className="p-7">
                                {/* Pricing rows */}
                                <div className="mb-8 space-y-3">
                                    {[
                                        { name: "Landing Page (1-page)", price: "KES 10,000", badge: null },
                                        { name: "Multipage Website (up to 6 pages)", price: "KES 20,000", badge: "Popular" },
                                    ].map(({ name, price, badge }) => (
                                        <div key={name} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{name}</span>
                                                {badge && (
                                                    <span
                                                        className="text-xs font-bold px-2 py-0.5 tracking-wide"
                                                        style={{ backgroundColor: BLUE_LIGHT, color: BLUE }}
                                                    >
                                                        {badge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-black text-base" style={{ color: BLUE }}>{price}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What's included</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm mb-7">
                                    {[
                                        "Mobile responsive design",
                                        "Basic SEO setup",
                                        "Contact form integration",
                                        "Deployment support",
                                        "Custom domain setup",
                                        "Cross-browser testing",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: BLUE }} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-l-4 bg-[#E8F0F9] dark:bg-[#003570]/20" style={{ borderLeftColor: BLUE }}>
                                    <span className="font-bold text-sm" style={{ color: BLUE }}>Best for: </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Small businesses, personal brands, event pages, or portfolios.</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 — Dynamic */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#95184B] transition-colors duration-300">
                            <div className="px-7 py-5 border-b-4" style={{ borderBottomColor: CRIMSON }}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Dynamic &amp; Fullstack Solutions</h4>
                                        <p className="text-gray-400 text-sm mt-1">Built for growing teams that need content control</p>
                                    </div>
                                    <Zap className="w-5 h-5 mt-1 shrink-0" style={{ color: CRIMSON }} />
                                </div>
                            </div>

                            <div className="p-7">
                                <div className="mb-8 space-y-3">
                                    {[
                                        { name: "Simple CMS Website", price: "KES 25,000", badge: null },
                                        { name: "Advanced CMS Website", price: "KES 35,000", badge: "Most Popular" },
                                    ].map(({ name, price, badge }) => (
                                        <div key={name} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{name}</span>
                                                {badge && (
                                                    <span
                                                        className="text-xs font-bold px-2 py-0.5 tracking-wide"
                                                        style={{ backgroundColor: CRIMSON_LIGHT, color: CRIMSON }}
                                                    >
                                                        {badge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-black text-base" style={{ color: CRIMSON }}>{price}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What's included</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm mb-7">
                                    {[
                                        "Mobile responsive design",
                                        "Admin dashboard",
                                        "Third-party API integrations",
                                        "Deployment support",
                                        "User authentication",
                                        "Content management system",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-2.5 text-gray-600 dark:text-gray-400">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: CRIMSON }} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-l-4 bg-[#F5E8EE] dark:bg-[#6E1138]/20" style={{ borderLeftColor: CRIMSON }}>
                                    <span className="font-bold text-sm" style={{ color: CRIMSON }}>Best for: </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Blogs, news portals, NGOs, e-commerce, or businesses needing regular content updates.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── APPLICATION DEVELOPMENT ── */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <div
                            className="flex items-center gap-3 px-5 py-3"
                            style={{ backgroundColor: CRIMSON }}
                        >
                            <Smartphone className="w-5 h-5 text-white" />
                            <h3 className="text-base font-bold text-white tracking-wide uppercase">Mobile &amp; Desktop Applications</h3>
                        </div>
                        <div className="hidden lg:block h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card — Client-Based */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#004D97] transition-colors duration-300 p-7">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-11 h-11 flex items-center justify-center"
                                    style={{ backgroundColor: BLUE_LIGHT }}
                                >
                                    <Layers className="w-5 h-5" style={{ color: BLUE }} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Client-Based Applications</h4>
                                    <p className="text-xs text-gray-400">Standalone desktop &amp; offline-capable apps</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-4 mb-6 border-y border-gray-100 dark:border-gray-800">
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Basic Applications</span>
                                <span className="font-black text-2xl" style={{ color: BLUE }}>KES 20,000</span>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "Mobile or Desktop apps",
                                    "Local data storage",
                                    "Installable package delivery",
                                    "Offline functionality",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div
                                            className="w-5 h-5 flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: BLUE_LIGHT }}
                                        >
                                            <CheckCircle2 className="w-3 h-3" style={{ color: BLUE }} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card — Fullstack */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#95184B] transition-colors duration-300 p-7">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-11 h-11 flex items-center justify-center"
                                    style={{ backgroundColor: CRIMSON_LIGHT }}
                                >
                                    <Zap className="w-5 h-5" style={{ color: CRIMSON }} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Fullstack Applications</h4>
                                    <p className="text-xs text-gray-400">Cloud-connected, multi-user systems</p>
                                </div>
                            </div>

                            <div className="space-y-3 py-4 mb-6 border-y border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">Simple System</span>
                                    <span className="font-black text-lg" style={{ color: BLUE }}>KES 30,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">Complex Systems</span>
                                    <span className="font-black text-xl" style={{ color: CRIMSON }}>KES 35,000+</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "Role-based access control",
                                    "Real-time data sync",
                                    "REST or GraphQL APIs",
                                    "Scalable cloud infrastructure",
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <div
                                            className="w-5 h-5 flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: CRIMSON_LIGHT }}
                                        >
                                            <CheckCircle2 className="w-3 h-3" style={{ color: CRIMSON }} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── FAQ ── */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-10">
                        <div
                            className="flex items-center gap-3 px-5 py-3"
                            style={{ backgroundColor: "#1A1A2E" }}
                        >
                            <MessageSquare className="w-5 h-5 text-white" />
                            <h3 className="text-base font-bold text-white tracking-wide uppercase">Good to Know</h3>
                        </div>
                        <div className="hidden lg:block h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            [
                                {
                                    q: "How do I know which package is right for my business?",
                                    a: "We recommend solutions based on your goals, budget, and future growth plans. Simple informational websites work well for startups and local businesses, while CMS and fullstack systems are better for businesses that require user management, regular content updates, or integrations.",
                                    icon: Sparkles,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                    span: "sm:col-span-2",
                                },
                                {
                                    q: "Do you require a deposit before work begins?",
                                    a: "Yes. A 25% deposit is required before development begins, with the remaining balance due upon project completion and before deployment.",
                                    icon: ShieldCheck,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                                {
                                    q: "How long does a typical project take?",
                                    a: "Landing pages and simple business websites typically take 1–2 weeks, while CMS platforms, applications, and custom systems may take 3–8 weeks depending on complexity and feedback timelines.",
                                    icon: Clock,
                                    color: CRIMSON,
                                    bg: CRIMSON_LIGHT,
                                },
                                {
                                    q: "Will my website work on mobile devices?",
                                    a: "Absolutely. Every website and application we build is fully responsive and optimized for phones, tablets, and desktops.",
                                    icon: Smartphone,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                                {
                                    q: "Can you redesign or improve an existing website?",
                                    a: "Yes. We can modernize outdated websites, improve performance, redesign interfaces, add new features, or migrate your site to a better technology stack.",
                                    icon: RefreshCcw,
                                    color: CRIMSON,
                                    bg: CRIMSON_LIGHT,
                                },
                                {
                                    q: "Do you provide hosting and domain registration?",
                                    a: "Hosting and domains are billed separately, but we assist with setup, deployment, email configuration, SSL security, and selecting the best hosting provider for your needs.",
                                    icon: Globe,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                                {
                                    q: "Will I be able to manage content myself?",
                                    a: "Yes. CMS and dynamic systems include admin dashboards that allow you to update content, manage users, publish posts, or maintain services without technical skills.",
                                    icon: Users,
                                    color: CRIMSON,
                                    bg: CRIMSON_LIGHT,
                                    span: "lg:col-span-2",
                                },
                                {
                                    q: "Do you build custom systems and APIs?",
                                    a: "Yes. We develop custom business systems, REST/GraphQL APIs, dashboards, automation tools, and scalable cloud-connected applications tailored to operational needs.",
                                    icon: Zap,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                                {
                                    q: "What technologies do you use?",
                                    a: "We use modern technologies including Next.js, React, Node.js, TypeScript, PostgreSQL, Firebase, and cloud platforms such as AWS and Vercel depending on project requirements.",
                                    icon: Code2,
                                    color: CRIMSON,
                                    bg: CRIMSON_LIGHT,
                                },
                                {
                                    q: "Do you offer maintenance and support after launch?",
                                    a: "Yes. We provide ongoing maintenance, feature updates, bug fixes, monitoring, backups, and technical support packages after deployment.",
                                    icon: Wrench,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                                {
                                    q: "What happens if I request additional features later?",
                                    a: "Your project can grow over time. Additional features, integrations, or major scope changes can be added through a separate quotation or phased upgrade plan.",
                                    icon: Layers,
                                    color: CRIMSON,
                                    bg: CRIMSON_LIGHT,
                                    span: "sm:col-span-2",
                                },
                                {
                                    q: "Who owns the final product after payment?",
                                    a: "Once the project is fully paid for, you retain ownership of your website, application, branding assets, and content. We only retain reusable internal frameworks and development methodologies.",
                                    icon: Rocket,
                                    color: BLUE,
                                    bg: BLUE_LIGHT,
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.q}
                                        className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 ${item.span || ""}`}
                                    >
                                        <div className="flex items-start gap-4 mb-3">
                                            <div
                                                className="w-9 h-9 flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: item.bg }}
                                            >
                                                <Icon className="w-4.5 h-4.5" style={{ color: item.color }} />
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug pt-1">
                                                {item.q}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pl-[52px]">
                                            {item.a}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* ── CTA ── */}
                <div className="text-center">
                    <Link
                        href="#contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-sm tracking-wide uppercase transition-opacity duration-200 hover:opacity-90"
                        style={{ backgroundColor: BLUE }}
                    >
                        <span>Book a Free Consultation</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-xs text-gray-400 mt-4 tracking-wide">
                        30-minute free consultation &nbsp;·&nbsp; No obligation
                    </p>
                </div>
            </div>
        </section>
    );
}