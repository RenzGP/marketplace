import "./globals.css"
import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Toaster } from "sonner" // ✅ use Sonner instead

export const metadata = {
  title: "Marketplace",
  description: "Facebook Marketplace inspired app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
        <Toaster richColors /> {/*  Enables styled toasts */}
      </body>
    </html>
  )
}
