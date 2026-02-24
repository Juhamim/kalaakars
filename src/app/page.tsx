"use client";
import { PageLoader } from "@/components/ui/PageLoader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main style={{ background: "#FFF" }}>
      <PageLoader />
      <Navbar />

      <Hero />

      <Projects />

      <About />

      <Footer />
    </main>
  );
}
