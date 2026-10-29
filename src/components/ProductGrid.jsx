import { Heart, Star, ShoppingBag } from "lucide-react"

export default function ProductGrid({ products, favorites, toggleFav, addToCart }){

  return(
    <div className="w-full p-4 bg-[#FFFEFB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="rounded-[24px] overflow-hidden border border-black/5 bg-white group cursor-pointer">
            
            <div className="relative h-[420px] flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
              <img 
                src={p.image} 
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              
              <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
                <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{p.category}</span>
                {p.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${p.tagColor}`}>{p.tag}</span>}
              </div>

              <button onClick={(e)=> { e.stopPropagation(); toggleFav(p.id)}} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center z-10">
               <Heart className={`w-3.5 h-3.5 transition ${favorites.includes(p.id) ? "fill-red-500 text-red-500" : "text-red-500"}`}/> 
              </button>

              {/* HOVER ADD TO CART */}
              <div className="absolute  lg:bg-black/20 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center rounded-full mt-45 justify-center z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  className="bg-white text-black text-[11px] tracking-widest font-bold px-6 py-3 rounded-full shadow-xl translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 hover:bg-black hover:text-white"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end p-4 px-5 bg-white">
              <div>
                <p className="text-[16px] font-semibold tracking-tight">{p.name}</p>
                
                <div className="flex gap-1.5 mt-2 items-center">
                  {p.colors.map((c,i) => (
                    <div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ background: c }}></div>
                  ))}
                  <p className="text-[12px] text-black/50 ml-1.5">{p.colors.length} Colors</p>
                </div>

                <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> 
                    <p className="text-[12px] font-medium">{p.rating}</p>
                </div>
              </div>
              <p className="text-[16px] font-bold">${p.price}</p>
            </div>

          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center py-20 text-black/40">No products found</p>
      )}
    </div>
  )
}