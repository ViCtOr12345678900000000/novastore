# NOVA STORE - MASTER FINAL COMBINED GUIDE
## Your Exact Building Order + Modal + Color Variants + Fullscreen Preview
### Navbar UI → Search → Sidebar → MidPanel → MidBar → ProductGrid Fav+Zoom → Navbar Cart → ProductGrid AddToCart → ProductModal Overlay with Grid Inside → Color Circles Clickable → Image Fullscreen → Footer

This is ONE guide that combines your exact 9-step order + our last WhatsApp modal/variant session.

---

# STEP 1: NAVBAR JUST UI - NO FUNCTIONALITY

UI only, no state.

```jsx
import { Search, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative">
      <div className="flex items-center gap-2">
        <div className="flex w-10 h-10 bg-black rounded-full text-white font-bold justify-center items-center text-[18px]">N</div>
        <p className="text-black text-[20px] font-bold tracking-tight">NOVA</p>
        <button className="md:hidden w-9 h-9 rounded-full bg-black text-white flex items-center justify-center ml-2">☰</button>
        <div className="pl-8 hidden md:flex gap-4 text-[14px] font-medium">
          <button className="uppercase">Shop</button>
          <button className="uppercase">New</button>
          <button className="uppercase flex items-center gap-1">sale <span className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        </div>
      </div>
      <div className="hidden md:flex gap-4 w-full max-w-sm items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input placeholder="Search products, categories..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm bg-white" />
        </div>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-10 h-10 bg-orange-200/70 border rounded-full text-[14px] text-white font-bold justify-center items-center">VC</div>
      </div>
      <div className="flex md:hidden items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-9 h-9 bg-orange-200/70 border rounded-full text-[12px] text-white font-bold justify-center items-center">VC</div>
      </div>
    </div>
  )
}
```
App.jsx: `<Navbar />` only. Run dev, see navbar.

---

# STEP 2: SEARCH FUNCTION - NO CARTING YET

**data.js** create src/data.js with 22 products (your array with detail filled).

**App.jsx lift search:**

```jsx
import { useState, useEffect } from "react"
import { products as allProducts } from "./data"
import Navbar from "./components/Navbar"
import ProductGrid from "./components/ProductGrid"

export default function App(){
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    let result = [...allProducts]
    if(search.trim() !== ""){
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredProducts(result)
  }, [search])

  return (
    <div className="bg-[#FFFEFB] min-h-screen">
      <Navbar search={search} setSearch={setSearch} />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
```

**Navbar update search props:**

```jsx
import { useState } from "react"
import { Search, ShoppingCart } from "lucide-react"

export default function Navbar({ search, setSearch }) {
  const [showSearch, setShowSearch] = useState(false)
  return (
    <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative z-50">
      {/* left same */}
      <div className="hidden md:flex gap-4 w-full max-w-sm items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, categories..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white" />
        </div>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-10 h-10 bg-orange-200/70 border rounded-full text-[14px] text-white font-bold justify-center items-center">VC</div>
      </div>
      <div className="flex md:hidden items-center gap-3">
        <button onClick={() => setShowSearch(!showSearch)} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-9 h-9 bg-orange-200/70 border rounded-full text-[12px] text-white font-bold justify-center items-center">VC</div>
      </div>
      {showSearch && (
        <div className="md:hidden absolute top-full left-0 w-full p-4 bg-[#FFFEFB] border-b border-black/10 z-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white" />
          </div>
        </div>
      )}
    </div>
  )
}
```

Test: type "tee" filters.

---

# STEP 3: SIDEBAR + SCROLL

Add showSidebar + scrollToGrid:

App.jsx:

```jsx
import { useState, useEffect, useRef } from "react"
import { products as allProducts } from "./data"
import Navbar from "./components/Navbar"
import ProductGrid from "./components/ProductGrid"

export default function App(){
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const gridRef = useRef(null)

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    let result = [...allProducts]
    if(search.trim() !== "") result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    setFilteredProducts(result)
  }, [search])

  return (
    <div className="bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} />
      <div ref={gridRef}><ProductGrid products={filteredProducts} /></div>
    </div>
  )
}
```

