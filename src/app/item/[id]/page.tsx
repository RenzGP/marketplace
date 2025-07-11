import { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic"

type PageProps = {
  params: {
    id: string
  }
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", params.id)
    .single()

  if (error || !listing) {
    return <div className="p-4 text-red-500">Listing not found.</div>
  }

  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to listings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={listing.image_url}
          alt={listing.title}
          width={500}
          height={400}
          className="rounded-lg object-cover w-full h-[400px]"
        />
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <p className="text-blue-600 font-semibold text-xl">₱{listing.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">{listing.category}</p>
          <p>{listing.description}</p>
          <p className="text-sm text-gray-600">Seller: {listing.seller_email}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Message Seller
          </button>
        </div>
      </div>
    </section>
  )
}
