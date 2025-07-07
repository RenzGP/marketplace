"use client"

import { Menu } from "lucide-react"
import { useState } from "react"
import MobileSidebar from "./mobile_sidebar"

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between md:justify-start">
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={() => setShowSidebar(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-xl font-bold text-blue-600 ml-2 md:ml-0">
        Marketplace
      </h1>

      <MobileSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
    </header>
  )
}
