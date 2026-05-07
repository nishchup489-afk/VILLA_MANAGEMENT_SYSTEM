"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle, Plus, ClipboardList } from "lucide-react";

export default function BottomOptions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

      {/* Recent Orders */}
      <div className="p-5 rounded-xl bg-[#2a1a10] border border-[#3a2a1c]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#f5ead8]">
            Recent Orders
          </h3>

          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-sm text-[#c8a96e] hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="text-sm text-[#8a7560]">
          No recent orders yet.
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="p-5 rounded-xl bg-[#2a1a10] border border-[#3a2a1c]">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-red-400" size={18} />
          <h3 className="text-lg font-semibold text-[#f5ead8]">
            Low Stock Alerts
          </h3>
        </div>

        <div className="text-sm text-[#8a7560] mb-4">
          Everything looks stocked for now.
        </div>

        <Link
          href="/dashboard/inventory"
          className="inline-block px-4 py-2 text-sm bg-[#c8a96e] text-[#1a0e08] rounded-lg hover:bg-[#d4b87a] transition"
        >
          Manage Inventory
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="p-5 rounded-xl bg-[#2a1a10] border border-[#3a2a1c]">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="text-[#c8a96e]" size={18} />
          <h3 className="text-lg font-semibold text-[#f5ead8]">
            Quick Actions
          </h3>
        </div>

        <div className="flex flex-col gap-3">

          <Link
            href="/dashboard/orders/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#c8a96e] text-[#1a0e08] rounded-lg text-sm font-medium hover:bg-[#d4b87a] transition"
          >
            <Plus size={16} />
            Create New Order
          </Link>

          <Link
            href="/dashboard/menu"
            className="flex items-center gap-2 px-4 py-2 border border-[#3a2a1c] rounded-lg text-sm text-[#f5ead8] hover:bg-[#2f1d12] transition"
          >
            View Menu
          </Link>

        </div>
      </div>

    </div>
  );
}