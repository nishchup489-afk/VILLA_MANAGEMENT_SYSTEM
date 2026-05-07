"use client"

import { useEffect, useState } from "react"
import api from "@/app/lib/api"

type WasteEntry = {
    id: string
    product_name: string
    quantity: number
    reason: string
    thrown_at: string
}

export default function WasteLogsPage() {

    const [wasteProducts, setWasteProducts] = useState<WasteEntry[]>([])

    const [loading, setLoading] = useState(false)

    const [submitting, setSubmitting] = useState(false)

    const [error, setError] = useState("")


    // FORM STATES
    const [productName, setProductName] = useState("")

    const [quantity, setQuantity] = useState("")

    const [reason, setReason] = useState("")

    const [thrownAt, setThrownAt] = useState("")



    // FETCH WASTE HISTORY
    async function fetchWasteProductsData() {

        try {

            setLoading(true)

            setError("")


            const result = await api.get(
                "/waste"
            )

            setWasteProducts(
                result.data
            )

        } catch (err) {

            console.error(err)

            setError(
                "Failed to fetch waste logs."
            )

        } finally {

            setLoading(false)
        }
    }



    // CREATE WASTE ENTRY
    async function handleAddWasteEntry(
        e: React.FormEvent
    ) {

        e.preventDefault()

        try {

            setSubmitting(true)

            setError("")


            await api.post(
                "/waste",
                {
                    product_name: productName,
                    quantity: Number(quantity),
                    reason: reason,
                    thrown_at: thrownAt
                }
            )


            // RESET FORM
            setProductName("")
            setQuantity("")
            setReason("")
            setThrownAt("")


            // REFRESH TABLE
            await fetchWasteProductsData()

        } catch (err) {

            console.error(err)

            setError(
                "Failed to add waste log."
            )

        } finally {

            setSubmitting(false)
        }
    }



    useEffect(() => {

        fetchWasteProductsData()

    }, [])



    return (

        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

         {/* HEADER */}
<header className="mb-10">

    <div className="
        relative
        overflow-hidden
        rounded-3xl
        border border-orange-500/20
        bg-linear-to-br
        from-zinc-900
        via-zinc-950
        to-black
        p-8
        shadow-2xl
    ">

        {/* GLOW EFFECT */}
        <div className="
            absolute
            -top-24
            right-0
            h-64
            w-64
            rounded-full
            bg-orange-500/10
            blur-3xl
        " />



        <div className="relative z-10">

            <div className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-orange-500/30
                bg-orange-500/10
                px-4 py-1.5
                text-sm
                font-medium
                text-orange-300
                mb-5
            ">

                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />

                Waste Monitoring System

            </div>



            <h1 className="
                text-5xl
                font-black
                tracking-tight
                bg-linear-to-r
                from-white
                via-orange-100
                to-orange-400
                bg-clip-text
                text-transparent
            ">

                Waste Logs

            </h1>



            <p className="
                mt-4
                max-w-2xl
                text-lg
                leading-relaxed
                text-zinc-400
            ">

                Daily waste tracking and monitoring for operational efficiency,
                inventory control, and cost reduction.

            </p>



            <div className="
                mt-6
                rounded-2xl
                border border-yellow-500/20
                bg-yellow-500/10
                p-4
                backdrop-blur-sm
            ">

                <p className="
                    text-sm
                    leading-relaxed
                    text-yellow-200
                ">

                    ⚠️ <span className="font-semibold">
                        Manager Reminder:
                    </span>{" "}

                    Every single waste entry must be logged daily before shift closing.
                    Consistent tracking helps reduce operational loss and improves inventory accuracy.

                </p>

            </div>

        </div>

    </div>

</header>



            {/* ERROR */}
            {error && (

                <div className="
                    mb-6
                    rounded-2xl
                    border border-red-500/30
                    bg-red-500/10
                    text-red-400
                    p-4
                ">

                    {error}

                </div>
            )}



            {/* FORM */}
            <section className="
                mb-10
                rounded-3xl
                border border-zinc-800
                bg-zinc-900/40
                p-6
            ">

                <h2 className="text-2xl font-semibold mb-6">
                    Add Waste Entry
                </h2>


                <form
                    onSubmit={handleAddWasteEntry}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* PRODUCT */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-medium
                            text-zinc-300
                            mb-2
                        ">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) =>
                                setProductName(
                                    e.target.value
                                )
                            }
                            required
                            className="
                                w-full
                                rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                outline-none
                                focus:border-orange-500
                            "
                            placeholder="Burned Garlic Bread"
                        />

                    </div>



                    {/* QUANTITY */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-medium
                            text-zinc-300
                            mb-2
                        ">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value
                                )
                            }
                            required
                            className="
                                w-full
                                rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                outline-none
                                focus:border-orange-500
                            "
                            placeholder="4"
                        />

                    </div>



                    {/* REASON */}
                    <div className="md:col-span-2">

                        <label className="
                            block
                            text-sm
                            font-medium
                            text-zinc-300
                            mb-2
                        ">
                            Reason
                        </label>

                        <textarea
                            value={reason}
                            onChange={(e) =>
                                setReason(
                                    e.target.value
                                )
                            }
                            required
                            rows={4}
                            className="
                                w-full
                                rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                outline-none
                                resize-none
                                focus:border-orange-500
                            "
                            placeholder="Overcooked during rush hour..."
                        />

                    </div>



                    {/* DATE */}
                    <div>

                        <label className="
                            block
                            text-sm
                            font-medium
                            text-zinc-300
                            mb-2
                        ">
                            Thrown At
                        </label>

                        <input
                            type="date"
                            value={thrownAt}
                            onChange={(e) =>
                                setThrownAt(
                                    e.target.value
                                )
                            }
                            required
                            className="
                                w-full
                                rounded-xl
                                border border-zinc-700
                                bg-zinc-950
                                px-4 py-3
                                outline-none
                                focus:border-orange-500
                            "
                        />

                    </div>



                    {/* BUTTON */}
                    <div className="
                        md:col-span-2
                        flex justify-end
                    ">

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                rounded-xl
                                bg-orange-600
                                hover:bg-orange-500
                                disabled:opacity-50
                                px-6 py-3
                                font-semibold
                                transition-colors
                            "
                        >

                            {submitting
                                ? "Adding..."
                                : "Add Waste Log"}

                        </button>

                    </div>

                </form>

            </section>



            {/* TABLE */}
            <section>

                <h2 className="text-2xl font-semibold mb-6">
                    Waste History
                </h2>


                {loading ? (

                    <div className="
                        flex items-center justify-center
                        py-20
                    ">

                        <div className="
                            text-zinc-400
                            text-lg
                            animate-pulse
                        ">
                            Loading waste logs...
                        </div>

                    </div>

                ) : wasteProducts.length === 0 ? (

                    <div className="
                        rounded-2xl
                        border border-zinc-800
                        bg-zinc-900/40
                        p-10
                        text-center
                    ">

                        <h3 className="
                            text-2xl
                            font-semibold
                            mb-2
                        ">
                            No Waste Logs Found
                        </h3>

                        <p className="text-zinc-400">
                            Waste entries will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="
                        overflow-x-auto
                        rounded-2xl
                        border border-zinc-800
                        bg-zinc-900/40
                    ">

                        <table className="w-full">

                            <thead className="
                                bg-zinc-900
                                border-b border-zinc-800
                            ">

                                <tr>

                                    <th className="
                                        text-left
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-zinc-300
                                    ">
                                        Product
                                    </th>

                                    <th className="
                                        text-left
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-zinc-300
                                    ">
                                        Quantity
                                    </th>

                                    <th className="
                                        text-left
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-zinc-300
                                    ">
                                        Reason
                                    </th>

                                    <th className="
                                        text-left
                                        px-6 py-4
                                        text-sm
                                        font-semibold
                                        text-zinc-300
                                    ">
                                        Date
                                    </th>

                                </tr>

                            </thead>



                            <tbody>

                                {wasteProducts.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="
                                            border-b border-zinc-800
                                            hover:bg-zinc-800/40
                                            transition-colors
                                        "
                                    >

                                        <td className="
                                            px-6 py-4
                                            font-medium
                                        ">
                                            {item.product_name}
                                        </td>

                                        <td className="
                                            px-6 py-4
                                            text-zinc-300
                                        ">
                                            {item.quantity}
                                        </td>

                                        <td className="
                                            px-6 py-4
                                            text-zinc-400
                                            max-w-md
                                        ">
                                            {item.reason}
                                        </td>

                                        <td className="
                                            px-6 py-4
                                            text-zinc-400
                                        ">
                                            {item.thrown_at}
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </section>

        </div>
    )
}