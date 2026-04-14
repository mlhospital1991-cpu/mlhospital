import Hero from "@/components/Hero";
import Doctors from "@/components/Doctors";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Doctors />
      <Services />
    </main>
  );
}
