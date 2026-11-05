import React, { useEffect, useState } from "react";
import HeroSection from "../components/hero/HeroSection";
import AboutSection from "../components/about/AboutSection";
import ServicesSection from "../components/services/ServicesSection";
import PortfolioSection from "../components/portfolio/PortfolioSection";
import StickyGallery from "../components/gallery/StickyGallery";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import JourneySection from "../components/journey/JourneySection";
import ContactSection from "../components/contact/ContactSection";
import Footer from "../components/shared/Footer";
import VideoModal from "../components/shared/VideoModal";

import { projects, categories, testimonials } from "../data/mockData";
import { Project, ContactFormState } from "../types";

const SectionGap: React.FC = () => (
  <div className="w-full h-16 sm:h-24 lg:h-32 bg-[#080B09] flex items-center justify-center pointer-events-none select-none">
    <div className="w-full max-w-7xl px-5 sm:px-8">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F1EDE3]/[0.07] to-transparent" />
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);
  const [contactPrefill, setContactPrefill] = useState<Partial<ContactFormState> | null>(null);

  useEffect(() => {
    document.title = "Adil Mubarak — Videographer & Photographer";
  }, []);

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectService = (category: string): void => {
    setContactPrefill({ project_type: category, message: `Enquiring about ${category}.` });
    scrollToSection("contact");
  };

  return (
    <main className="bg-[#080B09] text-[#F1EDE3]">
      <HeroSection
        onExploreClick={() => scrollToSection("work")}
        onBookClick={() => scrollToSection("contact")}
      />

      <SectionGap />

      <AboutSection />

      <SectionGap />

      <ServicesSection onSelectService={handleSelectService} />

      <SectionGap />

      <JourneySection />

      <SectionGap />

      <PortfolioSection
        projects={projects}
        categories={categories}
        onSelectProject={(project: Project) => setSelectedVideo(project)}
      />

      <SectionGap />

      <StickyGallery />

      <SectionGap />

      <TestimonialsSection testimonials={testimonials} />

      <SectionGap />

      <ContactSection prefill={contactPrefill} />

      <Footer />

      <VideoModal project={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
};

export default LandingPage;
