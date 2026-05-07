import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      {/* Total Revenue */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2a1a10] border border-[#3a2a1c] hover:border-[#c8a96e]/40 transition">
        <div className="p-3 rounded-lg bg-[#c8a96e]/10">
          <DollarSign className="text-[#c8a96e]" size={22} />
        </div>
        <div>
          <p className="text-xs text-[#8a7560] uppercase tracking-wider">
            Revenue
          </p>
          <h2 className="text-xl font-semibold text-[#f5ead8]">
            $1,240
          </h2>
        </div>
      </div>

      {/* Active Orders */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2a1a10] border border-[#3a2a1c] hover:border-[#c8a96e]/40 transition">
        <div className="p-3 rounded-lg bg-[#c8a96e]/10">
          <ShoppingCart className="text-[#c8a96e]" size={22} />
        </div>
        <div>
          <p className="text-xs text-[#8a7560] uppercase tracking-wider">
            Active Orders
          </p>
          <h2 className="text-xl font-semibold text-[#f5ead8]">
            24
          </h2>
        </div>
      </div>

      {/* Employee Attendance */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2a1a10] border border-[#3a2a1c] hover:border-[#c8a96e]/40 transition">
        <div className="p-3 rounded-lg bg-[#c8a96e]/10">
          <Users className="text-[#c8a96e]" size={22} />
        </div>
        <div>
          <p className="text-xs text-[#8a7560] uppercase tracking-wider">
            Staff Present
          </p>
          <h2 className="text-xl font-semibold text-[#f5ead8]">
            6 / 8
          </h2>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2a1a10] border border-[#3a2a1c] hover:border-red-400/40 transition">
        <div className="p-3 rounded-lg bg-red-400/10">
          <AlertTriangle className="text-red-400" size={22} />
        </div>
        <div>
          <p className="text-xs text-[#8a7560] uppercase tracking-wider">
            Low Stock
          </p>
          <h2 className="text-xl font-semibold text-red-300">
            3 items
          </h2>
        </div>
      </div>

    </div>
  );
}