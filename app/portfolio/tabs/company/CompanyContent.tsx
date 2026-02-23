// components/tab-content/CompanyContent.tsx
"use client";

import Services from "./services";
import BusinessStructures from "./BusinessStructures";
import ProcessTimeline from "./ProcessTimeline";
import GovernmentAgencies from "./GovernmentAgencies";
import CTA from "./cta";
import Heading from "./Heading";

export default function CompanyContent() {
  const services = [
    {
      title: "Turn Your Idea into a Legal Business",
      description:
        "We handle everything from Limited Companies to Sole Proprietorships so you can focus on what matters - building your dream.",
      time: "3-7 Days",
    },
    {
      title: "Protect Your Business Name",
      description:
        "Secure the perfect name for your venture. We'll search, reserve and register it officially so no one else can use it.",
      time: "1-2 Days",
    },
    {
      title: "Stay Tax Compliant from Day One",
      description:
        "We'll handle all KRA requirements - PIN registration, tax setup, VAT if needed - so you never worry about penalties.",
      time: "1-2 Days",
    },
    {
      title: "Open for Business Legally",
      description:
        "Get your Single Business Permit and all county approvals so you can operate smoothly without legal hurdles.",
      time: "2-5 Days",
    },
  ];

  const businessStructures = [
    {
      name: "Limited Company",
      tagline: "For serious growth and protection",
      benefits: [
        "Your personal assets are protected",
        "Attract investors more easily",
        "Looks professional to clients",
        "Built for scaling up",
      ],
      description:
        "A Limited Company is a separate legal entity, ideal for businesses planning to scale or attract investors. Shareholders’ liability is limited to their investment.",
      requirements: [
        "At least one director",
        "Registered company name",
        "Company PIN and KRA registration",
        "Articles of Association"
      ],
    },
    {
      name: "Partnership",
      tagline: "When you're building together",
      benefits: [
        "Share the load with partners",
        "Combine different skills",
        "Pool resources together",
        "Quick and simple to start",
      ],
      description:
        "A Partnership allows two or more people to run a business together. Partners share profits, losses, and management responsibilities.",
      requirements: [
        "Minimum of 2 partners",
        "Partnership agreement",
        "Business name registration",
      ],
    },
    {
      name: "Sole Proprietorship",
      tagline: "Start simple, stay in control",
      benefits: [
        "You're the boss - full control",
        "Simple and affordable",
        "All profits come to you",
        "Less paperwork to manage",
      ],
      description:
        "A Sole Proprietorship is the simplest business structure. It is fully owned and managed by one person and is ideal for small businesses or freelancers.",
      requirements: [
        "Single owner",
        "Business name registration",
        "KRA PIN registration",
      ],
    },
  ];

  const registrationSteps = [
    {
      step: "Understanding Your Vision",
      desc: "We sit down together to understand your business dream and help choose the perfect structure that fits your goals.",
      days: "Same day",
    },
    {
      step: "Reserving Your Perfect Business Name",
      desc: "We search and secure your chosen name through official channels so it's yours and only yours.",
      days: "1 Day",
    },
    {
      step: "Official Registration - Making It Real",
      desc: "We handle all paperwork and get your official Certificate of Registration or Incorporation.",
      days: "1–3 Days",
    },
    {
      step: "Documenting Your Ownership",
      desc: "We obtain all official records that prove you own and run the business.",
      days: "1–2 Days",
    },
    {
      step: "Tax Setup Done Right",
      desc: "We register you with KRA and set up all tax requirements so you're compliant from the start.",
      days: "1 Day",
    },
    {
      step: "Employer Setup (If You'll Have Staff)",
      desc: "We register you as an employer with NSSF and NHIF so you can hire employees legally.",
      days: "1 Day",
    },
    {
      step: "Local Business Permit",
      desc: "We get your Single Business Permit from the county government so you can operate in your location.",
      days: "1–3 Days",
    },
    {
      step: "Industry-Specific Approvals",
      desc: "We handle any special licenses needed for your specific industry (health, education, hospitality, etc.).",
      days: "3–10 Days",
    },
    {
      step: "Creating Your Brand Look",
      desc: "We design your logo and visual identity so your business looks professional and memorable.",
      days: "3–7 Days",
    },
    {
      step: "Building Your Online Home",
      desc: "We set up your website, business email, and social profiles so customers can find you online.",
      days: "5–10 Days",
    },
    {
      step: "Professional Business Materials",
      desc: "We create letterheads, invoices, and marketing materials that make your business look established.",
      days: "2–4 Days",
    },
    {
      step: "Launch Support & Ongoing Guidance",
      desc: "We stay with you for compliance guidance and support as your business grows and evolves.",
      days: "Ongoing",
    },
  ];

  const governmentAgencies = [
    {
      name: "BRS",
      desc: "Business Registration Service",
      bg: "bg-[#004d98]/10 dark:bg-blue-900/30",
      text: "text-[#004d98] dark:text-blue-300",
      logo: "/portfolio/brs.webp"
    },
    {
      name: "KRA",
      desc: "Kenya Revenue Authority",
      bg: "bg-[#a50044]/10 dark:bg-pink-900/30",
      text: "text-[#a50044] dark:text-pink-300",
      logo: "/portfolio/kra.jpg"
    },
    {
      name: "NSSF",
      desc: "National Social Security Fund",
      bg: "bg-[#004d98]/10 dark:bg-blue-900/30",
      text: "text-[#004d98] dark:text-blue-300",
      logo: "/portfolio/nssf.webp"
    },
    {
      name: "County Gov",
      desc: "Your Local County",
      bg: "bg-[#a50044]/10 dark:bg-pink-900/30",
      text: "text-[#a50044] dark:text-pink-300",
      logo: "/portfolio/devolution.png"
    },
  ];

  return (
    <div className="space-y-16 dark:text-white pb-6">
      <Heading />
      <Services services={services} />
      <BusinessStructures businessStructures={businessStructures} />
      <ProcessTimeline registrationSteps={registrationSteps} />
      <GovernmentAgencies governmentAgencies={governmentAgencies} />
      <CTA />
    </div>
  );
}
