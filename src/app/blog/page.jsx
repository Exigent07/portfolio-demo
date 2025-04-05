"use client"

import BlogContent from "@/components/BlogContent";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function Blog() {
  return (
    <ScrollProvider>
      <BlogContent />
    </ScrollProvider>
  );
}