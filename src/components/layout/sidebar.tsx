"use client"

import Link from "next/link"
import { Home, PlusCircle, LayoutList, HelpCircle, Tag } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-full max-w-[240px] border-r p-4 hidden md:block">
      {/* Main Navigation */}
      <nav className="space-y-4 mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
        >
          <Home className="w-4 h-4" /> Home
        </Link>

        <Link
          href="/create/item"
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
        >
          <PlusCircle className="w-4 h-4" /> New Listing
        </Link>

        <Link
          href="/my-listings"
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
        >
          <LayoutList className="w-4 h-4" /> My Listings
        </Link>

        <Link
          href="/seller-help"
          className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
        >
          <HelpCircle className="w-4 h-4" /> Seller Help
        </Link>
      </nav>
    </aside>
  )
}