Navbar full sidebar code from your guide (showSidebar state, overlay `fixed inset-0 bg-black/20 backdrop-blur-[2px]`, drawer `fixed left-0 top-0 w-[280px] translate-x-0 vs -translate-x-full`, X close, Shop buttons `setShowSidebar(false); scrollToGrid()`).

Scroll explained:
- `useRef(null)` box, `ref={gridRef}` attaches DOM, `scrollIntoView({behavior:"smooth"})` scrolls.
- Parent holds ref because Navbar and Grid are siblings.

---

# STEP 4: MIDPANEL HERO

Create MidPanel.jsx with Shop Now buttons calling scrollToGrid. App adds `<MidPanel scrollToGrid={scrollToGrid} />`.

---

# STEP 5: MIDBAR FILTER/SORT/SEARCH REFLECT

Create MidBar.jsx (categories ["ALL","APPAREL","FOOTWEAR","ACCESSORIES","BEAUTY","FAVORITE"], sorts ["Featured","Price: Low-High","Price: High-Low","Recent"], sticky glass `backdropFilter blur 30px`).

App holds:

```jsx
const [activeCategory, setActiveCategory] = useState("ALL")
const [sortBy, setSortBy] = useState("Featured")
const [favorites, setFavorites] = useState([])
const [filteredProducts, setFilteredProducts] = useState(allProducts)

useEffect(() => {
  let result = [...allProducts]
  if(search.trim() !== "") result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  if(activeCategory === "FAVORITE") result = result.filter(p => favorites.includes(p.id))
  else if(activeCategory !== "ALL") result = result.filter(p => p.category === activeCategory)
  if(sortBy === "Price: Low-High") result.sort((a,b) => a.price - b.price)
  if(sortBy === "Price: High-Low") result.sort((a,b) => b.price - a.price)
  if(sortBy === "Recent") result.sort((a,b) => b.id - a.id)
  setFilteredProducts(result)
}, [activeCategory, sortBy, search, favorites])
```

MidBar receives `activeCategory, setActiveCategory, sortBy, setSortBy, favorites`.

---

# STEP 6: PRODUCTGRID FAV + ZOOM

App:

```jsx
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("nova_favorites")
  return saved ? JSON.parse(saved) : []
})
useEffect(() => { localStorage.setItem("nova_favorites", JSON.stringify(favorites)) }, [favorites])

const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
```

ProductGrid:

```jsx
import { Heart, Star } from "lucide-react"

export default function ProductGrid({ products, favorites = [], toggleFav, onProductClick }){
  return(
    <div className="w-full p-4 bg-[#FFFEFB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => {
          const isFav = favorites.includes(p.id)
          return (
            <div key={p.id} onClick={() => onProductClick?.(p)} className="rounded-[24px] overflow-hidden border border-black/5 bg-white group cursor-pointer">
              <div className="relative h-[420px] lg:h-[590px] flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{p.category}</span>
                  {p.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${p.tagColor}`}>{p.tag}</span>}
                </div>
                <button onClick={(e)=> { e.stopPropagation(); toggleFav(p.id)}} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center z-10 hover:scale-110 transition">
                  <Heart className={`w-3.5 h-3.5 transition ${isFav ? "fill-red-500 text-red-500" : "text-black/60"}`}/> 
                </button>
              </div>
              <div className="flex justify-between items-end p-4 px-5 bg-white">
                <div>
                  <p className="text-[16px] font-thin tracking-wide font-['Inter']">{p.name}</p>
                  <div className="flex gap-1.5 mt-2 items-center">
                    {p.colors.map((c,i) => (<div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ background: c }}></div>))}
                    <p className="text-[12px] text-black/50 ml-1.5">{p.colors.length} Colors</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5"><Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /><p className="text-[12px] font-medium">{p.rating}</p></div>
                </div>
                <p className="text-[26px] font-light font-['Inter']">${p.price}</p>
              </div>
            </div>
          )
        })}
      </div>
      {products.length === 0 && (<p className="text-center py-20 text-black/40 font-['Inter'] text-[26px] tracking-widest">No products found</p>)}
    </div>
  )
}
```

Breakdown:
- `group` + `group-hover:scale-105` zoom
- `favorites.includes(p.id)` check
- `toggleFav` filter vs spread
- `onProductClick?.(p)` for modal (added now but will use in STEP 9)
- `e.stopPropagation()` prevents card click when heart clicked
- Colors mapped to dots `style={{background:c}}`

---

# STEP 7: NAVBAR CART FUNCTIONALITY

App:

```jsx
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("nova_cart")
  return saved ? JSON.parse(saved) : []
})
useEffect(() => { localStorage.setItem("nova_cart", JSON.stringify(cart)) }, [cart])

