"use client"

import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import Progress from "@/components/Progress";
import WorkContent from "@/components/WorkContent";
import { ScrollProvider } from "@/contexts/ScrollContext";
import { useRef } from "react";

export default function Work() {

  const mainRef = useRef(null);

  return (
    <ScrollProvider>
      <WorkContent />
    </ScrollProvider>
  );
}