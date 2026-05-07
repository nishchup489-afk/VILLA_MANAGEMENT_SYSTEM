"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderDashboard() {
  const [activeTab, setActiveTab] = useState("active");

  const statuses = [
    { label: "Active", count: 0, key: "active" },
    { label: "Pending", count: 0, key: "pending" },
    { label: "Preparing", count: 0, key: "preparing" },
    { label: "Ready", count: 0, key: "ready" },
    { label: "Completed", count: 4, key: "completed" },
    { label: "Cancelled", count: 3, key: "cancelled" },
  ];

  const router = useRouter()

  return (
    <div className="p-6 text-[#f5edd6]">

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <h2 className="text-sm text-[#d4a847]/70">
          All your orders are here
        </h2>
      </header>

      {/* SUBHEADER */}
      <div className="subheader flex gap-4 mb-6 ">
        <button className="bg-[#d4a847] text-black px-4 py-2 rounded-lg hover:opacity-90" onClick={() => router.push("/dashboard/orders/new")}>
          + New Order
        </button>

        <button className="bg-[#1a1008] px-4 py-2 rounded-lg hover:bg-[#2a1a10]" onClick={() => router.push("/dashboard/orders/history")}>
          History
        </button>
      </div>

      {/* MAIN */}
      <main className="bg-[#1a1008] p-6 rounded-xl border border-[#2a1a10]">

        {/* STATUS TABS */}
        <div className="tabs flex gap-2 flex-wrap mb-6">
          {statuses.map((status) => (
            <button
              key={status.key}
              onClick={() => setActiveTab(status.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition
                ${
                  activeTab === status.key
                    ? "bg-[#c4522a] text-white"
                    : "bg-[#2a1a10] text-[#f5edd6]/70 hover:bg-[#3a2418]"
                }
              `}
            >
              {status.label}
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs">
                {status.count}
              </span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-[#2a1a10] p-4 rounded-lg">
          <p>
            Showing{" "}
            <span className="capitalize font-medium">{activeTab}</span> orders
          </p>

          <p className="text-sm text-[#f5edd6]/60 mt-2">
            (Filtered orders will show here later)
          </p>
        </div>

      </main>
    </div>
  );
}