import { Sparkles, ArrowUpRight } from "lucide-react"
import teeman from "../assets/teeman.jpg"

export default function MidPanel({scrollToGrid}){
    return(
        <div className="grid p-5 md:flex gap-10">
            <div className="w-full h- bg-[#FFFEFB] border border-black/10 rounded-[36px] p-8 md:p-10 font-['Inter']">

                {/* Top pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 text-[11px] tracking-[0.15em] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    FALL / WINTER 2026 — DROP 02
                </div>

                {/* Big Title - EXACT FONT */}
                <div className="mt-8 leading-[0.85] font-['Instrument_Serif']">
                    <h1 className="text-[64px] md:text-[80px] font-normal tracking-[-0.05em] text-black">New</h1>
                    <h1 className="text-[64px] md:text-[80px] font-normal tracking-[-0.05em] text-black">Collection</h1>
                    <h1 className="text-[64px] md:text-[80px] tracking-[-0.05em] flex gap-4">
                        <span className="font-normal text-black">/</span>
                        <span className="font-normal italic text-black/60">Fall</span>
                    </h1>
                    <h1 className="text-[64px] md:text-[80px] font-normal tracking-[-0.05em] text-black">2024</h1>
                </div>

                {/* Description */}
                <p className="mt-7 text-[20px] leading-[1.6] text-black/40 max-w-[320px] font-['Inter']">
                    Curated essentials for the modern wardrobe. Heavyweight cottons, Italian leathers, and soft drapery — built to last beyond the season.
                </p>

                {/* Bottom */}
                <div className="mt-12 flex items-center gap-">
                    <button onClick={scrollToGrid} className="flex items-center gap-2 bg-black text-white px-7 py-4 rounded-full text-[13px] font-bold tracking-wide hover:bg-black/80 transition">
                        SHOP NOW
                        <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-[#EDE5D8] border-2 border-white"></div>
                            <div className="w-7 h-7 rounded-full bg-black border-2 border-white -ml-2.5"></div>
                            <div className="w-7 h-7 rounded-full bg-[#C9B8A5] border-2 border-white -ml-2.5"></div>
                        </div>
                        <p className="text-[10px] tracking-[0.12em] text-black/40 font-medium leading-tight">12 NEW ARRIVALS THIS WEEK</p>
                    </div>
                </div>

            </div>

           {/**second */}
            <div className="w-full rounded-[32px] p-6 md:p-7 relative overflow-hidden min-h-[620px] md:min-h-[720px]">

                {/* FULL CONTAINER IMAGE */}
                <img
                    src={teeman}
                    alt="Oversized Tee"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />

                {/* DARK GRADIENT OVERLAY FOR READABILITY */}
                <div className="absolute inset-0  " />
                <div className="absolute inset-0  " />

                {/* Top */}
                <div className="relative z-10 flex justify-between items-center">
                    <div className="px-3.5 py-1.5 rounded-full border border-black/10 bg-white/80 backdrop-blur text-[11px] tracking-[0.1em] font-medium">
                        LOOK 04 — STUDIO
                    </div>
                    <button onClick={scrollToGrid} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Spacer */}
                <div className="h-[280px] md:h-[340px] w-full" />

                {/* Middle grid */}
                <div className="relative z-10 md:mt-[-40px]">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/90 backdrop-blur rounded-[20px] p-5 flex flex-col justify-between h-[160px] md:h-[250px]">
                            <p className="text-[11px] tracking-[0.1em] text-black/40">01 / OVERSIZED TEE</p>
                            <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                                <div className="w-3 h-5 bg-black rounded-full rounded-r-none -ml-1 rotate-12"></div>
                            </div>
                            <p className="text-[13px] text-black/70">Organic • Washed</p>
                        </div>

                        <div className="bg-[#111] text-white rounded-[20px] p-5 flex flex-col justify-between h-[160px] md:h-[250px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_100%,#3A3A3A_0%,#111_100%)]" />
                            <p className="relative text-[11px] tracking-[0.1em] text-white/50">PRICE</p>
                            <p className="relative text-[32px] font-['Instrument_Serif'] leading-none">$45</p>
                            <p className="relative text-[11px] text-white/60 line-through tracking-wide">$65 BEFORE</p>
                        </div>
                    </div>

                    <div className="mt-3 bg-white/90 backdrop-blur rounded-[20px] p-4 flex items-center gap-3">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5F0E8] flex items-center justify-center shrink-0">
                            <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                                <div className="w-2.5 h-4 bg-black rounded-full rounded-r-none -ml-0.5"></div>
                            </div>
                        </div>
                        <div className="md:h-[150px] p-9">
                            <p className="text-[14px] font-medium text-black">Leather Sneakers</p>
                            <p className="text-[13px] text-black/40">Now available • 4 colors</p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-4 h-4 rounded-full bg-[#2B2B2B]"></div>
                                <div className="w-4 h-4 rounded-full bg-[#EDE5D8]"></div>
                                <div className="w-4 h-4 rounded-full border border-black/10 bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


