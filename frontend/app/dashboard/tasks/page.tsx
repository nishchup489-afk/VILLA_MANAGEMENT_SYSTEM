"use client"

export default function ComingSoonPage() {

    return (

        <div className="
            min-h-screen
            bg-zinc-950
            text-zinc-100
            flex
            items-center
            justify-center
            p-6
            overflow-hidden
            relative
        ">

            {/* BACKGROUND GLOW */}
            <div className="
                absolute
                -top-30
                -right-30
                h-100
                w-100
                rounded-full
                bg-orange-500/10
                blur-3xl
            " />

            <div className="
                absolute
                -bottom-35
                -left-35
                h-105
                w-105
                rounded-full
                bg-red-500/10
                blur-3xl
            " />



            {/* MAIN CARD */}
            <div className="
                relative
                z-10
                w-full
                max-w-3xl
                overflow-hidden
                rounded-4xl
                border border-orange-500/20
                bg-linear-to-br
                from-zinc-900
                via-zinc-950
                to-black
                p-10
                shadow-2xl
            ">

                {/* BADGE */}
                <div className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border border-orange-500/30
                    bg-orange-500/10
                    px-4 py-2
                    text-sm
                    font-semibold
                    text-orange-300
                    mb-6
                ">

                    <span className="
                        h-2
                        w-2
                        rounded-full
                        bg-orange-400
                        animate-pulse
                    " />

                    Feature In Development

                </div>



                {/* TITLE */}
                <h1 className="
                    text-6xl
                    font-black
                    tracking-tight
                    leading-none
                    bg-linear-to-r
                    from-white
                    via-orange-100
                    to-orange-500
                    bg-clip-text
                    text-transparent
                ">

                    Coming Soon

                </h1>



                {/* DESCRIPTION */}
                <p className="
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-relaxed
                    text-zinc-400
                ">

                    This module is currently under active development for
                    Villa Russo Café Management System. New operational tools,
                    analytics, and workflow systems are being engineered and
                    will be available soon.

                </p>



                {/* INFO CARDS */}
                <div className="
                    mt-10
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                ">

                    <div className="
                        rounded-2xl
                        border border-zinc-800
                        bg-zinc-900/40
                        p-5
                    ">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-white
                            mb-2
                        ">
                            ⚡ Smart Analytics
                        </h3>

                        <p className="
                            text-sm
                            leading-relaxed
                            text-zinc-400
                        ">
                            Advanced operational insights and performance tracking.
                        </p>

                    </div>



                    <div className="
                        rounded-2xl
                        border border-zinc-800
                        bg-zinc-900/40
                        p-5
                    ">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-white
                            mb-2
                        ">
                            🧠 AI Integration
                        </h3>

                        <p className="
                            text-sm
                            leading-relaxed
                            text-zinc-400
                        ">
                            AI-assisted forecasting and intelligent management tools.
                        </p>

                    </div>



                    <div className="
                        rounded-2xl
                        border border-zinc-800
                        bg-zinc-900/40
                        p-5
                    ">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-white
                            mb-2
                        ">
                            📊 Operational Tools
                        </h3>

                        <p className="
                            text-sm
                            leading-relaxed
                            text-zinc-400
                        ">
                            Inventory, waste, staff, and reporting systems expansion.
                        </p>

                    </div>

                </div>



                {/* FOOTER NOTE */}
                <div className="
                    mt-10
                    rounded-2xl
                    border border-yellow-500/20
                    bg-yellow-500/10
                    p-4
                ">

                    <p className="
                        text-sm
                        text-yellow-200
                        leading-relaxed
                    ">

                        🚧 This feature is currently being built and refined.
                        Some systems may still be incomplete or unavailable.

                    </p>

                </div>

            </div>

        </div>
    )
}