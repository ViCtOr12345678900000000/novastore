export default function MidBar({ activeCategory, setActiveCategory, sortBy, setSortBy, favorites = [] }){
  const categories = ["ALL","APPAREL","FOOTWEAR","ACCESSORIES","BEAUTY", "FAVORITE"]
  const sorts = ["Featured","Price: Low-High","Price: High-Low","Recent"]

  return (
    <div 
      className="w-full h-50 md:h-35 flex flex-wrap items-baseline md:rounded-full min-w-[250px] p-4 md:p-7 pb-3 justify-between sticky top-24 z-40 bg-white/75 border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
      style={{ backdropFilter: "blur(30px) saturate(180%)", WebkitBackdropFilter: "blur(30px) saturate(180%)" }}
    >
      <div className="flex gap-3 flex-wrap">
        {categories.map(cat => {
          const isFav = cat === "FAVORITE"
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border h-10 p-2 px-5 rounded-full uppercase text-[12px] font-medium transition
                ${activeCategory === cat ? "bg-black text-white border-black" : "bg-white border-black/10 hover:border-black/30"}`}
            >
              {cat} {isFav && favorites.length > 0 ? `(${favorites.length})` : ""}
            </button>
          )
        })}
      </div>

      <div className="flex  gap-6 border border-white/80 bg-white/60 p-2 mt- md:mt-4 rounded-full h-12 items-center px-4 backdrop-blur-xl">
        {sorts.map(s => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`text-[12px] uppercase tracking-wide transition
              ${sortBy === s ? "font-semibold text-black" : "text-black/40 hover:text-black/70"}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}