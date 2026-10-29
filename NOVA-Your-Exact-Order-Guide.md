# NOVA STORE - YOUR EXACT BUILDING ORDER GUIDE
## Follow How YOU Built It: Navbar UI → Search → Sidebar → MidPanel → MidBar Filter/Sort/Search → ProductGrid Fav + Zoom → Navbar Cart → ProductGrid Add to Cart → Footer

This is YOUR process, step by step. No jumping.

---

## STEP 1: NAVBAR JUST UI - NO FUNCTIONALITY YET

**What you did first:** Just the look, no state, no search working, no cart, no sidebar logic.

**Goal:** Get the top bar looking right.

**Create `src/components/Navbar.jsx` - UI ONLY:**

```jsx
import { Search, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative">
      
      {/* LEFT: LOGO + LINKS (static, no onClick yet) */}
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

      {/* RIGHT: DESKTOP SEARCH (UI only, no value/onChange) */}
      <div className="hidden md:flex gap-4 w-full max-w-sm items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input placeholder="Search products, categories..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm bg-white" />
        </div>
        <button className="relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span>
        </button>
        <div className="flex w-10 h-10 bg-orange-200/70 border rounded-full text-[14px] text-white font-bold justify-center items-center">VC</div>
      </div>

      {/* MOBILE RIGHT: icons only UI */}
      <div className="flex md:hidden items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-9 h-9 bg-orange-200/70 border rounded-full text-[12px] text-white font-bold justify-center items-center">VC</div>
      </div>
    </div>
  )
}
```

**For beginner:**
- This is just UI, no `useState`, no `onClick` working yet.
- `p-6 flex justify-between` = padding 6, flex row, space between left and right.
- `hidden md:flex` = hidden on mobile, flex on desktop (responsive).
- `relative` on search wrapper + `absolute left-3 top-1/2 -translate-y-1/2` on Search icon = icon inside input.
- Cart count `3` hardcoded for now, not dynamic.
- No functionality, just looks like NOVA.

**In App.jsx at this stage:**
```jsx
import Navbar from "./components/Navbar"

export default function App(){
  return <div className="bg-[#FFFEFB]"><Navbar /></div>
}
```

Run `npm run dev` - you should see only navbar UI.

---

## STEP 2: SEARCH FUNCTION - NO CARTING YET

**What you did next:** Made search work, but still no cart.

**Why search before sidebar?** Because search is in Navbar and you wanted to make Navbar interactive first.

**Step 2a: Create data.js**

Create `src/components/data.js` with 12 products (from previous guide, copy same).

**Step 2b: Lift search state to App.jsx**

App.jsx is parent, holds search so it can filter ProductGrid later.

```jsx
// App.jsx - Add search state
import { useState, useEffect } from "react"
import { products } from "./components/data"
import Navbar from "./components/Navbar"
import ProductGrid from "./components/ProductGrid" // temporary, to test search

export default function App(){
  const [search, setSearch] = useState("") // "" empty at start
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Filter when search changes
  useEffect(() => {
    let result = [...products]
    if(search.trim() !== ""){
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
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

**Explain for beginner:**
- `const [search, setSearch] = useState("")` - search state in App, empty string initially.
- `filteredProducts` - working copy that will be displayed, starts as all products.
- `useEffect` with `[search]` dep - when search changes, re-run filter.
- `search.trim() !== ""` - if not empty and not just spaces.
- `toLowerCase().includes()` - case-insensitive: "TEE" matches "tee", "Tee".
- `setFilteredProducts(result)` - update displayed list.

**Step 2c: Update Navbar.jsx to receive search props and make input controlled:**

```jsx
import { useState } from "react"
import { Search, ShoppingCart } from "lucide-react"

