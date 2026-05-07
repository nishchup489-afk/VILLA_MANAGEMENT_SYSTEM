"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Search,
    Package,
    AlertTriangle,
    XCircle,
    Plus,
    CalendarDays,
    Boxes,
    RefreshCcw,
} from "lucide-react";

import api from "@/app/lib/api";


// =========================================================
// TYPES
// =========================================================

type InventoryItem = {
    id: string;
    item_name: string;
    item_category: string;
    current_stock: number;
};


// =========================================================
// PAGE
// =========================================================

export default function InventoryPage() {

    // =====================================================
    // STATE
    // =====================================================

    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("ALL");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // =====================================================
    // FETCH INVENTORY
    // =====================================================

    const fetchInventory = async () => {

        try {

            setLoading(true);

            setError("");

            // =================================================
            // AXIOS REQUEST
            //
            // Axios automatically parses JSON.
            //
            // response.data
            // NOT response.json()
            // =================================================

            const response = await api.get(
                "/inventory/items"
            );

            setInventoryItems(response.data);

        } catch (error: any) {

            console.error(
                "Inventory fetch failed:",
                error
            );

            setError(
                "Failed to load inventory items."
            );

        } finally {

            setLoading(false);

        }
    };

    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        fetchInventory();

    }, []);

    // =====================================================
    // FILTERED ITEMS
    // =====================================================

    const filteredItems = useMemo(() => {

        return inventoryItems.filter((item) => {

            // =============================================
            // SEARCH FILTER
            // =============================================

            const matchesSearch =
                item.item_name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            // =============================================
            // CATEGORY FILTER
            // =============================================

            const matchesCategory =
                selectedCategory === "ALL"
                    ? true
                    : item.item_category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    }, [
        inventoryItems,
        searchTerm,
        selectedCategory
    ]);

    // =====================================================
    // STATS
    // =====================================================

    const totalItems = inventoryItems.length;

    const lowStockItems = inventoryItems.filter(
        (item) =>
            item.current_stock > 0 &&
            item.current_stock <= 5
    ).length;

    const outOfStockItems = inventoryItems.filter(
        (item) =>
            item.current_stock === 0
    ).length;

    // =====================================================
    // CATEGORY OPTIONS
    // =====================================================

    const categories = [

        "ALL",

        ...new Set(
            inventoryItems.map(
                (item) => item.item_category
            )
        ),
    ];

    // =====================================================
    // STOCK STATUS
    // =====================================================

    const getStockStatus = (
        stock: number
    ) => {

        // =============================================
        // OUT OF STOCK
        // =============================================

        if (stock === 0) {

            return {
                label: "OUT",
                className:
                    "bg-red-500/20 text-red-300 border border-red-500/30",
            };
        }

        // =============================================
        // LOW STOCK
        // =============================================

        if (stock <= 5) {

            return {
                label: "LOW",
                className:
                    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
            };
        }

        // =============================================
        // HEALTHY STOCK
        // =============================================

        return {
            label: "HEALTHY",
            className:
                "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        };
    };

    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-[#120c07] text-[#f5edd6] flex items-center justify-center">

                <div className="flex items-center gap-3 text-xl">

                    <RefreshCcw className="w-5 h-5 animate-spin" />

                    Loading Inventory...

                </div>

            </div>
        );
    }

    // =====================================================
    // ERROR SCREEN
    // =====================================================

    if (error) {

        return (

            <div className="min-h-screen bg-[#120c07] text-[#f5edd6] flex items-center justify-center">

                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-6">

                    <p className="text-red-300 text-lg">
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div className="min-h-screen bg-[#120c07] text-[#f5edd6]">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl">

                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                    {/* LEFT */}

                    <div>

                        <h1 className="text-4xl font-serif font-bold tracking-tight">

                            Inventory Management

                        </h1>

                        <p className="text-[#c8bca6] mt-1">

                            Villa Russo Café Operations

                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-2 text-[#b8aa95]">

                            <CalendarDays className="w-4 h-4" />

                            <span>
                                {new Date().toLocaleDateString()}
                            </span>

                        </div>

                        <button
                            className="
                            bg-[#c4522a]
                            hover:bg-[#d1633c]
                            transition
                            px-5
                            py-3
                            rounded-2xl
                            shadow-lg
                            shadow-orange-900/30
                            flex
                            items-center
                            gap-2
                            font-medium
                            "
                        >

                            <Plus className="w-4 h-4" />

                            Update Daily Stock

                        </button>

                    </div>

                </div>

            </div>

            {/* ================================================= */}
            {/* CONTENT */}
            {/* ================================================= */}

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* ================================================= */}
                {/* STATS */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* TOTAL ITEMS */}

                    <div className="bg-[#1a1008] border border-white/10 rounded-3xl p-6 shadow-2xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[#bcae95] text-sm">
                                    Total Items
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    {totalItems}
                                </h2>

                            </div>

                            <div className="bg-[#c4522a]/20 p-4 rounded-2xl">

                                <Boxes className="w-7 h-7 text-[#d4a847]" />

                            </div>

                        </div>

                    </div>

                    {/* LOW STOCK */}

                    <div className="bg-[#1a1008] border border-white/10 rounded-3xl p-6 shadow-2xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[#bcae95] text-sm">
                                    Low Stock
                                </p>

                                <h2 className="text-4xl font-bold mt-2 text-yellow-300">
                                    {lowStockItems}
                                </h2>

                            </div>

                            <div className="bg-yellow-500/20 p-4 rounded-2xl">

                                <AlertTriangle className="w-7 h-7 text-yellow-300" />

                            </div>

                        </div>

                    </div>

                    {/* OUT OF STOCK */}

                    <div className="bg-[#1a1008] border border-white/10 rounded-3xl p-6 shadow-2xl">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[#bcae95] text-sm">
                                    Out Of Stock
                                </p>

                                <h2 className="text-4xl font-bold mt-2 text-red-300">
                                    {outOfStockItems}
                                </h2>

                            </div>

                            <div className="bg-red-500/20 p-4 rounded-2xl">

                                <XCircle className="w-7 h-7 text-red-300" />

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================================================= */}
                {/* SEARCH + FILTER */}
                {/* ================================================= */}

                <div className="bg-[#1a1008] border border-white/10 rounded-3xl p-5 mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                    {/* SEARCH */}

                    <div className="relative w-full lg:max-w-md">

                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#9f917b]" />

                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            bg-[#120c07]
                            border
                            border-white/10
                            rounded-2xl
                            pl-12
                            pr-4
                            py-3
                            outline-none
                            focus:border-[#c4522a]
                            transition
                            "
                        />

                    </div>

                    {/* CATEGORY FILTER */}

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                        className="
                        bg-[#120c07]
                        border
                        border-white/10
                        rounded-2xl
                        px-5
                        py-3
                        outline-none
                        focus:border-[#c4522a]
                        transition
                        "
                    >

                        {categories.map((category) => (

                            <option
                                key={category}
                                value={category}
                                className="bg-[#120c07]"
                            >
                                {category}
                            </option>

                        ))}

                    </select>

                </div>

                {/* ================================================= */}
                {/* INVENTORY TABLE */}
                {/* ================================================= */}

                <div className="bg-[#1a1008] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                    {/* TABLE HEADER */}

                    <div className="grid grid-cols-5 px-6 py-5 bg-black/20 border-b border-white/10 text-sm uppercase tracking-wider text-[#b8a88d]">

                        <div>Item</div>
                        <div>Category</div>
                        <div>Current Stock</div>
                        <div>Status</div>
                        <div>Actions</div>

                    </div>

                    {/* TABLE BODY */}

                    {filteredItems.map((item) => {

                        const status =
                            getStockStatus(
                                item.current_stock
                            );

                        return (

                            <div
                                key={item.id}
                                className="
                                grid
                                grid-cols-5
                                items-center
                                px-6
                                py-5
                                border-b
                                border-white/5
                                hover:bg-white/[0.03]
                                transition
                                "
                            >

                                {/* ITEM */}

                                <div className="flex items-center gap-3">

                                    <div className="bg-[#c4522a]/20 p-2 rounded-xl">

                                        <Package className="w-5 h-5 text-[#d4a847]" />

                                    </div>

                                    <span className="font-medium">
                                        {item.item_name}
                                    </span>

                                </div>

                                {/* CATEGORY */}

                                <div className="text-[#c8bca6]">

                                    {item.item_category}

                                </div>

                                {/* STOCK */}

                                <div className="text-lg font-semibold">

                                    {item.current_stock}

                                </div>

                                {/* STATUS */}

                                <div>

                                    <span
                                        className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-semibold
                                        tracking-wide
                                        ${status.className}
                                        `}
                                    >
                                        {status.label}
                                    </span>

                                </div>

                                {/* ACTIONS */}

                                <div className="flex items-center gap-3">

                                    <button
                                        className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-[#c4522a]/20
                                        hover:bg-[#c4522a]/30
                                        transition
                                        text-sm
                                        "
                                    >

                                        Update

                                    </button>

                                    <button
                                        className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-white/5
                                        hover:bg-white/10
                                        transition
                                        text-sm
                                        "
                                    >

                                        History

                                    </button>

                                </div>

                            </div>

                        );
                    })}

                    {/* EMPTY STATE */}

                    {filteredItems.length === 0 && (

                        <div className="py-20 text-center text-[#9f917b]">

                            No inventory items found.

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}