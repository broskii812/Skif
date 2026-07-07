"use client";

import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Catalog } from "@/components/sections/Catalog";
import { Contacts } from "@/components/sections/Contacts";
import { Hero } from "@/components/sections/Hero";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>();

  const handleRequestProduct = useCallback((productName: string) => {
    setSelectedProduct(productName);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog onRequestProduct={handleRequestProduct} />
        <LeadForm preselectedProduct={selectedProduct} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
