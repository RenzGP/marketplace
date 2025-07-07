"use client"

import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const categories = ["Electronics", "Furniture", "Vehicles", "Clothing", "Others"]

export default function CreateItemPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.")
        return
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.")
        return
      }

      setImage(file)
      setPreviewURL(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !price || !email || !category || !image) {
      toast.error("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)

    const filename = `${Date.now()}_${image.name}`
    const { error: storageError } = await supabase.storage
      .from("listing-images")
      .upload(filename, image)

    if (storageError) {
      console.error("Image upload error:", storageError)
      toast.error("Image upload failed.")
      setIsSubmitting(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("listing-images")
      .getPublicUrl(filename)

    const image_url = urlData?.publicUrl

    const { error: insertError } = await supabase.from("listings").insert({
      title,
      description,
      price: parseFloat(price),
      category,
      seller_email: email,
      image_url,
    })

    if (insertError) {
      console.error("Insert error:", insertError)
      toast.error("Failed to create listing.")
    } else {
      toast.success("Listing created successfully!")

      // Clear form
      setTitle("")
      setDescription("")
      setPrice("")
      setCategory("")
      setEmail("")
      setImage(null)
      setPreviewURL(null)
      fileInputRef.current!.value = ""
    }

    setIsSubmitting(false)
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-4">
      {/* Form */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Create a Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Upload Image *</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description *</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (₱) *</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Email *</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </form>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>

        {previewURL ? (
          <Image
            src={previewURL}
            alt="Preview"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-[300px] mb-4"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500 mb-4">
            No Image Selected
          </div>
        )}

        <div className="space-y-1">
          <h3 className="text-xl font-bold">{title || "Title goes here..."}</h3>
          <p className="text-sm text-gray-600">
            {description || "Description will appear here."}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            ₱{price || "0.00"}
          </p>
          <p className="text-sm text-gray-500">Category: {category || "—"}</p>
          <p className="text-sm text-gray-500">Seller: {email || "—"}</p>
        </div>
      </div>
    </section>
  )
}
