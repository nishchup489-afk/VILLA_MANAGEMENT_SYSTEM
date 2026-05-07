"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/app/lib/api";
import {
  Coffee,
  Pizza,
  Cake,
  Salad,
  Soup,
  Croissant,
  Utensils,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Info,
  CheckCircle2,
  X,
  ReceiptText,
  Printer,
} from "lucide-react";

/* ================= TYPES ================= */

type MenuItem = {
  id: string;
  item_name: string;
  item_price: string;
  item_category: string;
  item_details?: string[];
  item_weight?: number;
  extra_data?: any;
};

type OrderItem = {
  id: string;
  item_name: string;
  item_price: number;
  item_category: string;
  quantity: number;
};

type OrderResponse = {
  id?: string;
  daily_order_number?: number;
  daily_order_sequence?: number;
  order_type: string;
  totals: number;
  receipt_number: string;
};

type Customer = {
  customer_name: string;
  cashier_name: string;
};

/* ================= HELPERS ================= */

const getCategoryIcon = (category: string) => {
  const cat = category.toUpperCase();
  if (
    cat.includes("DRINK") ||
    cat.includes("COFFEE") ||
    cat.includes("BEVERAGE")
  )
    return <Coffee className="w-5 h-5" />;
  if (cat.includes("PIZZA")) return <Pizza className="w-5 h-5" />;
  if (cat.includes("DESSERT") || cat.includes("CAKE") || cat.includes("SWEET"))
    return <Cake className="w-5 h-5" />;
  if (cat.includes("SALAD") || cat.includes("VEG"))
    return <Salad className="w-5 h-5" />;
  if (cat.includes("SOUP")) return <Soup className="w-5 h-5" />;
  if (cat.includes("BAKERY") || cat.includes("BREAD") || cat.includes("PASTRY"))
    return <Croissant className="w-5 h-5" />;
  return <Utensils className="w-5 h-5" />;
};

/* ================= COMPONENT ================= */

