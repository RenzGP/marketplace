import Image from "next/image"
import Link from "next/link"

export type Listing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  seller_email: string
  image_url: string
}

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/item/${listing.id}`} //
      className="block border rounded-lg overflow-hidden hover:shadow-md transition"
    >
      <div className="h-48 w-full relative">
        <Image
          src={listing.image_url}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-bold truncate">{listing.title}</h3>
        <p className="text-blue-600 font-semibold">₱{listing.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 truncate">{listing.category}</p>
      </div>
    </Link>
  )
}
