"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import ListingCard, { Listing } from "@/components/marketplace/listing_card"
import { supabase } from "@/lib/supabase"

const categories = ["All", "Electronics", "Furniture", "Vehicles", "Clothing", "Others"]

export default function ItemGrid() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filtered, setFiltered] = useState<Listing[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setListings(data)
        setFiltered(data)
      }
    }

    fetchListings()
  }, [])

  useEffect(() => {
    let results = [...listings]

    if (category !== "All") {
      results = results.filter((item) => item.category === category)
    }

    if (search.trim()) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(results)
  }, [search, category, listings])

  return (
    <section className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search listings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border ${
              category === cat ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No listings found.</p>
        )}
      </div>
    </section>
  )
}
