import Header from "./components/Header";
import BgImg from "./img/MainBg2.png";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeatureSection";

export default function HomePage() {
  return (
    <div
      className="min-h-[800px] bg-[url('./img/Frame.png')]"
      //   style={{
      //     backgroundImage:
      //     //   "linear-gradient(to bottom, #fed842 0%, #fefce8 60%, #ffffff 80%)",
      //   }}
    >
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
