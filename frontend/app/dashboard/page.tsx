import Link from "next/link";
import HeroSection from "../componants/hero";
import BottomOptions from "../componants/bottomoptions";



export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="header flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#f5ead8] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-[#8a7560] mt-1 font-light">
            Welcome back. Here's what happening today.
          </p>
        </div>

        <button className="px-4 py-2 bg-[#c8a96e] text-[#1a0e08] rounded-lg text-sm font-medium hover:bg-[#d4b87a] transition">
          + New Order
        </button>
      </div>
      <div className="hero">
        <HeroSection />
      </div>
      <div className="footer">
        <BottomOptions />
      </div>
    </div>
  );
}
