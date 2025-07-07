import ItemGrid from "@/components/marketplace/item_grid"

export default function HomePage() {
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Browse Listings</h1>
      <ItemGrid />
    </main>
  )
}
