"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/dashboard/orders" },
    { name: "Menu", href: "/dashboard/menu" },
    { name: "Prep Tasks", href: "/dashboard/tasks" },
    { name: "Inventory", href: "/dashboard/inventory" },
    { name: "Waste Log", href: "/dashboard/waste" },
    { name: "Attendance", href: "/dashboard/attendance" },
  ];

  return (
    <div className="flex min-h-screen bg-[#1a0e08] text-[#f5ead8]">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#3a2a1c] p-4 space-y-2">
        <h1 className="text-xl font-serif mb-6 text-[#c8a96e]">
          Villa Russo
        </h1>

        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                  isActive
                    ? "bg-[#c8a96e] text-[#1a0e08]"
                    : "hover:bg-[#2a1a10]"
                }`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}