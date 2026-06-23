import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Marquee } from "./components/ui/Marquee";
import { marquee } from "./data/content";

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee items={marquee} />
        <Services />
        <Work />
        <About />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