export default function Navbar({ search, setSearch }) {
  const [showSearch, setShowSearch] = useState(false) // for mobile search dropdown, UI only for now

  return (
    <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative z-50">
      {/* LEFT same */}

      {/* DESKTOP SEARCH - NOW WORKING */}
      <div className="hidden md:flex gap-4 w-full max-w-sm items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search} // controlled: display App's search
            onChange={(e) => setSearch(e.target.value)} // when type, update App
            placeholder="Search products, categories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
          />
        </div>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-10 h-10 bg-orange-200/70 border rounded-full text-[14px] text-white font-bold justify-center items-center">VC</div>
      </div>

      {/* MOBILE RIGHT */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={() => setShowSearch(!showSearch)} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
        <button className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
        <div className="flex w-9 h-9 bg-orange-200/70 border rounded-full text-[12px] text-white font-bold justify-center items-center">VC</div>
      </div>

      {/* MOBILE SEARCH INPUT - NOW WORKING */}
      {showSearch && (
        <div className="md:hidden absolute top-full left-0 w-full p-4 bg-[#FFFEFB] border-b border-black/10 z-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
            />
          </div>
        </div>
      )}
    </div>
  )
}
```

**What changed from Step 1:**
- Added `useState` for `showSearch` - toggles mobile search dropdown visibility.
- Props `search, setSearch` received from App.
- `value={search}` - input displays App's search value (controlled component).
- `onChange={(e)=>setSearch(e.target.value)}` - when you type, update App's search, triggers useEffect, filters grid.
- Mobile input same value/onChange + `autoFocus` focuses when opened.

**Test:** Type "tee" in Navbar search, ProductGrid should show only Oversized Tee.

**Note:** Cart still hardcoded 3, no functionality yet, as you wanted.

---

## STEP 3: SIDEBAR AND ITS FUNCTION + SCROLL SETUP

**What you did next:** Bring in sidebar and make it work, plus prepare scroll for Shop buttons.

**Why sidebar now?** Sidebar is part of Navbar, so finish Navbar before leaving it.

**Update Navbar.jsx to add sidebar state + scroll:**

```jsx
import { useState } from "react"
import { Search, ShoppingCart, X } from "lucide-react"

export default function Navbar({ scrollToGrid, search, setSearch }) {
  const [showSidebar, setShowSidebar] = useState(false) // NEW: left drawer
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative z-50">
        <div className="flex items-center gap-2">
          <div className="flex w-10 h-10 bg-black rounded-full text-white font-bold justify-center items-center text-[18px]">N</div>
          <p className="text-black text-[20px] font-bold tracking-tight">NOVA</p>
          {/* Hamburger - NOW WORKING */}
          <button className="md:hidden w-9 h-9 rounded-full bg-black text-white flex items-center justify-center ml-2" onClick={() => setShowSidebar(true)}>☰</button>

          <div className="pl-8 hidden md:flex gap-4 text-[14px] font-medium">
            {/* Shop buttons - NOW WITH scrollToGrid */}
            <button onClick={scrollToGrid} className="uppercase hover:opacity-60">Shop</button>
            <button onClick={scrollToGrid} className="uppercase hover:opacity-60">New</button>
            <button onClick={scrollToGrid} className="uppercase flex items-center gap-1 hover:opacity-60">sale <span className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
          </div>
        </div>

        {/* DESKTOP SEARCH same as Step 2 */}
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

      {/* SIDEBAR OVERLAY */}
      <div 
        onClick={() => setShowSidebar(false)} 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>

      {/* SIDEBAR DRAWER */}
      <div className={`fixed left-0 top-0 h-full w-[280px] bg-white z-[70] p-6 flex flex-col justify-between shadow-2xl transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">N</div>
              <p className="font-bold text-sm tracking-tight">NOVA</p>
            </div>
            <button onClick={() => setShowSidebar(false)} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center"><X className="w-4 h-4"/></button>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">Shop</button>
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">New</button>
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">Sale</button>
          </div>
        </div>
        <p className="text-[10px] text-zinc-400 border-t border-black/10 pt-4 leading-relaxed">© 2026 NOVA STORE<br/>Shop designer wears</p>
      </div>
    </>
  )
}
```

**What we added:**
- `showSidebar` state false/true.
- Hamburger button `onClick={() => setShowSidebar(true)}` opens.
- Overlay `fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]` covers screen, dark transparent blur, click closes `setShowSidebar(false)`, `opacity-0 pointer-events-none` when closed = invisible not clickable.
- Drawer `fixed left-0 top-0 h-full w-[280px] bg-white z-[70]` left side, 280px wide, white, above overlay z 70. `translate-x-0` visible at left 0, `-translate-x-full` hidden off-screen left -100%, `transition-transform duration-300 ease-in-out` slide animation.
- Close button X `setShowSidebar(false)`.
- Sidebar Shop buttons `onClick={() => {setShowSidebar(false); scrollToGrid();}}` closes sidebar then scrolls.
- `scrollToGrid` prop from App.

**Update App.jsx to provide scrollToGrid:**

```jsx
import { useState, useEffect, useRef } from "react"
import { products } from "./components/data"
import Navbar from "./components/Navbar"
import ProductGrid from "./components/ProductGrid"

export default function App(){
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const gridRef = useRef(null) // NEW for scroll

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    let result = [...products]
    if(search.trim() !== ""){
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    }
    setFilteredProducts(result)
  }, [search])

  return (
    <div className="bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} />
      <div ref={gridRef}>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
```

**Explain scroll:**
- `useRef(null)` empty box.
- `ref={gridRef}` attaches to div wrapping ProductGrid, React stores DOM element in gridRef.current.
- `gridRef.current?.scrollIntoView({behavior:"smooth"})` browser scrolls to that div smoothly, ?. safe if null.
- Why in App? Shop buttons in Navbar, grid in ProductGrid, siblings can't see each other, only parent App can, so App holds ref and function, passes down as prop.

**Test:** Click hamburger mobile, sidebar slides from left, overlay dark, click overlay or X closes, Shop in sidebar closes and scrolls to grid. Desktop Shop buttons scroll too.

---

## STEP 4: MIDPANEL - HERO BELOW NAVBAR

**Next you built MidPanel, simple hero with Shop Now button that also scrolls.**

Create `src/components/MidPanel.jsx`:

```jsx
export default function MidPanel({ scrollToGrid }) {
  return (
    <div className="w-full bg-[#FFFEFB] px-6 py-10 md:py-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] font-semibold text-black/40 mb-6">SS 2026 COLLECTION</p>
        
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <h1 className="text-[42px] md:text-[72px] lg:text-[88px] leading-[0.85] tracking-[-0.03em] font-serif">
            Curated<br />
            essentials for<br />
            <span className="italic font-light">modern life.</span>
          </h1>
          
          <div className="lg:w-[300px] flex flex-col justify-end gap-6">
            <p className="text-[14px] leading-6 text-black/60">
              NOVA is a Lisbon-based studio focused on timeless apparel, footwear and objects. Crafted to last, designed to stay.
            </p>
            <div className="flex gap-3">
              <button onClick={scrollToGrid} className="bg-black text-white text-[11px] tracking-widest font-bold px-8 py-3.5 rounded-full hover:bg-zinc-800">
                SHOP NOW
              </button>
              <button onClick={scrollToGrid} className="bg-white border border-black/10 text-black text-[11px] tracking-widest font-bold px-8 py-3.5 rounded-full hover:border-black/30">
                NEW IN
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="h-[400px] md:h-[500px] rounded-[24px] overflow-hidden bg-[#F5F0E6]">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" className="w-full h-full object-cover" alt="look 1" />
          </div>
          <div className="h-[400px] md:h-[500px] rounded-[24px] overflow-hidden bg-[#E8E8E8]">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" className="w-full h-full object-cover" alt="look 2" />
          </div>
          <div className="h-[400px] md:h-[500px] rounded-[24px] overflow-hidden bg-[#EDE7DC]">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80" className="w-full h-full object-cover" alt="look 3" />
          </div>
        </div>
      </div>
    </div>
  )
}
```

**In App.jsx add MidPanel:**

```jsx
import MidPanel from "./components/MidPanel"

export default function App(){
  // ... same states ...
  return (
    <div className="bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <div ref={gridRef}>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
```

**For beginner:** Same scrollToGrid prop as Navbar, Shop Now buttons scroll. Simple UI, no state.

---

## STEP 5: MIDBAR - FILTERING, SORTING, AND MAKING SEARCH REFLECT

**Now you go into MidBar - this is where filtering, sorting, and search all combine.**

**Create `src/components/MidBar.jsx` - UI + props, no internal state:**

```jsx
export default function MidBar({ activeCategory, setActiveCategory, sortBy, setSortBy, favorites = [] }){
  const categories = ["ALL","APPAREL","FOOTWEAR","ACCESSORIES","BEAUTY", "FAVORITE"]
  const sorts = ["Featured","Price: Low-High","Price: High-Low","Recent"]

  return (
    <div 
      className="w-full flex flex-wrap items-baseline rounded-full min-w-[250px] p-4 md:p-7 md:pb-3 justify-between sticky top-0 md:top-2 z-40 bg-white/75 border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] mx-auto max-w-[95%] md:max-w-[98%]"
      style={{ backdropFilter: "blur(30px) saturate(180%)", WebkitBackdropFilter: "blur(30px) saturate(180%)" }}
    >
      <div className="flex gap-2 md:gap-3 flex-wrap">
        {categories.map(cat => {
          const isFav = cat === "FAVORITE"
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border h-10 px-4 md:px-5 rounded-full uppercase text-[11px] md:text-[12px] font-medium transition-all ${isActive ? "bg-black text-white border-black shadow-sm" : "bg-white border-black/10 hover:border-black/30 hover:bg-white"}`}
            >
              {cat} {isFav && favorites.length > 0 ? `(${favorites.length})` : ""}
            </button>
          )
        })}
      </div>

      <div className="flex gap-4 md:gap-6 border border-white/80 bg-white/60 p-2 mt-3 md:mt-0 rounded-full h-10 items-center px-4 backdrop-blur-xl shadow-sm">
        {sorts.map(s => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`text-[11px] md:text-[12px] uppercase tracking-wide transition whitespace-nowrap ${sortBy === s ? "font-semibold text-black" : "text-black/40 hover:text-black/70"}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
```

**Update App.jsx to hold filtering + sorting + search + favorites count:**

```jsx
import { useState, useEffect, useRef } from "react"
import { products } from "./components/data"
import Navbar from "./components/Navbar"
import MidPanel from "./components/MidPanel"
import MidBar from "./components/MidBar"
import ProductGrid from "./components/ProductGrid"

export default function App(){
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState("Featured")
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState([]) // for count display, even though fav toggle comes later
  const [filteredProducts, setFilteredProducts] = useState(products)
  const gridRef = useRef(null)

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth" })

  // CORE FILTERING - Search + Category + Sort (favorites included for FAVORITE tab)
  useEffect(() => {
    let result = [...products]

    // 1. SEARCH - what you typed in Navbar
    if(search.trim() !== ""){
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 2. CATEGORY / FAVORITE
    if(activeCategory === "FAVORITE"){
      result = result.filter(p => favorites.includes(p.id))
    } else if(activeCategory !== "ALL"){
      result = result.filter(p => p.category === activeCategory)
    }

    // 3. SORT
    if(sortBy === "Price: Low-High") result.sort((a,b) => a.price - b.price)
    if(sortBy === "Price: High-Low") result.sort((a,b) => b.price - a.price)
    if(sortBy === "Recent") result.sort((a,b) => b.id - a.id)

    setFilteredProducts(result)
  }, [activeCategory, sortBy, search, favorites, products])

  return (
    <div className="w-full bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <MidBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} favorites={favorites} />
      <div ref={gridRef} className="mt-6">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}
```

**For beginner - Breakdown:**

**App holds:**
- `activeCategory` default ALL
- `sortBy` default Featured
- `search` from before
- `favorites` [] for count (even though toggle not built yet, we need array to show count 0)
- `filteredProducts` working copy

**useEffect order:**
1. Search: filter by name/category includes search
2. Category/Favorite: if FAVORITE filter by favorites.includes, else if not ALL filter by category
3. Sort: sort by price low-high, high-low, recent id

**Deps:** `[activeCategory, sortBy, search, favorites]` - when any change, re-filter. Must include favorites so when you later heart, FAVORITE tab updates.

**MidBar props:**
- `activeCategory, setActiveCategory, sortBy, setSortBy, favorites`
- No internal useState, dumb component.

**categories.map:**
- Loop categories, create button per cat.
- `isActive = activeCategory===cat` if active, black bg white text, else white bg.
- `onClick={()=>setActiveCategory(cat)}` calls parent to change activeCategory, triggers useEffect, filters grid.
- `{cat} {isFav && favorites.length>0 ? (favorites.length) : ""}` - if FAVORITE tab and has favorites, show count e.g. FAVORITE (2).

**sorts.map:** same, but styling font-semibold vs text-black/40.

**Glass:** `sticky top-0 md:top-2 z-40 bg-white/75 border border-white/80 shadow` + `backdropFilter blur 30px saturate 180%` iOS frosted.

**Test:** Type "tee" in Navbar, then click APPAREL, should show only apparel that also matches search (search + category combined). Click Price Low-High, cheapest first. Click FAVORITE with 0 favs, No products found.

**Search reflects:** Because search state in App, useEffect includes search, so MidBar filtering includes search result. What you type in search bar reflects in ProductGrid even after category filter.

---

## STEP 6: PRODUCTGRID - FAVORITE TOGGLE + HOVER ZOOM IMAGE

**Now go into ProductGrid, bring in favorite toggle and hover zoom.**

**Update App.jsx to add toggleFav:**

```jsx
// Add inside App, with other states
const [favorites, setFavorites] = useState([])

const toggleFav = (id) => {
  setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
}

// In return
<ProductGrid products={filteredProducts} favorites={favorites} toggleFav={toggleFav} />
```

**Create ProductGrid.jsx full with fav + zoom:**

```jsx
import { Heart, Star } from "lucide-react"

export default function ProductGrid({ products, favorites = [], toggleFav }){

  return(
    <div className="w-full p-4 bg-[#FFFEFB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => {
          const isFav = favorites.includes(p.id)
          return (
            <div key={p.id} className="rounded-[24px] overflow-hidden border border-black/5 bg-white group cursor-pointer">
              
              <div className="relative h-[420px] flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
                {/* ZOOM IMAGE - group-hover:scale-105 */}
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                
                <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{p.category}</span>
                  {p.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${p.tagColor}`}>{p.tag}</span>}
                </div>

                {/* FAVORITE HEART - toggleFav */}
                <button onClick={(e)=> { e.stopPropagation(); toggleFav(p.id)}} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center z-10 hover:scale-110 transition">
                  <Heart className={`w-3.5 h-3.5 transition ${isFav ? "fill-red-500 text-red-500" : "text-black/60"}`}/> 
                </button>
              </div>

              <div className="flex justify-between items-end p-4 px-5 bg-white">
                <div>
                  <p className="text-[16px] font-semibold tracking-tight leading-tight">{p.name}</p>
                  
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
          )
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/40 text-sm">No products found</p>
          <p className="text-black/30 text-xs mt-1">Try different search or category</p>
        </div>
      )}
    </div>
  )
}
```

**For beginner - Fav + Zoom:**

**toggleFav breakdown:**
- `favorites` = [2,5] array of ids.
- `setFavorites(prev => prev.includes(id) ? ... : ...)`
- `prev.includes(id)` check if already favorited.
- If yes: `prev.filter(fId => fId !== id)` keep all where fId !== clicked id = remove.
- If no: `[...prev, id]` spread old + new id = add.
- Example: [] + toggle 2 => [2], [2] + toggle 5 => [2,5], [2,5] + toggle 2 => [5].

**Heart button:**
- `absolute top-3.5 right-3.5` top right.
- `onClick={(e)=>{e.stopPropagation(); toggleFav(p.id)}}` stopPropagation stops bubbling to card (so clicking heart doesn't trigger other card click), then toggleFav with id.
- `isFav = favorites.includes(p.id)` check.
- `Heart className={isFav ? "fill-red-500 text-red-500" : "text-black/60"}` filled red if fav, else outline.
- `hover:scale-110 transition` little pop.

**Hover zoom:**
- Card has `group` class.
- Image has `group-hover:scale-105 transition duration-500` - when parent group hovered, image scales 105% (zoom), smooth 0.5s.
- Parent `overflow-hidden` + `rounded-[24px]` keeps zoom inside rounded corners, not overflow.
- `object-cover` image covers area without stretch.

**Colors + Rating:**
- `p.colors.map((c,i)=><div key={i} style={{background:c}}>)` loop colors, create circle div with hex bg.
- `{p.colors.length} Colors` dynamic count, not hardcoded.
- Star `fill-amber-300` solid, `{p.rating}` dynamic.

**Test:** Heart icon click fills red, click again unfills, MidBar FAVORITE count updates (2), click FAVORITE tab shows only those 2, hover image zooms.

---

## STEP 7: BACK TO NAVBAR - ADD CART FUNCTIONALITY AND CART MODAL

**Now come back to Navbar, add cart functionality and cart modal (right drawer).**

**Update App.jsx to add cart state:**

```jsx
// Add
const [cart, setCart] = useState([]) // [{id, qty, ...product}]