export default function NewOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [snapshotOrder, setSnapshotOrder] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const [customerInfo, setCustomerInfo] = useState<Customer>({
    customer_name: "",
    cashier_name: "",
  });

  const [latestOrder, setLatestOrder] = useState<OrderResponse | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [menuLoading, setMenuLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [orderType, setOrderType] = useState<
    "DINE_IN" | "TAKE_AWAY" | "DELIVERY"
  >("DINE_IN");

  /* ---- Data fetching ---- */

  async function fetchMenuItems() {
    try {
      setMenuLoading(true);
      setError("");
      const res = await api.get<MenuItem[]>("/menu/");
      setMenuItems(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load menu items.");
    } finally {
      setMenuLoading(false);
    }
  }

  useEffect(() => {
    fetchMenuItems();
  }, []);

  /* ---- Derived state ---- */

  const categories = useMemo(() => {
    const unique = menuItems.map((item) => item.item_category);
    return ["ALL", ...Array.from(new Set(unique))];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return menuItems;
    return menuItems.filter((item) => item.item_category === activeCategory);
  }, [menuItems, activeCategory]);

  /* ---- Cart helpers ---- */

  function addToOrder(item: MenuItem | OrderItem) {
    setCurrentOrder((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          item_name: item.item_name,
          item_price: Number(item.item_price),
          item_category: item.item_category,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromOrder(itemId: string) {
    setCurrentOrder((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function deleteFromOrder(itemId: string) {
    setCurrentOrder((prev) => prev.filter((item) => item.id !== itemId));
  }

  /* ---- Totals ---- */

  const subtotal = currentOrder.reduce(
    (total, item) => total + item.item_price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  /* ---- Receipt totals (from snapshot) ---- */

  const receiptSubtotal = snapshotOrder.reduce(
    (total, item) => total + item.item_price * item.quantity,
    0,
  );
  const receiptTax = receiptSubtotal * 0.08;
  const receiptItemCount = snapshotOrder.reduce((a, i) => a + i.quantity, 0);

  /* ---- Place order ---- */

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (currentOrder.length === 0) {
      setError("Add at least one item before placing an order.");
      return;
    }

    if (!customerInfo.cashier_name.trim()) {
      setError("Cashier initials are required.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const payload = {
        customer: {
          customer_name:
            customerInfo.customer_name.trim() || `Guest-${Date.now()}`,
          cashier_name: customerInfo.cashier_name.trim(),
        },
        order_type: orderType,
        items: currentOrder.map((item) => ({
          item_name: item.item_name,
          item_price: item.item_price,
          quantity: item.quantity,
        })),
      };

      const res = await api.post<OrderResponse>("/orders/", payload);

      // ✅ Snapshot BEFORE clearing the cart
      setSnapshotOrder([...currentOrder]);
      setLatestOrder(res.data);
      setShowConfirmation(true);
      setCurrentOrder([]);
    } catch (err) {
      console.error(err);
      setError("There was a problem placing the order.");
    } finally {
      setPlacingOrder(false);
    }
  }

  /* ---- Print handler ---- */

  function handlePrint() {
    window.print();
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 text-zinc-100 font-sans">
      {/* ---- Print styles ---- */}
      <style>{`
@media print {

  body * {
    visibility: hidden !important;
  }

  .print-receipt,
  .print-receipt * {
    visibility: visible !important;
  }

  .print-receipt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background: white;
    color: black;
    display: flex !important;
    justify-content: center;
  }

}
`}</style>

      {/* ======== CONFIRMATION MODAL ======== */}
      {showConfirmation && latestOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          {/* Hidden print-only receipt */}
          <div className="print-receipt">
            <div style={{ fontFamily: "monospace", width: 320, padding: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <p style={{ fontWeight: 700, fontSize: 18 }}>
                  Villa Russo Café
                </p>
                <p style={{ fontSize: 12, color: "#555" }}>
                  Receipt #{latestOrder.receipt_number}
                </p>
                <p style={{ fontSize: 12, color: "#555" }}>
                  {new Date().toLocaleString()}
                </p>
              </div>
              <hr style={{ margin: "8px 0" }} />
              {snapshotOrder.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    margin: "4px 0",
                  }}
                >
                  <span>
                    {item.quantity}x {item.item_name}
                  </span>
                  <span>${(item.item_price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr style={{ margin: "8px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                }}
              >
                <span>Subtotal</span>
                <span>${receiptSubtotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                }}
              >
                <span>Tax (8%)</span>
                <span>${receiptTax.toFixed(2)}</span>
              </div>
              <hr style={{ margin: "8px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                <span>TOTAL</span>
                <span>
                  ${parseFloat(String(latestOrder.totals || 0)).toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  fontSize: 12,
                  color: "#555",
                }}
              >
                <p>
                  Order type: {latestOrder.order_type?.replaceAll("_", " ")}
                </p>
                {customerInfo.customer_name && (
                  <p>Customer: {customerInfo.customer_name}</p>
                )}
                <p style={{ marginTop: 8 }}>Thank you for your visit!</p>
              </div>
            </div>
          </div>

          {/* Modal card */}
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 text-green-400 p-2 rounded-xl">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Order Confirmed
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Receipt #{latestOrder.receipt_number}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {/* Meta info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-3">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                    Order Type
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {latestOrder.order_type?.replaceAll("_", " ")}
                  </p>
                </div>
                <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-3">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                    Items
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {receiptItemCount} item{receiptItemCount !== 1 ? "s" : ""}
                  </p>
                </div>
                {customerInfo.customer_name && (
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-3 col-span-2">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      Customer
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {customerInfo.customer_name}
                    </p>
                  </div>
                )}
              </div>

              {/* Itemized list */}
              <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-zinc-800 flex justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Item
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Amount
                  </span>
                </div>
                <div className="divide-y divide-zinc-800/60">
                  {snapshotOrder.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm text-zinc-100 font-medium">
                          {item.item_name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {item.quantity} × ${item.item_price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm text-zinc-200 font-semibold tabular-nums">
                        ${(item.item_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums">
                    ${receiptSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tax (8%)</span>
                  <span className="tabular-nums">${receiptTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-zinc-700">
                  <span className="font-bold text-lg text-white">Total</span>
                  <span className="text-orange-400 font-bold text-2xl tabular-nums">
  ${(receiptSubtotal + receiptTax).toFixed(2)}
</span>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-6 pt-0 shrink-0 flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Next Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== PAGE HEADER ======== */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            New Order
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Select items from the menu to build the customer&apos;s cart
          </p>
        </div>
      </header>

      {/* ======== MAIN LAYOUT ======== */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* ---- Menu panel ---- */}
        <section className="flex flex-col gap-6">
          {/* Category tabs */}
          <div className="overflow-x-auto pb-2 scrollbar-hide">
            <ul className="flex gap-2 w-max">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeCategory === cat
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    {cat === "ALL" ? (
                      <Utensils className="w-4 h-4" />
                    ) : (
                      getCategoryIcon(cat)
                    )}
                    <span className="capitalize">
                      {cat.replaceAll("_", " ").toLowerCase()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Loading */}
          {menuLoading && (
            <div className="flex items-center justify-center h-64 text-zinc-500">
              <span className="animate-pulse flex items-center gap-2">
                <Utensils className="w-5 h-5 animate-spin" /> Loading menu...
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
              <Info className="w-5 h-5" /> {error}
            </div>
          )}

          {/* Menu grid */}
          {!menuLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => addToOrder(item)}
                  className="group flex flex-col text-left bg-zinc-900/50 backdrop-blur-sm p-5 rounded-2xl hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 transition-all duration-200"
                >
                  <div className="flex justify-between items-start w-full mb-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-inner">
                      {getCategoryIcon(item.item_category)}
                    </div>
                    <span className="bg-zinc-950 text-zinc-200 px-3 py-1 rounded-full text-sm font-semibold border border-zinc-800 shadow-sm">
                      ${Number(item.item_price).toFixed(2)}
                    </span>
                  </div>

                  <h4 className="font-semibold text-lg text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {item.item_name}
                  </h4>

                  <p className="text-xs text-orange-500/70 font-medium uppercase tracking-wider mb-2">
                    {item.item_category.replaceAll("_", " ")}
                  </p>

                  {item.item_details && item.item_details.length > 0 && (
                    <p className="text-sm text-zinc-500 line-clamp-2 mt-auto pt-2 border-t border-zinc-800/50">
                      {item.item_details.join(", ")}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ---- Order panel ---- */}
        <form onSubmit={placeOrder}>
          <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-8 shadow-2xl flex flex-col h-[calc(100vh-4rem)]">
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Current Order</h3>
              <span className="ml-auto bg-zinc-800 text-zinc-300 text-xs font-bold px-2.5 py-1 rounded-full">
                {currentOrder.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                Items
              </span>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pr-2">
              {currentOrder.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="text-sm">No items added yet.</p>
                </div>
              ) : (
                currentOrder.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800/50"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="font-semibold text-zinc-100 truncate">
                        {item.item_name}
                      </p>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        ${item.item_price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-zinc-900 rounded-full p-1 border border-zinc-800">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity === 1
                            ? deleteFromOrder(item.id)
                            : removeFromOrder(item.id)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-4 h-4 text-red-400" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </button>

                      <span className="w-4 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => addToOrder(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals + form */}
            <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Tax (8%)</span>
                <span className="tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end font-bold text-lg text-white pt-2 border-t border-zinc-800/50">
                <span>Total</span>
                <span className="text-orange-400 text-2xl tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Customer inputs */}
              <div className="space-y-3 pt-3">
                <input
                  type="text"
                  placeholder="Customer name"
                  value={customerInfo.customer_name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      customer_name: e.target.value,
                    }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Cashier initials"
                  value={customerInfo.cashier_name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      cashier_name: e.target.value,
                    }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Order type selector */}
              <div className="mt-4">
                <p className="text-sm text-zinc-400 mb-2">Order Type</p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { value: "DINE_IN", emoji: "🍽️", label: "Dine In" },
                      { value: "TAKE_AWAY", emoji: "🥡", label: "Take Away" },
                      { value: "DELIVERY", emoji: "🚚", label: "Delivery" },
                    ] as const
                  ).map(({ value, emoji, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOrderType(value)}
                      className={`p-3 rounded-xl border text-sm font-medium flex flex-col items-center gap-1 transition-all ${
                        orderType === value
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-orange-500"
                      }`}
                    >
                      {emoji}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              {/* Submit */}
              <button
                disabled={currentOrder.length === 0 || placingOrder}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                type="submit"
              >
                <ReceiptText className="w-5 h-5" />
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
