import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import HowItWorksSection from '../components/home/HowItWorksSection';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl space-y-20 px-4 pb-16 pt-10">
        <AboutSection />
        <HowItWorksSection />
      </div>
    </>
  );
}