const addToCart = (product) => {
  setCart(prev => {
    const existing = prev.find(p => p.id === product.id)
    if(existing){
      return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
    }
    return [...prev, {...product, qty: 1}]
  })
}

// Pass to Navbar and ProductGrid
<Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />
<ProductGrid products={filteredProducts} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} />
```

**Update Navbar.jsx full with cart drawer (replace previous Navbar with this final Navbar):**

```jsx
import { useState } from "react"
import { Search, ShoppingCart, X } from "lucide-react"

export default function Navbar({ scrollToGrid, search, setSearch, cart = [], setCart }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false) // NEW cart drawer state

  const cartCount = cart.reduce((a, b) => a + b.qty, 0)
  const cartTotal = cart.reduce((a, b) => a + b.price * b.qty, 0)

  const removeFromCart = (id) => setCart(c => c.filter(item => item.id !== id))
  const incQty = (id) => setCart(prev => prev.map(p => p.id === id ? {...p, qty: p.qty+1} : p))
  const decQty = (id) => setCart(prev => prev.map(p => p.id === id ? {...p, qty: Math.max(1, p.qty-1)} : p))

  return (
    <>
      <div className="p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative z-50">
        <div className="flex items-center gap-2">
          <div className="flex w-10 h-10 bg-black rounded-full text-white font-bold justify-center items-center text-[18px]">N</div>
          <p className="text-black text-[20px] font-bold tracking-tight">NOVA</p>
          <button className="md:hidden w-9 h-9 rounded-full bg-black text-white flex items-center justify-center ml-2" onClick={() => setShowSidebar(true)}>☰</button>

          <div className="pl-8 hidden md:flex gap-4 text-[14px] font-medium">
            <button onClick={scrollToGrid} className="uppercase hover:opacity-60">Shop</button>
            <button onClick={scrollToGrid} className="uppercase hover:opacity-60">New</button>
            <button onClick={scrollToGrid} className="uppercase flex items-center gap-1 hover:opacity-60">sale <span className="w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">3</span></button>
          </div>
        </div>

        <div className="hidden md:flex gap-4 w-full max-w-sm items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, categories..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white" />
          </div>
          {/* CART BUTTON - NOW WORKING */}
          <button onClick={() => setShowCart(true)} className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">{cartCount}</span>
          </button>
          <div className="flex w-10 h-10 bg-orange-200/70 border rounded-full text-[14px] text-white font-bold justify-center items-center">VC</div>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setShowSearch(!showSearch)} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
          <button onClick={() => setShowCart(true)} className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">{cartCount}</span>
          </button>
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

      {/* LEFT SIDEBAR */}
      <div onClick={() => setShowSidebar(false)} className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed left-0 top-0 h-full w-[280px] bg-white z-[70] p-6 flex flex-col justify-between shadow-2xl transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">N</div><p className="font-bold text-sm tracking-tight">NOVA</p></div>
            <button onClick={() => setShowSidebar(false)} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center"><X className="w-4 h-4"/></button>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">Shop</button>
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">New</button>
            <button onClick={() => {setShowSidebar(false); scrollToGrid();}} className="text-left px-4 py-3 rounded-full bg-zinc-100 text-[13px] font-medium">Sale</button>
          </div>
        </div>
        <p className="text-[10px] text-zinc-400 border-t border-black/10 pt-4 leading-relaxed">© 2026 NOVA STORE<br/>Shop designer wears</p>
      </div>

      {/* CART OVERLAY */}
      <div onClick={() => setShowCart(false)} className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>

      {/* CART DRAWER RIGHT */}
      <div className={`fixed right-0 top-0 h-full w-[400px] max-w-[90vw] bg-white z-[70] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-5 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-white"/></div>
            <span className="font-medium text-[14px]">Cart — {cartCount} items</span>
          </div>
          <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X className="w-4 h-4"/></button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
            <div className="w-20 h-20 bg-[#F5F1EB] rounded-full flex items-center justify-center mb-5">
              <ShoppingCart className="w-6 h-6 opacity-40"/>
            </div>
            <h2 className="text-[26px] font-serif mb-2 leading-tight">Your cart is empty</h2>
            <p className="text-[13px] text-gray-400 leading-5 mb-8 max-w-[200px]">Add some pieces from the collection. They will appear here.</p>
            <button onClick={() => setShowCart(false)} className="bg-black text-white text-[11px] tracking-widest font-bold px-8 py-3.5 rounded-full hover:bg-zinc-800">START SHOPPING</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-black/5 pb-4">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-xl bg-gray-100" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.category} • ${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decQty(item.id)} className="w-6 h-6 rounded-full border text-xs">-</button>
                      <span className="text-xs w-4 text-center">{item.qty}</span>
                      <button onClick={() => incQty(item.id)} className="w-6 h-6 rounded-full border text-xs">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${item.price * item.qty}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-[11px] text-gray-400 mt-1 hover:text-black">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-black/5 bg-white">
              <div className="flex justify-between font-bold mb-4 text-sm"><span>Subtotal</span><span>${cartTotal}</span></div>
              <button className="w-full bg-black text-white py-3.5 rounded-full text-[12px] font-bold tracking-widest hover:bg-zinc-800">CHECKOUT • ${cartTotal}</button>
              <p className="text-[10px] text-center text-gray-400 mt-3">Shipping calculated at checkout</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
```

**For beginner - Cart breakdown:**

**States:**
- `showCart` false/true - is right drawer open? Click cart icon sets true, overlay/X sets false.

**Derived:**
- `cartCount = cart.reduce((a,b)=>a+b.qty,0)` sum qty for badge.
- `cartTotal = cart.reduce((a,b)=>a+b.price*b.qty,0)` sum price*qty for total.
- Example cart [{price:46 qty:2}, {price:120 qty:1}] => count 3, total 46*2+120=212.

**Functions:**
- `removeFromCart(id)` => `setCart(c=>c.filter(item=>item.id!==id))` DELETE.
- `incQty(id)` => `map` where matching id qty+1 UPDATE.
- `decQty(id)` => `map` where matching id qty Math.max(1, qty-1) so not below 1.

**Cart button:**
- `onClick={()=>setShowCart(true)}` opens drawer.
- Badge `{cartCount}` now dynamic, not hardcoded 3.

**Cart overlay + drawer:**
- Overlay `fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]` dark blur, click closes.
- Drawer `fixed right-0 top-0 h-full w-[400px] bg-white z-[70] flex flex-col shadow-2xl transform transition-transform ${showCart ? "translate-x-0" : "translate-x-full"}` - right side, 400px, slide from right, `translate-x-full` hidden off-screen right, `translate-x-0` visible.

**Empty vs filled:**
- `cart.length===0 ? (empty UI) : (list UI)` ternary.
- Empty: big bag icon circle bg-[#F5F1EB], "Your cart is empty", description, START SHOPPING button closes.
- Filled: `cart.map(item=>...)` show image, name, category, qty - + buttons, price*qty, Remove, total, checkout.

**Note:** `addToCart` function lives in App, but Navbar needs setCart for remove/inc/dec, so pass both cart and setCart. ProductGrid will call addToCart later.

**Test:** Click cart icon, empty state shows, count 0. (Add to cart not yet, next step). Close works.

---

## STEP 8: BACK TO PRODUCTGRID - ADD TO CART ON HOVER WITH FUNCTIONALITY

**Now come back to ProductGrid to add hover Add to Cart button with functionality.**

**We already have addToCart in App, now use it in ProductGrid:**

Update `ProductGrid.jsx` to add hover overlay:

```jsx
import { Heart, Star, ShoppingBag } from "lucide-react" // add ShoppingBag

export default function ProductGrid({ products, favorites = [], toggleFav, addToCart }){

  return(
    <div className="w-full p-4 bg-[#FFFEFB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((p) => {
          const isFav = favorites.includes(p.id)
          return (
            <div key={p.id} className="rounded-[24px] overflow-hidden border border-black/5 bg-white group cursor-pointer">
              
              <div className="relative h-[420px] flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                
                <div className="absolute top-3.5 left-3.5 flex gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[10px] tracking-widest font-semibold border border-black/5">{p.category}</span>
                  {p.tag && <span className={`px-3 py-1.5 rounded-full text-white text-[10px] tracking-widest font-semibold ${p.tagColor}`}>{p.tag}</span>}
                </div>

                <button onClick={(e)=> { e.stopPropagation(); toggleFav(p.id)}} className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white border border-black/5 flex items-center justify-center z-10 hover:scale-110 transition">
                  <Heart className={`w-3.5 h-3.5 transition ${isFav ? "fill-red-500 text-red-500" : "text-black/60"}`}/> 
                </button>

                {/* HOVER ADD TO CART - NEW */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="bg-white text-black text-[11px] tracking-widest font-bold px-6 py-3 rounded-full shadow-xl translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-black hover:text-white"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    ADD TO CART
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end p-4 px-5 bg-white">
                <div>
                  <p className="text-[16px] font-semibold tracking-tight leading-tight">{p.name}</p>
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
          )
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/40 text-sm">No products found</p>
          <p className="text-black/30 text-xs mt-1">Try different search or category</p>
        </div>
      )}
    </div>
  )
}
```

**For beginner - Add to Cart hover:**

**What we added vs Step 6:**
- Import `ShoppingBag` icon.
- New div `absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100` - overlay covers image, black 20% opacity, hidden by default opacity-0, visible on group hover opacity-100, transition 300ms.
- Button inside overlay `translate-y-2 group-hover:translate-y-0` - starts 2 down, slides up to 0 on hover, gives pop effect.
- `onClick={(e)=>{e.stopPropagation(); addToCart(p)}}` - stopPropagation stops bubbling (so clicking Add to Cart doesn't trigger card click), addToCart(p) adds product to cart in App.
- `hover:bg-black hover:text-white` button inverts on hover.

**How addToCart works (in App):**
```js
const addToCart = (product) => {
  setCart(prev => {
    const existing = prev.find(p => p.id === product.id)
    if(existing){
      return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
    }
    return [...prev, {...product, qty: 1}]
  })
}
```
- `prev.find` checks if already in cart.
- If exists: map, if matching id, copy ...p and qty+1, else keep.
- If not: spread old + new product with qty 1.
- Example: [] + add id1 => [{id1 qty1}], [{id1 qty1}] + add id1 => [{id1 qty2}].

**Flow:**
Hover image → overlay shows → Click ADD TO CART → addToCart in App adds to cart → Navbar cartCount updates (reduce) → Click cart icon → drawer shows product with qty.

**Test:** Hover card, button appears, click, Navbar badge goes 1, open cart drawer, see product, add same product again, qty becomes 2, total updates.

---

## STEP 9: FINALLY FOOTER - BOTTOM

**Finally footer, simple UI no functionality.**

Create `src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="w-full bg-[#FFFEFB] px-4 md:px-6 py-12 md:py-20 border-t border-black/5 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        <div className="flex-1 bg-[#FAF8F4] rounded-[28px] border border-black/5 p-8 md:p-10">
          <p className="text-[11px] tracking-[0.2em] font-semibold mb-4 text-black/40">NEWSLETTER</p>
          <h2 className="text-[36px] md:text-[48px] leading-[0.95] tracking-tight font-serif mb-8">Get 15% off <br /> your first order.</h2>
          <div className="flex gap-2 items-center">
            <input placeholder="Email address" className="flex-1 h-[48px] px-6 rounded-full bg-white border border-black/5 text-[13px] placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black" />
            <button className="h-[48px] px-7 rounded-full bg-black text-white text-[12px] tracking-widest font-bold hover:bg-zinc-800 transition">JOIN</button>
          </div>
          <p className="text-[11px] text-black/40 mt-3">By joining, you agree to our Terms. No spam, ever.</p>
        </div>

        <div className="flex-1 lg:pt-2">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-black/40 font-semibold mb-5">SHOP</p>
              <div className="flex flex-col gap-3.5">
                <a href="#" className="text-[13px] hover:opacity-60 transition">New Arrivals</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Apparel</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Footwear</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Accessories</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Beauty</a>
              </div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-black/40 font-semibold mb-5">INFO</p>
              <div className="flex flex-col gap-3.5">
                <a href="#" className="text-[13px] hover:opacity-60 transition">Shipping & Returns</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Care Guide</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Journal</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Stores</a>
                <a href="#" className="text-[13px] hover:opacity-60 transition">Contact</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mt-10 pt-8 border-t border-black/10">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">N</div><span className="text-[12px] font-semibold">NOVA © 2024</span></div>
            <span className="text-[11px] text-black/30 tracking-wide">CRAFTED IN LISBON — SHIPS WORLDWIDE</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
```

**In App.jsx final add Footer:**

```jsx
import Footer from "./components/Footer"

export default function App(){
  // ... all states ...
  return (
    <div className="w-full bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <MidBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} favorites={favorites} />
      <div ref={gridRef} className="mt-6">
        <ProductGrid products={filteredProducts} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} />
      </div>
      <Footer />
    </div>
  )
}
```

**Done!**

---

## FINAL APP.JSX - YOUR EXACT ORDER ALL TOGETHER

```jsx
import { useState, useEffect, useRef } from "react"
import { products } from "./components/data"
import Navbar from "./components/Navbar"
import MidPanel from "./components/MidPanel"
import MidBar from "./components/MidBar"
import ProductGrid from "./components/ProductGrid"
import Footer from "./components/Footer"

export default function App(){
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState("Featured")
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const gridRef = useRef(null)

  const scrollToGrid = () => gridRef.current?.scrollIntoView({ behavior: "smooth" })

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if(existing) return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
      return [...prev, {...product, qty: 1}]
    })
  }

  useEffect(() => {
    let result = [...products]
    if(search.trim() !== ""){
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    }
    if(activeCategory === "FAVORITE"){
      result = result.filter(p => favorites.includes(p.id))
    } else if(activeCategory !== "ALL"){
      result = result.filter(p => p.category === activeCategory)
    }
    if(sortBy === "Price: Low-High") result.sort((a,b) => a.price - b.price)
    if(sortBy === "Price: High-Low") result.sort((a,b) => b.price - a.price)
    if(sortBy === "Recent") result.sort((a,b) => b.id - a.id)
    setFilteredProducts(result)
  }, [activeCategory, sortBy, search, favorites, products])

  return (
    <div className="w-full bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <MidBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} favorites={favorites} />
      <div ref={gridRef} className="mt-6">
        <ProductGrid products={filteredProducts} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} />
      </div>
      <Footer />
    </div>
  )
}
```

**Follow your order to practice:**
1. Navbar UI only
2. Search function (search state + filter + controlled input)
3. Sidebar + scroll (showSidebar state + overlay/drawer + gridRef + scrollToGrid)
4. MidPanel hero + scroll buttons
5. MidBar filtering/sorting/search reflect (activeCategory, sortBy, favorites count, useEffect with search+category+sort)
6. ProductGrid favorite toggle + hover zoom (favorites state, toggleFav, group-hover scale, heart)
7. Navbar cart functionality + modal (cart state, cartCount reduce, cartTotal, showCart, remove/inc/dec, drawer)
8. ProductGrid add to cart hover (addToCart upsert, overlay opacity, button slide, stopPropagation)
9. Footer UI

Build in this order, you understand it because that's how you built it.

Good luck!
