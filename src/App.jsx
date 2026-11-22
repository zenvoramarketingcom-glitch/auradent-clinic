import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TransformationSection from './components/TransformationSection';
import TechnologySection from './components/TechnologySection';
import DoctorsSection from './components/DoctorsSection';
import BookingSection from './components/BookingSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const handleBookClick = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
  };

  if (isAdminView) {
    return (
      <AdminPanel onExit={() => setIsAdminView(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <Navbar
        onNavigateToAdmin={() => setIsAdminView(true)}
        onBookClick={handleBookClick}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero with 3D Anatomy Scanner Canvas */}
        <HeroSection onBookClick={handleBookClick} />

        {/* Complete Dental Services Catalog */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Interactive Before & After Transformation Slider */}
        <TransformationSection />

        {/* High-Tech Painless Laser & Scanner Suite */}
        <TechnologySection />

        {/* Specialist Doctors & Surgeons */}
        <DoctorsSection onBookWithDoctor={(doc) => {}} />

        {/* Interactive Booking Form + Side-by-Side Live Google Maps Embed */}
        <BookingSection preselectedService={preselectedService} />

        {/* Verified Patient Reviews & Google Trust Badge */}
        <ReviewsSection />

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Footer with Small Social Media Links & Exact Contact Details */}
      <Footer onOpenAdmin={() => setIsAdminView(true)} />

      {/* Floating WhatsApp, Emergency Call & Admin Switcher Widgets */}
      <FloatingWidgets
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
        isAdminOpen={isAdminView}
      />
    </div>
  );
}
