import HomeContent from "@/components/HomeContent";
import { ScrollProvider } from "@/contexts/ScrollContext";

export default function Home() {
  return (
    <ScrollProvider>
      <HomeContent />
    </ScrollProvider>
  );
}