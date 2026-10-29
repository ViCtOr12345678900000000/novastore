export default function Footer( {scrollToGrid} ) {
  return (
    <footer className="w-full bg-[#FFFEFB] px-4 md:px-6 py-12 md:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* LEFT - NEWSLETTER CARD */}
        <div className="flex-1 bg-[#FAF8F4] rounded-[28px] border border-black/5 p-8 md:p-10">
          <p className="text-[11px] tracking-[0.2em] font-semibold mb-4">NEWSLETTER</p>
          
          <h2 className="text-[36px] md:text-[48px] leading-[0.95] tracking-tight font-serif mb-8">
            Get 15% off <br /> your first order.
          </h2>

          <div className="flex gap-2 items-center">
            <input 
              placeholder="Email address"
              className="flex-1 h-[48px] px-6 rounded-full bg-white border border-black/5 text-[13px] placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="h-[48px] px-7 rounded-full bg-black text-white text-[12px] tracking-widest font-bold hover:bg-zinc-800 transition">
              JOIN
            </button>
          </div>

          <p className="text-[11px] text-black/40 mt-3">
            By joining, you agree to our Terms. No spam, ever.
          </p>
        </div>

        {/* RIGHT - LINKS */}
        <div className="flex-1 lg:pt-2">
          <div className="grid grid-cols-2 gap-8">
            {/* SHOP */}
            <div>
              <p className="text-[11px] tracking-[0.2em] text-black/40 font-semibold mb-5">SHOP</p>
              <div className=" items-start flex flex-col gap-3.5">
                <button onClick={scrollToGrid} className="text-[13px] hover:opacity-60">New Arrivals</button>
                <button onClick={scrollToGrid} className="text-[13px] hover:opacity-60">Apparel</button>
                <button onClick={scrollToGrid} className="text-[13px] hover:opacity-60">Footwear</button>
                <button onClick={scrollToGrid} className="text-[13px] hover:opacity-60">Accessories</button>
                <button onClick={scrollToGrid} className="text-[13px] hover:opacity-60">Beauty</button>
              </div>
            </div>

            {/* INFO */}
            <div>
              <p className="text-[11px] tracking-[0.2em] text-black/40 font-semibold mb-5">INFO</p>
              <div className="flex flex-col gap-3.5">
                <a href="#" className="text-[13px] hover:opacity-60">Shipping & Returns</a>
                <a href="#" className="text-[13px] hover:opacity-60">Care Guide</a>
                <a href="#" className="text-[13px] hover:opacity-60">Journal</a>
                <a href="#" className="text-[13px] hover:opacity-60">Stores</a>
                <a href="#" className="text-[13px] hover:opacity-60">Contact</a>
              </div>
            </div>
          </div>

          {/* BOTTOM LINE */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mt-10 pt-8 border-t border-black/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">N</div>
              <span className="text-[12px] font-semibold">NOVA © 2026</span>
            </div>
            <span className="text-[11px] text-black/30 tracking-wide">CRAFTED IN LISBON — SHIPS WORLDWIDE</span>
          </div>
        </div>

      </div>
    </footer>
  )
}