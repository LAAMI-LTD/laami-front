"use client";

import HeaderSection from "./HeaderSection";
import ServicesSection from "./ServicesSection";
// import ProjectsSection from "./ProjectsSection";
import ProjectsSection from "./projects/ProjectsSection";

export default function SoftwareContent() {
  return (
    <div className="space-y-16">
      <HeaderSection />
      <ServicesSection />
      <ProjectsSection/>
    </div>
  );
}