import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import HowItWorksSection from '../components/home/HowItWorksSection';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <AboutSection />
        <HowItWorksSection />
      </div>
    </>
  );
}