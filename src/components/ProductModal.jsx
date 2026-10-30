import { X, Heart, Star, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProductModal({ product, onClose, addToCart, favorites, toggleFav }) {
  if (!product) return null
  const [selectedColor, setSelectedColor] = useState(0)
  
  useEffect(() => { setSelectedColor(0) }, [product])

  const isFav = favorites?.includes(product.id)

  // Build variant image path: /assets/oversizedTee.jpg -> /assets/oversizedTee-0.jpg, -1.jpg etc
  // You will have: oversizedTee-0.jpg (black #000), oversizedTee-1.jpg (beige), oversizedTee-2.jpg (white)
  const baseImage = product.image.replace('.jpg','')
  const variantImage = `${baseImage}-${selectedColor}.jpg`
  
  const colorNames = {
    "#000": "Black", "#FFF": "White", "#EDE7DC": "Beige", "#D9CCB8": "Taupe", 
    "#C19A6B": "Tan", "#D9A679": "Camel", "#F5EDE8": "Off-White", "#E8C4C4": "Blush",
    "#B03060": "Berry", "#111": "Charcoal", "#7A5A3A": "Brown", "#8CA6C8": "Blue", 
    "#E8E8E8": "Grey", "#E8D0B0": "Cream"
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full lg:max-w-[1090px] max-h-[90vh] lg:max-h-[80vh] bg-[#FFFEFB] rounded-t-[32px] lg:rounded-[32px] overflow-hidden flex flex-col lg:flex-row animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
        <div className="w-full lg:w-[65%] h-[480px] lg:h-[600px] relative flex-shrink-0" style={{ background: product.bg }}>
          <img src={variantImage} alt={product.name} className="w-full h-full object-cover" 
               onError={(e) => e.target.src = product.image} />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{product.category}</span>
            {product.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${product.tagColor}`}>{product.tag}</span>}
          </div>
        </div>
        <div className="w-full lg:w-[45%] p-6 lg:p-8 flex flex-col overflow-y-auto bg-white">
          <div className="flex-1">
            <p className="text-[11px] tracking-[0.2em] text-black/40 mb-2">{product.category}</p>
            <h2 className="text-[28px] lg:text-[39px] font-light leading-tight">{product.name}</h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-[13px] font-medium">{product.rating}</span>
              </div>
              <span className="text-black/20">•</span>
              <span className="text-[13px] text-black/50">{product.colors.length} Colors</span>
            </div>
            <p className="text-[14px] leading-relaxed text-black/60 mt-6">{product.detail}</p>
            <div className="mt-6">
              <p className="text-[11px] tracking-widest text-black/40 mb-3">COLORS — {colorNames[product.colors[selectedColor]] || product.colors[selectedColor]}</p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)}
                    className={`w-9 h-9 rounded-full border-2 cursor-pointer hover:scale-110 transition flex items-center justify-center ${selectedColor === i ? 'border-black scale-110' : 'border-black/10'}`}
                    style={{ background: c }}>
                    {selectedColor === i && <div className="w-2 h-2 rounded-full bg-black/20" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-black/5">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[32px] font-light">${product.price}</p>
              <button onClick={(e) => { e.stopPropagation(); toggleFav(product.id) }} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition">
                <Heart className={`w-5 h-5 ${isFav ? "fill-red-500 text-red-500" : "text-black/40"}`} />
              </button>
            </div>
            <button onClick={() => { addToCart({...product, selectedColor: product.colors[selectedColor], image: variantImage}); onClose() }} className="w-full bg-black text-white text-[12px] tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black/80 transition">
              <ShoppingBag className="w-4 h-4" /> ADD TO CART — ${product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}