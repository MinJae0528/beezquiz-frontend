import Header from "../sections/Header.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import FeaturesSection from "../sections/FeatureSection.jsx";
import Footer from "../sections/Footer.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import TechSection from "../sections/TechSection.jsx";
import "../styles/App.css";

export default function HomePage() {
  return (
    <div className="min-h-[100vh] home-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
      </main>
      <TechSection />
      <Footer />
    </div>
  );
}
