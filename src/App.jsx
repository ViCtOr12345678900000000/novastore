import { useState, useEffect, useRef } from "react"
import { products as allProducts } from "./data"
import MidBar from "./components/MidBar"
import ProductGrid from "./components/ProductGrid"
import Navbar from "./components/Navbar"
import MidPanel from "./components/MidPanel"
import Footer from "./components/Footer"

export default function App(){
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sortBy, setSortBy] = useState("Featured")
  const [search, setSearch] = useState("")
  const gridRef = useRef(null)

  // DELETE THE OLD const [cart, setCart] = useState([])
  // KEEP ONLY THESE TWO:

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("nova_cart")
    return saved ? JSON.parse(saved) : []
  })

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("nova_favorites")
    return saved ? JSON.parse(saved) : []
  })

  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    localStorage.setItem("nova_cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("nova_favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === product.id)
      if(ex) return prev.map(p => p.id === product.id ? {...p, qty: p.qty+1} : p)
      return [...prev, {...product, qty: 1}]
    })
  }

  const scrollToGrid = () =>{
    gridRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    let result = [...allProducts]
    if (search.trim() !== "") {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (activeCategory === "FAVORITE") {
      result = result.filter(p => favorites.includes(p.id))
    } else if (activeCategory !== "ALL") {
      result = result.filter(p => p.category === activeCategory)
    }
    if (sortBy === "Price: Low-High") result.sort((a,b) => a.price - b.price)
    if (sortBy === "Price: High-Low") result.sort((a,b) => b.price - a.price)
    if (sortBy === "Recent") result.sort((a,b) => b.id - a.id)
    setFilteredProducts(result)
  }, [activeCategory, sortBy, search, favorites])

  const toggleFav = (id)=>{
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id])
  }

  return (
    <div className="w-full p-4 bg-[#FFFEFB] min-h-screen">
      <Navbar scrollToGrid={scrollToGrid} search={search} setSearch={setSearch} cart={cart} setCart={setCart} />
      <MidPanel scrollToGrid={scrollToGrid} />
      <MidBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} sortBy={sortBy} setSortBy={setSortBy} favorites={favorites} />
      <div ref={gridRef}>
        <ProductGrid products={filteredProducts} favorites={favorites} toggleFav={toggleFav} addToCart={addToCart} />
      </div>
      <Footer scrollToGrid={scrollToGrid} />
    </div>
  )
}