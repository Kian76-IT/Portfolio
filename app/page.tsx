import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tools from "@/components/sections/Tools";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Tools />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}