const addToCart = (product) => {
  setCart(prev => {
    const ex = prev.find(p => p.id === product.id)
    if(ex) return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
    return [...prev, {...product, qty: 1}]
  })
}
```

Navbar full final with cart drawer (your code from guide Step 7). Key:
- `showCart` state
- `cartCount = cart.reduce((a,b)=>a+b.qty,0)` badge
- `cartTotal = cart.reduce((a,b)=>a+b.price*b.qty,0)`
- `removeFromCart filter`, `incQty map qty+1`, `decQty map Math.max(1, qty-1)`
- Overlay `fixed inset-0 bg-black/20 backdrop-blur-sm`, drawer `fixed right-0 top-0 w-[400px] translate-x-0 vs translate-x-full`
- Empty state vs filled map

---

# STEP 8: PRODUCTGRID ADD TO CART HOVER

Update ProductGrid to add hover ADD TO CART:

```jsx
import { Heart, Star, ShoppingBag } from "lucide-react"

export default function ProductGrid({ products, favorites = [], toggleFav, addToCart, onProductClick }){
  return(
    <div className="w-full p-4 bg-[#FFFEFB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => {
          const isFav = favorites.includes(p.id)
          return (
            <div key={p.id} onClick={() => onProductClick?.(p)} className="rounded-[24px] overflow-hidden border border-black/5 bg-white group cursor-pointer">
              <div className="relative h-[420px] lg:h-[590px] flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{p.category}</span>
                  {p.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${p.tagColor}`}>{p.tag}</span>}
                </div>
                <button onClick={(e)=> { e.stopPropagation(); toggleFav(p.id)}} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center z-10">
                 <Heart className={`w-3.5 h-3.5 transition ${isFav ? "fill-red-500 text-red-500" : "text-red-500"}`}/> 
                </button>
                <div className="absolute lg:bg-black/20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 flex items-center rounded-full mt-45 justify-center z-20">
                  <button onClick={(e) => { e.stopPropagation(); addToCart(p);}} className="bg-white text-black text-[11px] font-['Inter'] tracking-widest font-bold px-6 py-3 rounded-full shadow-xl translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 hover:bg-orange-200/30 hover:text-white">
                    <ShoppingBag className="w-3.5 h-3.5 " /> ADD TO CART
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-end p-4 px-5 bg-white">
                <div>
                  <p className="text-[16px] font-thin tracking-wide font-['Inter']">{p.name}</p>
                  <div className="flex gap-1.5 mt-2 items-center">
                    {p.colors.map((c,i) => (<div key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ background: c }}></div>))}
                    <p className="text-[12px] text-black/50 ml-1.5">{p.colors.length} Colors</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5"><Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /><p className="text-[12px] font-medium">{p.rating}</p></div>
                </div>
                <p className="text-[26px] font-light font-['Inter']">${p.price}</p>
              </div>
            </div>
          )
        })}
      </div>
      {products.length === 0 && (<p className="text-center py-20 text-black/40 font-['Inter'] text-[26px] tracking-widest">No products found</p>)}
    </div>
  )
}
```

`addToCart` upsert: find existing, if found map qty+1 else spread qty1.
Hover: `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` mobile always show, desktop hover show.

---

# STEP 9: PRODUCT MODAL - OVERLAY BUT GRID INSIDE (YOUR REQUEST)

**This is the WhatsApp session part.**

**Parent state like navbar/cartDrawer:**

In App.jsx:

```jsx
const [selectedProduct, setSelectedProduct] = useState(null)
const handleProductClick = (product) => setSelectedProduct(product)
const closeModal = () => setSelectedProduct(null)
```

Pass to ProductGrid: `<ProductGrid onProductClick={handleProductClick} ... />`

**Bug fix you had:**

```js
import ProductModal from "./components/ProductGrid" // WRONG caused grid disappear
import ProductModal from "./components/ProductModal" // FIXED
```

And ensure ProductGrid destructures `onProductClick`:

```jsx
export default function ProductGrid({ products, favorites, toggleFav, addToCart, onProductClick }) // must include onProductClick
```

**Create ProductModal.jsx - Overlay with GRID inside:**

```jsx
import { X, Heart, Star, ShoppingBag } from "lucide-react"

export default function ProductModal({ product, onClose, addToCart, favorites, toggleFav }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[900px] max-h-[90vh] bg-white rounded-[24px] overflow-hidden overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition">
          <X className="w-4 h-4" />
        </button>
        {/* GRID: 1 col mobile vertical, 2 cols md/lg horizontal - YOUR REQUEST */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[380px] md:h-[600px] w-full relative" style={{ background: product.bg }}>
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{product.category}</span>
              {product.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${product.tagColor}`}>{product.tag}</span>}
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between bg-white">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-black/40 font-['Inter']">{product.category}</p>
              <h2 className="text-[28px] md:text-[32px] font-light font-['Inter'] mt-2 leading-tight">{product.name}</h2>
              <div className="flex items-center gap-2 mt-3">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="text-[13px] font-medium">{product.rating}</span>
                <span className="text-black/20">•</span>
                <span className="text-[13px] text-black/50">{product.colors.length} Colors</span>
              </div>
              <p className="text-[14px] text-black/60 leading-relaxed font-['Inter'] mt-6">{product.detail}</p>
              <div className="mt-6">
                <p className="text-[11px] tracking-widest text-black/40 mb-3">COLORS</p>
                <div className="flex gap-2">
                  {product.colors.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-black/10" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[32px] font-light font-['Inter']">${product.price}</p>
                <button onClick={() => toggleFav(product.id)} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                  <Heart className={`w-5 h-5 ${favorites?.includes(product.id) ? "fill-red-500 text-red-500" : "text-black/40"}`} />
                </button>
              </div>
              <button onClick={() => { addToCart(product); onClose() }} className="w-full bg-black text-white text-[12px] tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black/80 transition">
                <ShoppingBag className="w-4 h-4" /> ADD TO CART — ${product.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**First timer:**
- `if (!product) return null` = closed when null
- `fixed inset-0 z-[100]` full overlay above navbar z-50 cart z-70
- Backdrop `absolute inset-0 bg-black/40 backdrop-blur-sm onClick={onClose}` closes
- Modal container `max-w-[900px] max-h-[90vh] rounded-[24px] overflow-hidden overflow-y-auto`
- Inside `grid grid-cols-1 md:grid-cols-2` = 1 col mobile vertical, 2 cols md/lg horizontal (your exact request)
- `p-4` outer padding so not edge-to-edge

In App.jsx final:

```jsx
<ProductGrid ... onProductClick={handleProductClick} />
<ProductModal product={selectedProduct} onClose={closeModal} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />
```

Flow: Click card → onProductClick(p) → setSelectedProduct(p) → modal product != null → shows → X/backdrop → set null → hides.

---

# STEP 10: MAKE COLOR CIRCLES CLICKABLE → IMAGE CHANGES (NEXT THING)

**Your next request:** "make those circle colors clickable so pictures will change maybe say that hoodie had two colors yes once you click the other one the hoodie on the person would change to white"

We need variants.

**Data structure you have:**

```js
colors: ["#000","#7A5A3A"], image: "/assets/Hoodie.jpg"
```

**We keep same data, generate variant images named -0, -1, -2:**

- oversizedTee-0.jpg black #000
- oversizedTee-1.jpg beige #EDE7DC
- oversizedTee-2.jpg white #FFF

**Final ProductModal.jsx with variant switching + fullscreen:**

```jsx
import { X, Heart, Star, ShoppingBag, Expand } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProductModal({ product, onClose, addToCart, favorites, toggleFav }) {
  if (!product) return null

  const [selectedColor, setSelectedColor] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  useEffect(() => { setSelectedColor(0); setShowFullscreen(false) }, [product])

  const isFav = favorites?.includes(product.id)

  const baseImage = product.image.replace('.jpg','').replace('.png','')
  const variantImage = `${baseImage}-${selectedColor}.jpg`

  const colorNames = {
    "#000": "Black", "#FFF": "White", "#EDE7DC": "Beige", "#D9CCB8": "Taupe", 
    "#C19A6B": "Tan", "#D9A679": "Camel", "#F5EDE8": "Off-White", "#E8C4C4": "Blush",
    "#B03060": "Berry", "#111": "Charcoal", "#7A5A3A": "Brown", "#8CA6C8": "Blue", 
    "#E8E8E8": "Grey", "#E8D0B0": "Cream"
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-[900px] max-h-[90vh] bg-white rounded-[24px] overflow-hidden overflow-y-auto shadow-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition">
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image - clickable for fullscreen */}
            <div className="h-[380px] md:h-[600px] w-full relative group/image" style={{ background: product.bg }}>
              <img 
                src={variantImage} 
                alt={product.name} 
                onClick={() => setShowFullscreen(true)}
                onError={(e) => e.target.src = product.image}
                className="w-full h-full object-cover cursor-zoom-in"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{product.category}</span>
                {product.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${product.tagColor}`}>{product.tag}</span>}
              </div>
              <button onClick={() => setShowFullscreen(true)} className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-black/10 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition">
                <Expand className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-black/40 font-['Inter']">{product.category}</p>
                <h2 className="text-[28px] md:text-[32px] font-light font-['Inter'] mt-2 leading-tight">{product.name}</h2>
                <div className="flex items-center gap-2 mt-3">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span className="text-[13px] font-medium">{product.rating}</span>
                  <span className="text-black/20">•</span>
                  <span className="text-[13px] text-black/50">{product.colors.length} Colors</span>
                </div>
                <p className="text-[14px] text-black/60 leading-relaxed font-['Inter'] mt-6">{product.detail}</p>

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
                  <p className="text-[32px] font-light font-['Inter']">${product.price}</p>
                  <button onClick={() => toggleFav(product.id)} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                    <Heart className={`w-5 h-5 ${favorites?.includes(product.id) ? "fill-red-500 text-red-500" : "text-black/40"}`} />
                  </button>
                </div>
                <button onClick={() => { addToCart({...product, selectedColor: product.colors[selectedColor], image: variantImage}); onClose() }} className="w-full bg-black text-white text-[12px] tracking-widest font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black/80 transition">
                  <ShoppingBag className="w-4 h-4" /> ADD TO CART — ${product.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN PREVIEW - tap image */}
      {showFullscreen && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-4">
          <button onClick={() => setShowFullscreen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition">
            <X className="w-5 h-5" />
          </button>
          <img src={variantImage} alt={product.name} onError={(e) => e.target.src = product.image} className="max-w-full max-h-full object-contain rounded-2xl" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full border border-white/10">
            {product.colors.map((c,i) => (
              <button key={i} onClick={() => setSelectedColor(i)} className={`w-8 h-8 rounded-full border-2 ${selectedColor===i ? 'border-white scale-110' : 'border-white/30'}`} style={{background:c}} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
```

**First timer deep explanation:**

1. **selectedColor index not hex:**
```js
const [selectedColor, setSelectedColor] = useState(0)
// 0 = first color, 1 = second, 2 = third
// For Oversized Tee ["#000","#EDE7DC","#FFF"], 0 black, 1 beige, 2 white
// Why index? Easy filename -0.jpg -1.jpg -2.jpg
```

2. **useEffect reset:**
```js
useEffect(() => { setSelectedColor(0); setShowFullscreen(false) }, [product])
// When product changes (click different product), reset to first color and close fullscreen
// Without this, hoodie white index 1 → open tee would start at index 1 beige not black
```

3. **Variant image path:**
```js
const baseImage = product.image.replace('.jpg','') // "/assets/oversizedTee.jpg" -> "/assets/oversizedTee"
const variantImage = `${baseImage}-${selectedColor}.jpg` // "/assets/oversizedTee" + "-" + 0 + ".jpg" = "/assets/oversizedTee-0.jpg"
// Template literal ${} in backticks
// Save files as oversizedTee-0.jpg, -1.jpg, -2.jpg
```

4. **onError fallback:**
```jsx
<img src={variantImage} onError={(e) => e.target.src = product.image} />
// If -0.jpg doesn't exist (not generated yet), fallback to original image, no white screen crash
```

5. **Clickable dots:**
```jsx
{product.colors.map((c,i) => (
  <button onClick={() => setSelectedColor(i)} style={{background:c}} className={`${selectedColor===i ? 'border-black scale-110' : 'border-black/10'}`} />
))}
// c hex, i index
// onClick set index
// selectedColor===i ? black border scale bigger = active
```

6. **Color name:**
```js
colorNames["#000"] = "Black", shows COLORS — Black
```

7. **Cart with variant:**
```jsx
addToCart({...product, selectedColor: product.colors[selectedColor], image: variantImage})
// Spread copy product but override selectedColor hex and image variantImage
// So cart shows white hoodie image if white selected
```

8. **Fullscreen preview:**
```js
const [showFullscreen, setShowFullscreen] = useState(false)
// Tap image sets true, overlay z-[200] above modal z-[100] black bg
// Click image in modal: onClick={() => setShowFullscreen(true)} cursor-zoom-in
// Fullscreen overlay fixed inset-0 z-[200] bg-black, max-w-full max-h-full object-contain
// X closes, dots in fullscreen also clickable to change color while fullscreen open
```

**Generating variant images:**
You send me base image /assets/oversizedTee.jpg + colors array, I generate same pose/lighting only color changed, save as -0, -1, -2. For 22 products x average 2.5 colors = ~55 images. We finished #9 Sculpt Hair Clip, #10 Linen Crop, #11 Shea Balm, #17 Pearl Hoops, #18 Gloss Serum, #19 Denim Jacket, #22 Sling Bag + Hoodie in last chat.

---

# STEP 11: FOOTER - FINALLY

Footer.jsx simple UI from your guide, newsletter + Shop + Info links, bg [#FFFEFB] border-t.

App adds `<Footer scrollToGrid={scrollToGrid} />` at bottom.

---

# FINAL APP.JSX MASTER - ALL TOGETHER WITH MODAL + VARIANTS + FULLSCREEN

```jsx
import { useState, useEffect, useRef } from "react"
import { products as allProducts } from "./data"
import MidBar from "./components/MidBar"
import ProductGrid from "./components/ProductGrid"
import Navbar from "./components/Navbar"
import MidPanel from "./components/MidPanel"
import ProductModal from "./components/ProductModal"
import Footer from "./components/Footer"

export default function App(){
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState("Featured")
  const [search, setSearch] = useState("")
  const gridRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductClick = (product) => setSelectedProduct(product)
  const closeModal = () => setSelectedProduct(null)

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("nova_cart")
    return saved ? JSON.parse(saved) : []
  })
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("nova_favorites")
    return saved ? JSON.parse(saved) : []
  })
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => { localStorage.setItem("nova_cart", JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem("nova_favorites", JSON.stringify(favorites)) }, [favorites])

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === product.id)
      if(ex) return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
      return [...prev, {...product, qty: 1}]
    })
  }

  const scrollToGrid = () => gridRef.current?.scrollIntoView({behavior: "smooth"})

  useEffect(() => {
    let result = [...allProducts]
    if(search.trim() !== "") result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    if(activeCategory === "FAVORITE") result = result.filter(p => favorites.includes(p.id))
    else if(activeCategory !== "ALL") result = result.filter(p => p.category === activeCategory)
    if(sortBy === "Price: Low-High") result.sort((a,b) => a.price - b.price)
    if(sortBy === "Price: High-Low") result.sort((a,b) => b.price - a.price)
    if(sortBy === "Recent") result.sort((a,b) => b.id - a.id)
    setFilteredProducts(result)
  }, [activeCategory, sortBy, search, favorites])

  const toggleFav = (id)=> setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])

  return (
    <div className="w-full bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <MidBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} favorites={favorites} />
      <div ref={gridRef} className="mt-6">
        <ProductGrid products={filteredProducts} onProductClick={handleProductClick} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} />
      </div>
      <ProductModal product={selectedProduct} onClose={closeModal} addToCart={addToCart} favorites={favorites} toggleFav={toggleFav} />
      <Footer scrollToGrid={scrollToGrid} />
    </div>
  )
}
```

**Key localStorage explanation:**
```js
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("nova_cart") // string or null
  return saved ? JSON.parse(saved) : [] // parse string to array or empty
})
// () => {} inside useState = lazy initializer runs only once first render
// JSON.parse = string -> array, JSON.stringify = array -> string because localStorage only stores strings
// useEffect saves on cart change
```

---

# REBUILD PRACTICE ORDER - MASTER

Follow this exact order you built, now with new features:

1. **Navbar UI only** - logo, links, search input UI, cart icon hardcoded 3
2. **Search** - data.js 22 products, App search state, useEffect filter name/category lower includes, Navbar controlled input value/onChange, mobile search dropdown showSearch
3. **Sidebar + Scroll** - showSidebar state, overlay fixed inset-0 backdrop-blur, drawer fixed left w-[280px] translate-x-0 vs -translate-x-full transition, X close, gridRef useRef + scrollIntoView smooth, Shop buttons scroll
4. **MidPanel** - hero text, Shop Now buttons scrollToGrid prop
5. **MidBar** - categories, sorts, activeCategory setActiveCategory black vs white, favorites count, sort font-semibold, sticky glass blur, App useEffect 3 steps search + category/FAVORITE + sort, deps [activeCategory, sortBy, search, favorites]
6. **ProductGrid Fav + Zoom** - favorites state function initializer localStorage, toggleFav includes ? filter : spread, group + group-hover:scale-105 zoom overflow-hidden rounded, Heart fill-red if isFav, colors map dots, stopPropagation, onProductClick prop added for modal
7. **Navbar Cart** - cart state initializer localStorage, addToCart upsert find + map qty+1 vs spread qty1, cartCount reduce qty sum, cartTotal reduce price*qty sum, showCart state, cart overlay + right drawer w-[400px] translate-x-0 vs translate-x-full, removeFromCart filter, inc/dec map, empty vs filled ternary
8. **ProductGrid Add to Cart Hover** - overlay absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100, button translate-y-2 group-hover:translate-y-0, stopPropagation + addToCart, mobile opacity-100 lg:opacity-0
9. **ProductModal Overlay with Grid Inside** - selectedProduct null vs object pattern like cartDrawer boolean but object truthy, handleProductClick set product open, closeModal set null close, if !product return null early, fixed inset-0 z-[100] overlay, backdrop blur onClick close, container max-w-[900px] max-h-[90vh] rounded, grid grid-cols-1 md:grid-cols-2 = vertical mobile horizontal desktop (your exact request), p-4 outer padding
10. **Color Circles Clickable** - selectedColor useState(0) index, useEffect reset [product], baseImage replace('.jpg','') + variantImage `${baseImage}-${selectedColor}.jpg`, onError fallback to product.image, map dots button onClick setSelectedColor(i), border-black scale-110 selected, colorNames map COLORS — Black, addToCart spread override image variantImage
11. **Image Fullscreen Preview** - showFullscreen useState(false), image onClick set true cursor-zoom-in, second overlay fixed inset-0 z-[200] bg-black, max-w-full max-h object-contain, X close, dots in fullscreen also clickable, group/image hover Expand button
12. **Footer** - newsletter, Shop, Info, final

**Bug fixes to remember:**
- `import ProductModal from "./components/ProductModal"` not ProductGrid (grid disappear)
- `ProductGrid({ products, favorites, toggleFav, addToCart, onProductClick })` destructuring must include onProductClick
- `className={`px-3 ... ${p.tagColor}`}` backticks required
- `onProductClick?.(p)` optional chaining safe
- `e.stopPropagation()` on heart and add to cart prevents card click
- `opacity-100 lg:opacity-0 lg:group-hover:opacity-100` mobile show cart button always

**Patterns:**
- `map/filter/find/reduce` must know
- `useState` lazy `() => { getItem + JSON.parse }`
- `useEffect` for save `setItem + JSON.stringify` + filter logic with deps including favorites
- `useRef` for scroll
- `fixed inset-0` overlay, `translate-x-0 vs -translate-x-full / translate-x-full` drawer slide
- `if (!product) return null` modal closed
- `grid-cols-1 md:grid-cols-2` responsive vertical to horizontal inside modal (your request)
- `group` + `group-hover:` zoom and button
- `...product` spread override
- `selectedColor index` + `variantImage template`

If you can rebuild from memory in this order, you have mastered NOVA full flow.

---

# NEXT STEPS YOU MENTIONED

- make those circle colors clickable → DONE in Step 10
- tap the image to preview a full screen display → DONE in Step 10 fullscreen overlay

Want to add localStorage for cart/favorites already done, next could be body scroll lock when modal open (`useEffect` document.body.style.overflow = product ? "hidden" : "auto").
