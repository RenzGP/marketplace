"use client"

import Link from "next/link"
import { X, Home, PlusCircle, LayoutList, HelpCircle } from "lucide-react"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/create/item", label: "New Listing", icon: PlusCircle },
  { href: "/my-listings", label: "My Listings", icon: LayoutList },
  { href: "/seller-help", label: "Seller Help", icon: HelpCircle },
]

export default function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <aside
        className={`absolute top-0 left-0 w-64 bg-white h-full p-4 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="mb-4" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <nav className="space-y-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600"
              onClick={onClose}
            >
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}
