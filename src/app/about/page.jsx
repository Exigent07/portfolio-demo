"use client"

import AboutContent from "@/components/AboutContent";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function About() {
  return (
    <ScrollProvider>
      <AboutContent />
    </ScrollProvider>
  );
}