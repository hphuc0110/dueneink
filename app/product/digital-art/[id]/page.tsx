"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import { digitalArtList, type DigitalArtItem } from "@/lib/tattoos-data"

export default function DigitalArtGalleryPage() {
  const params = useParams()
  const [art, setArt] = useState<DigitalArtItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [viewingPreviewImages, setViewingPreviewImages] = useState(false) // Track nếu đang xem preview images
  const [currentPreviewGroup, setCurrentPreviewGroup] = useState<string[]>([]) // Nhóm preview đang xem

  useEffect(() => {
    if (params.id) {
      const foundArt = digitalArtList.find((a) => a.id === params.id)
      if (foundArt) {
        setArt(foundArt)
      }
      setLoading(false)
    }
  }, [params.id])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "Escape") {
        closeImage()
      }
    }

    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImageIndex, viewingPreviewImages, art])

  const openImage = (index: number) => {
    setSelectedImageIndex(index)
    setViewingPreviewImages(false)
  }

  const openPreviewImages = (previewGroup: string[]) => {
    // Mở lightbox với chỉ các ảnh preview trong nhóm được chọn
    if (previewGroup && previewGroup.length > 0) {
      setSelectedImageIndex(0) // Bắt đầu từ ảnh đầu tiên trong previewImages
      setViewingPreviewImages(true)
      // Lưu nhóm preview đang xem vào state tạm thời
      setCurrentPreviewGroup(previewGroup)
    }
  }

  const closeImage = () => {
    setSelectedImageIndex(null)
    setViewingPreviewImages(false)
    setCurrentPreviewGroup([])
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null) return
    
    if (viewingPreviewImages && currentPreviewGroup.length > 0) {
      // Điều hướng trong currentPreviewGroup
      setSelectedImageIndex(
        selectedImageIndex > 0 ? selectedImageIndex - 1 : currentPreviewGroup.length - 1
      )
    } else if (art?.images) {
      // Điều hướng trong tất cả images
      setSelectedImageIndex(
        selectedImageIndex > 0 ? selectedImageIndex - 1 : art.images.length - 1
      )
    }
  }

  const goToNext = () => {
    if (selectedImageIndex === null) return
    
    if (viewingPreviewImages && currentPreviewGroup.length > 0) {
      // Điều hướng trong currentPreviewGroup
      setSelectedImageIndex(
        selectedImageIndex < currentPreviewGroup.length - 1 ? selectedImageIndex + 1 : 0
      )
    } else if (art?.images) {
      // Điều hướng trong tất cả images
      setSelectedImageIndex(
        selectedImageIndex < art.images.length - 1 ? selectedImageIndex + 1 : 0
      )
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!art) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Không tìm thấy digital art.</p>
          <Link href="/product">
            <Button>Quay lại Product</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 w-full bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/product">
            <Button 
              variant="ghost" 
              className="mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base py-2 sm:py-2.5 touch-manipulation"
            >
              ← Quay lại Product
            </Button>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground uppercase tracking-tight animate-fade-in leading-tight">
            {art.name}
          </h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {art.images && art.images.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Nếu có previewImages, hiển thị các nhóm preview */}
              {art.previewImages && (() => {
                // Kiểm tra xem previewImages là mảng đơn hay mảng các mảng
                const isArrayOfArrays = Array.isArray(art.previewImages[0]) && typeof art.previewImages[0] !== 'string'
                const previewGroups: string[][] = isArrayOfArrays 
                  ? (art.previewImages as string[][])
                  : [art.previewImages as string[]]
                
                return previewGroups.map((previewGroup, groupIndex) => (
                  <div
                    key={groupIndex}
                    onClick={() => openPreviewImages(previewGroup)}
                    className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group touch-manipulation"
                  >
                    {/* Hiển thị ảnh đầu tiên trong nhóm preview */}
                    <Image
                      src={previewGroup[0]}
                      alt={`${art.name} - Preview ${groupIndex + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay khi hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-4 py-2 rounded-full text-xs sm:text-sm">
                        +{previewGroup.length - 1} ảnh khác
                      </div>
                    </div>
                  </div>
                ))
              })()}
              
              {/* Hiển thị các ảnh còn lại (không có trong bất kỳ previewImages nào) */}
              {art.images
                .filter(img => {
                  // Kiểm tra xem ảnh có trong previewImages không
                  if (!art.previewImages) return true
                  
                  const isArrayOfArrays = Array.isArray(art.previewImages[0]) && typeof art.previewImages[0] !== 'string'
                  if (isArrayOfArrays) {
                    // Nếu là mảng các mảng, kiểm tra trong tất cả các nhóm
                    return !(art.previewImages as string[][]).some(group => group.includes(img))
                  } else {
                    // Nếu là mảng đơn
                    return !(art.previewImages as string[]).includes(img)
                  }
                })
                .map((imageSrc, index) => {
                  const imageIndex = art.images.findIndex(img => img === imageSrc)
                  return (
                    <div
                      key={index}
                      onClick={() => openImage(imageIndex >= 0 ? imageIndex : 0)}
                      className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-manipulation"
                    >
                      <Image
                        src={imageSrc}
                        alt={`${art.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chưa có hình ảnh.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Viewer Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent 
          className="max-w-[100vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-[100vh] sm:max-h-[95vh] p-0 bg-[#f5f5f0] border-none m-0 sm:m-4 rounded-none sm:rounded-lg"
          showCloseButton={false}
        >
          {selectedImageIndex !== null && art && (
            <div className="relative w-full h-[100vh] sm:h-[90vh] flex items-center justify-center">
              {(() => {
                // Xác định danh sách ảnh đang xem
                const currentImages = viewingPreviewImages && currentPreviewGroup.length > 0
                  ? currentPreviewGroup
                  : art.images
                const currentImage = currentImages[selectedImageIndex]

                if (!currentImage) return null

                return (
                  <>
                    {/* Close Button */}
                    <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
                      <XIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                    </DialogClose>

                    {/* Previous Button */}
                    {currentImages.length > 1 && (
                      <button
                        onClick={goToPrevious}
                        className="absolute left-3 sm:left-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 md:p-3 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>
                    )}

                    {/* Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                      <Image
                        src={currentImage}
                        alt={`${art.name} - Image ${selectedImageIndex + 1}`}
                        width={1920}
                        height={1080}
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                    </div>

                    {/* Next Button */}
                    {currentImages.length > 1 && (
                      <button
                        onClick={goToNext}
                        className="absolute right-3 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 md:p-3 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      </button>
                    )}

                    {/* Image Counter */}
                    {currentImages.length > 1 && (
                      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm touch-manipulation">
                        {selectedImageIndex + 1} / {currentImages.length}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer imageSrc="/img/2.webp" />
    </main>
  )
}
