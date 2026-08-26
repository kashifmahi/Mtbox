import { useEffect, useRef } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { ScrollLines } from "@/components/site/ScrollLines";
import { Hero } from "@/components/site/Hero";
import { EditorialMarquee } from "@/components/site/EditorialMarquee";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { WhyMbtex } from "@/components/site/WhyMbtex";
import { Platforms } from "@/components/site/Platforms";
import { Approach } from "@/components/site/Approach";
import { ValuesManifesto } from "@/components/site/ValuesManifesto";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const navigate = (href) => {
    const el = document.querySelector(href);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: href === "#hero" ? 0 : -60, duration: 1.6 });
    }
  };

  return (
    <div className="bg-[#071A33] min-h-screen">
      <div className="grain-overlay" />
      <ScrollLines />
      <Toaster position="top-right" richColors theme="dark" />
      <Navbar onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <EditorialMarquee />
        <WhoWeAre />
        <WhyMbtex />
        <Platforms />
        <Approach />
        <ValuesManifesto />
        <Contact />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
