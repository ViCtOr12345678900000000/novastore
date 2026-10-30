import { useState } from "react"
import { Search, ShoppingBag, X  } from "lucide-react"

export default function Navbar({ scrollToGrid, search, setSearch, cart = [], setCart }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const cartCount = cart.reduce((a, b) => a + b.qty, 0)
  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id))

  const [text, setText] = useState ("CHECKOUT")
  const handleClick = () => {
  setText("ORDER CONFIRMED")
  setTimeout(() => {
    setCart([])        // erases everything
    setShowCart(false) // closes drawer
    setText("CHECKOUT")
  }, 800)
}
  

  return (
    <>
    <div className=" sticky top-0 z-50 p-6 flex w-full justify-between bg-[#FFFEFB] border-b border-black/10 relative">
     
      <div>
        <div className="flex items-center gap-2">
          <div className="flex w-10 h-10 bg-black border rounded-full text-[18px] text-white font-bold justify-center items-center">N</div>
          <a href="#" className="text-black text-[20px] font-bold font-['Instrument_Serif'] tracking-widest">NOVA</a>
          <button className="md:hidden w-9 h-9 rounded-full bg-black text-white flex items-center justify-center ml-2" onClick={() => setShowSidebar(true)}>☰</button>

          <div className="pl-8 hidden md:flex gap-4 text-[15px] font-['Inter']">
            <button onClick={scrollToGrid} className="uppercase font-thin">Shop</button>
            <button onClick={scrollToGrid} className="uppercase font-thin">New</button>
            <button onClick={scrollToGrid} className="uppercase font-thin">sale</button>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative gap-4 hidden md:flex w-full max-w-sm items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." className="w-full font-['Inter'] pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-sm" />
        </div>
        <button onClick={() => setShowCart(true)} className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">{cartCount}</span>
        </button>
        <div className="flex w-10 h-10 bg-mauve-200/20 border rounded-full text-[14px] text-black/50 p-5 font-bold justify-center items-center">VC</div>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={() => setShowSearch(!showSearch)} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"><Search className="w-4 h-4" /></button>
        <button onClick={() => setShowCart(true)} className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex justify-center items-center text-[10px]">{cartCount}</span>
        </button>
        <div className="flex w-9 h-9 bg-mauve-200/20 border rounded-full text-[12px] text-black/50  font-bold justify-center items-center">VC</div>
      </div>

      {showSearch && (
        <div className="md:hidden absolute top-full left-0 w-full p-4 bg-[#FFFEFB] border-b border-black/20 z-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input  value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." className=" font-['Inter'] w-full pl-10 pr-4 py-3 rounded-2xl border border-black/20" />
          </div>
        </div>
      )}
    </div>

  {/* SIDEBAR - your old code */}
  <div onClick={() => setShowSidebar(false)} className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] font-['Inter'] z-[60] transition-opacity ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
  <div className={`fixed left-0 top-0 h-full w-[280px] font-['Inter'] rounded-r-2xl bg-white z-[70] p-6 flex flex-col justify-between shadow-2xl transition-transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">N</div><p className="font-bold text-sm">NOVA</p></div>
        <button onClick={() => setShowSidebar(false)} className="w-8 h-8 rounded-full border flex items-center justify-center"><X className="w-4 h-4"/></button>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={()=>{setShowSidebar(false); scrollToGrid()}} className="text-left px-4 py-3 rounded-full hover:cursor-pointer text-[19px] uppercase hover:bg-orange-200/20  hover:scale-105 duration-300">Shop</button>
        <button onClick={()=>{setShowSidebar(false); scrollToGrid()}} className="text-left px-4 py-3 rounded-full hover:cursor-pointer text-[19px] uppercase hover:bg-orange-200/20  hover:scale-105 duration-300">New</button>
        <button onClick={()=>{setShowSidebar(false); scrollToGrid()}} className="text-left px-4 py-3 rounded-full hover:cursor-pointer text-[19px] hover:bg-orange-200/20  hover:scale-105 duration-300 uppercase">Sale</button>
      </div>
    </div>
    <p className="text-[10px] text-zinc-400 border-t pt-4">© 2026 NOVA STORE</p>
  </div>

  {/* CART DRAWER - EXACT LIKE YOUR SCREENSHOT */}
  <>
  <div onClick={() => setShowCart(false)} className={`fixed inset-0 bg-black/20  backdrop-blur-sm z-[60] transition-opacity ${showCart ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
  <div className={`fixed right-0 top-0 h-full w-[400px] max-w-[90vw] font-['Inter'] rounded-l-2xl bg-white z-[70] flex flex-col shadow-2xl transition-transform ${showCart ? "translate-x-0" : "translate-x-full"}`}>
    {/* Header */}
    <div className="flex justify-between items-center p-5 border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-white"/></div>
        <span className="font-medium text-[14px]">Cart — {cartCount} items</span>
      </div>
      <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X className="w-4 h-4"/></button>
    </div>

    {cart.length === 0 ? (
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <div className="w-20 h-20 bg-[#F5F1EB] rounded-full flex items-center justify-center mb-5">
          <ShoppingBag className="w-6 h-6 opacity-40"/>
        </div>
        <h2 className="text-[26px] font-serif mb-2">Your cart is empty</h2>
        <p className="text-[13px] text-gray-400 leading-5 mb-8 max-w-[200px]">Add some pieces from the collection. They will appear here.</p>
        <button onClick={() => {scrollToGrid(); setShowCart(false)}} className="bg-black text-white text-[11px] tracking-widest font-bold px-8 py-3.5 rounded-full">START SHOPPING</button>
      </div>
    ) : (
      <>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <img src={item.image} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
              <div className="flex-1"><h4 className="text-sm font-medium">{item.name}</h4><p className="text-xs text-gray-500">Qty: {item.qty}</p><p className="text-sm font-bold mt-1">${item.price * item.qty}</p></div>
              <button onClick={() => removeFromCart(item.id)} className="text-[11px] text-gray-400">Remove</button>
            </div>
          ))}
        </div>
        <div className="p-5 border-t">
          <div className="flex justify-between font-bold mb-4"><span>Total</span><span>${cart.reduce((a,b)=>a+b.price*b.qty,0)}</span></div>
          <button onClick={handleClick} className="w-full bg-black text-white py-3.5 rounded-full text-[12px] font-bold tracking-widest">{text}</button>
        </div>
      </>
    )}
  </div>
  </>
  </>
  )
}