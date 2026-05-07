"use client"

import { useState, useEffect } from "react"
import api from "@/app/lib/api"
import { UtensilsCrossed, ChefHat, AlertCircle, Loader2, ArrowBigLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// 🔥 Frontend type (clean + safe)
type MenuItem = {
    id: string
    name: string
    price: number
    description?: string
    imageUrl: string // Added for UI
}

// Fallback high-quality food images
const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop"
]

export default function Menu() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
const [managerName, setManagerName] = useState("")
const [managerCode, setManagerCode] = useState("")
const [authError, setAuthError] = useState("")

    async function fetchAllMenuItems() {
        try {
            setLoading(true)
            setError("")

            const response = await api.get("/menu")

            console.log("RAW MENU:", response.data)

            // 🔥 BULLETPROOF mapping layer
            const mappedData: MenuItem[] = response.data.map((item: any, index: number) => ({
                id: item.id,
                name: item.item_name ?? "Unnamed Item",
                price: Number(item.item_price) || 0, // 🔥 FORCE number
                description:
                    typeof item.item_details === "object"
                        ? item.item_details?.instruction
                        : item.item_details,
                // Assign a placeholder image based on index to keep it consistent per render
                imageUrl: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
            }))

            console.log("MAPPED MENU:", mappedData)

            setMenuItems(mappedData)

        } catch (err) {
            console.error(err)
            setError("There was a problem fetching the menu. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllMenuItems()
    }, [])

    const router = useRouter();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30">
            {/* HERO HEADER */}
            <header className="relative bg-zinc-900 border-b border-zinc-800 pt-20 pb-12 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-orange-500 via-zinc-900 to-zinc-950"></div>

                <button 
    onClick={() => router.push("/dashboard")}
    className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
>

    <ArrowBigLeft size={20} />
    Back
</button>

<button 
    onClick={() => {
    setAuthError("")   
    setShowModal(true)
}}
    className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
>
    Add New Menu Item +
</button>
                <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="p-4 bg-zinc-950 rounded-full border border-zinc-800 shadow-xl mb-6">
                        <ChefHat className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Villa Russo <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">Menu</span>
                    </h1>
                    <p className="text-zinc-400 max-w-lg text-lg">
                        Discover our chef's finest creations, crafted with passion and the freshest ingredients.
                    </p>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                
                {/* 🔥 LOADING STATE */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500 space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                        <p className="text-lg font-medium animate-pulse">Preparing the menu...</p>
                    </div>
                )}

                {/* 🔥 ERROR STATE */}
                {error && !loading && (
                    <div className="max-w-md mx-auto flex flex-col items-center text-center p-8 bg-red-500/10 border border-red-500/20 rounded-3xl">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-red-400 font-medium">{error}</p>
                        <button 
                            onClick={() => fetchAllMenuItems()}
                            className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* 🔥 EMPTY STATE */}
                {!loading && !error && menuItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
                        <UtensilsCrossed className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-xl font-medium">No menu items found</p>
                        <p className="text-zinc-600 mt-2">Check back later for our new offerings.</p>
                    </div>
                )}

                {/* 🔥 MENU GRID */}
                {!loading && !error && menuItems.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {menuItems.map((m) => (
                            <div
                                key={m.id}
                                className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                            >
                                {/* IMAGE CONTAINER */}
                                <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                                    <img 
                                        src={m.imageUrl} 
                                        alt={m.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                                    
                                    {/* PRICE BADGE */}
                                    <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-md text-orange-400 font-bold px-4 py-2 rounded-full border border-orange-500/20 shadow-lg">
                                        ${Number(m.price).toFixed(2)}
                                    </div>
                                </div>

                                {/* CARD CONTENT */}
                                <div className="flex flex-col flex-1 p-6">
                                    <h2 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
                                        {m.name}
                                    </h2>
                                    
                                    {m.description ? (
                                        <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                                            {m.description}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-zinc-600 italic">
                                            No description available.
                                        </p>
                                    )}

                                    {/* BOTTOM ACTIONS (Optional, for UI balance) */}
                                    <div className="mt-auto pt-6">
                                        <button className="w-full py-3 px-4 bg-zinc-800 hover:bg-orange-500 text-zinc-300 hover:text-white rounded-xl font-medium transition-all duration-200">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            {showModal && (
    <div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={() => setShowModal(false)}
    >
        <div 
    onClick={(e) => e.stopPropagation()}
    className="bg-zinc-900 p-6 rounded-xl w-87.5 text-white border border-zinc-700"
>
            <h2 className="text-xl font-bold mb-4">
                Manager Verification
            </h2>

            {/* NAME */}
            <input
                type="text"
                placeholder="Manager Name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700"
            />

            {/* CODE */}
            <input
                type="password"
                placeholder="Manager Code"
                value={managerCode}
                onChange={(e) => setManagerCode(e.target.value)}
                className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700"
            />

            {/* ERROR */}
            {authError && (
                <p className="text-red-400 text-sm mb-2">
                    {authError}
                </p>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1 bg-zinc-700 rounded"
                >
                    Cancel
                </button>

                <button
                    onClick={() => {
                        // 🔥 TEMP VALIDATION (replace later with API)
                        if (
                            managerName === "managerVilla" &&
                            managerCode === "405732"
                        ) {
                            setShowModal(false)
                            router.push("/dashboard/menu/create")
                        } else {
                            setAuthError("Invalid credentials")
                        }
                    }}
                    className="px-3 py-1 bg-orange-500 rounded"
                >
                    Verify
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    )
}