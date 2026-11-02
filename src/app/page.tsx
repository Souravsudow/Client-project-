import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ValuesSection from "@/components/ValuesSection";
import ServicesSection from "@/components/ServicesSection";
import SectorsSection from "@/components/SectorsSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import SectionDivider from "@/components/SectionDivider";
import {
  company,
  faqs,
  licenseActivities,
  services,
  siteUrl,
} from "@/lib/site";

/* ─── Structured Data (JSON-LD) ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${siteUrl}/#business`,
      name: company.name,
      alternateName: company.shortName,
      slogan: company.tagline,
      description: company.description,
      url: siteUrl,
      telephone: company.phone,
      email: company.email,
      image: `${siteUrl}/imnaz-assets/company-profile.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: company.areaServed.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      knowsAbout: licenseActivities,
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          areaServed: "United Arab Emirates",
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="site-shell">
        {/* Hero — cinematic 506-frame scroll sequence (untouched) */}
        <HeroSection />

        {/* Hero → Content Bridge */}
        <div className="hero-bridge">
          <div className="hero-bridge-badge">
            <div className="badge-monogram">IM</div>
            <span>Est. Dubai, UAE</span>
          </div>
        </div>

        {/* Main Content — Each section has a unique layout */}
        <main>
          <AboutSection />
          <ValuesSection />
          <ServicesSection />
          <SectionDivider
            image="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1600&h=600&fit=crop&q=80"
            stats={[
              { number: String(company.activities.length), label: "Licensed Activities" },
              { number: "3", label: "Core Expertise Areas" },
              { number: "100%", label: "Client Satisfaction Focus" },
            ]}
          />
          <SectorsSection />
          <BeforeAfterSection />
          <ProcessSection />
          <TrustSection />
          <SectionDivider
            image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&h=600&fit=crop&q=80"
            stats={[
              { number: "0", label: "Compromise on Quality" },
              { number: "5", label: "Core Values" },
              { number: "UAE", label: "Service Coverage" },
            ]}
          />
          <FAQSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
