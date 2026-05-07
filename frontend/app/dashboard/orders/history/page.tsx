"use client"

import { useState, useEffect } from "react"
import api from "@/app/lib/api"
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

// 🔥 TYPE (this fixes your entire TS issue)
type Order = {
    id: string
    customer_id: string
    created_at: string
    updated_at: string
    order_type: string
    receipt_number: string
    daily_order_number: number
    totals: number
}

export default function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const todaysRevenue = orderHistory.reduce((acc, o) => {
    const today = new Date().toDateString()
    const orderDate = new Date(o.created_at).toDateString()

    if (today === orderDate) {
        return acc + (o.totals || 0)
    }

    return acc
}, 0)

    async function fetchOrderHistory() {
        try {
            setLoading(true)
            setError("")

            const response = await api.get("/orders")
            console.log("DATA:", response.data)

            setOrderHistory(response.data)

        } catch (err) {
            console.error("ERROR:", err)
            setError("Failed to fetch order history")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrderHistory()
    }, [])

    const router = useRouter();

    if (loading) {
        return <p className="p-6">Loading orders...</p>
    }

    if (error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    return (
        <div className="p-6">
            <button 
    onClick={() => router.push("/dashboard/orders")}
    className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white"
>
    <ArrowBigLeft size={20} />
    Back
</button>
            <header className="text-2xl font-bold mb-6">
                Order History
            </header>

            <main className="overflow-x-auto">
                <table className="min-w-full border border-gray-700 text-sm">
                    
                    {/* 🔥 HEAD */}
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="p-3 text-left">Receipt</th>
                            <th className="p-3 text-left">Order #</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Total ($)</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    {/* 🔥 BODY */}
                    <tbody>
                        {orderHistory.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-4">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orderHistory.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                                >
                                    <td className="p-3">
                                        {order.receipt_number}
                                    </td>

                                    <td className="p-3">
                                        #{order.daily_order_number}
                                    </td>

                                    <td className="p-3">
                                        {order.order_type}
                                    </td>

                                    <td className="p-3 font-semibold">
                                        ${order.totals?.toFixed(2) ?? "0.00"}
                                    </td>

                                    <td className="p-3">
                                        {new Date(order.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
                
                <div className="mt-6 p-4 bg-gray-900 text-white rounded sticky flex justify-between items-center">
    <h3 className="text-lg font-semibold">
        Today’s Revenue ({new Date().toLocaleDateString()})
    </h3>

    <span className="text-xl font-bold">
        ${todaysRevenue.toFixed(2)}
    </span>
</div>
                
            </main>
        </div>
    )
}