"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import type { TattooItem, DigitalArtItem } from "@/lib/tattoos-data"

interface RecommendItemImage {
  src: string
  alt: string
  colSpan?: number // Number of columns this image spans (default: 1)
  rowSpan?: number // Number of rows this image spans (default: 1)
  width?: number | string // Width in pixels or CSS value (e.g., "200px", "50%")
  height?: number | string // Height in pixels or CSS value (e.g., "200px", "50%")
}

interface RecommendItem {
  id: string | number
  image?: string // Single image (backward compatible)
  images?: RecommendItemImage[] // Multiple images in one cell
  alt: string
  colSpan?: number // Number of columns to span (default: 1)
  rowSpan?: number // Number of rows to span (default: 1)
  width?: number | string // Width in pixels or CSS value (e.g., "200px", "50%")
  height?: number | string // Height in pixels or CSS value (e.g., "200px", "50%")
  imageWidth?: number | string // Width for the image itself (doesn't affect column size)
  imageHeight?: number | string // Height for the image itself (doesn't affect column size)
  allowOverflow?: boolean // Allow image to overflow into adjacent columns (default: false)
  marginLeft?: number // Left margin in pixels (default: 0)
  marginTop?: number // Top margin in pixels - khoảng cách từ ảnh trên (default: 0)
  sameRowGroup?: string | number // Group items cùng hàng (items cùng sameRowGroup sẽ nằm cùng hàng)
  aspectRatio?: string // Custom aspect ratio (default: "1", ignored if width/height specified)
  innerGap?: number // Gap between images if multiple images (default: 2)
  innerColumns?: number // Grid columns for inner images (default: 2)
  innerRows?: number // Grid rows for inner images (auto-calculated if not provided)
  innerLayout?: 'grid' | 'horizontal' | 'vertical' // Layout for multiple images: 'grid', 'horizontal', or 'vertical' (default: 'grid')
}

interface RecommendSectionProps {
  selectedItem?: TattooItem | DigitalArtItem | null
  items?: RecommendItem[] // Custom items với layout linh hoạt
  columns?: number // Number of columns in grid (default: 4)
  gap?: number // Gap in pixels between columns (default: 3)
  rowGap?: number // Gap in pixels between rows (default: 0, set to gap if not specified)
}

export function RecommendSection({ 
  selectedItem = null,
  items,
  columns = 4,
  gap = 3,
  rowGap = 0, // Mặc định không có khoảng cách giữa các hàng
}: RecommendSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Default recommendations khi chưa chọn gì - 4 cột x 2 hàng (8 items)
  const defaultRecommendations: RecommendItem[] = [
    // Row 1, Col 1 - Single image
    {
      id: 1,
      images: [
        { src: "/img/ARTWORK/12.webp", alt: "Artwork 2-1" },
        { src: "/img/ARTWORK/13.webp", alt: "Artwork 2-2" },
      ],
      alt: "Artwork 1",
      width: 415,
      height: 250,
    },
    // Row 1, Col 2 - Multiple images (2x2 grid)
    {
      id: 2,
      image: "/img/ARTWORK/15.webp", 
      alt: "Artwork 2",
      innerColumns: 2,
      innerGap: 2,
      height: 600,
      width: 415,
    },
  
    // Row 1, Col 3 - Single image với colSpan lớn hơn
    {
      id: 3,
      images: [
        { src: "/img/ARTWORK/24.webp", alt: "Artwork 3-1" },
        { src: "/img/ARTWORK/26.webp", alt: "Artwork 3-2" },
        { src: "/img/ARTWORK/23.webp", alt: "Artwork 3-3" },
        { src: "/img/ARTWORK/17.webp", alt: "Artwork 3-4" },
      ],
      alt: "Artwork 3",
      height: 600,
      width: 415,
      colSpan: 1,
      rowSpan: 1, // Span 2 rows
    },
    
    
    // Row 1, Col 4 - Single image
    {
      id: 4,
      images: [
        { src: "/img/ARTWORK/39.webp", alt: "Artwork 4-1" },
        { src: "/img/ARTWORK/37.webp", alt: "Artwork 4-2"},
      ],
      alt: "Artwork 4",
      innerLayout: 'vertical',
      height: 600,
      width: 400, // Tăng width để ảnh rộng hơn
    },
    // Row 2, Col 1-2 - Spans 2 columns
    
    {
      id: 5,
      image: "/img/ARTWORK/14.webp",
      alt: "Artwork 5",
      colSpan: 1,
      rowSpan: 1,
      height: 648,
      width: 415,
      marginTop: 2,
    },
    // Row 2, Col 1 - Single image

    // Row 2, Col 3 - Single image

    {
      id: 6,
      images: [
        { src: "/img/ARTWORK/11.webp", alt: "Artwork 6-1" },
        { src: "/img/ARTWORK/16.webp", alt: "Artwork 6-2" },
      ],
      alt: "Artwork 6",
      innerColumns: 2,
      height: 298,
      width: 415,
      innerGap: 1,
      marginTop: 2,
    },
    {
      id: 7,
      image: "/img/ARTWORK/18.webp",
      alt: "Artwork 7",
      height: 298,
      width: 214,
      marginTop: 2,
      sameRowGroup: 'row1', // Cùng hàng với id 8 và 9
    },
    {
      id: 8,
      image: "/img/ARTWORK/41.webp",
      alt: "Artwork 8",
      height: 298,
      width: 415,
      sameRowGroup: 'row1', // Cùng hàng với id 7 và 9
      marginLeft: 3, // Cách id 7 khoảng 3px
    },
    {
      id: 9,
      image: "/img/ARTWORK/38.webp",
      alt: "Artwork 9",
      height: 298,
      width: 185,
      sameRowGroup: 'row1', // Cùng hàng với id 7 và 8
      marginLeft: 3, // Cách id 8 khoảng 3px
    },
  ]

  // Tạo recommendations từ selectedItem hoặc items hoặc default
  const getRecommendations = (): RecommendItem[] => {
    // Nếu có items được truyền vào, sử dụng items
    if (items && items.length > 0) {
      return items
    }

    // Nếu có selectedItem, hiển thị tất cả ảnh từ selectedItem
    if (selectedItem && selectedItem.images && selectedItem.images.length > 0) {
    return selectedItem.images.map((imageSrc, index) => ({
      id: index + 1,
      image: imageSrc,
      alt: `${selectedItem.name} - Image ${index + 1}`,
    }))
    }

    // Mặc định sử dụng defaultRecommendations
    return defaultRecommendations
  }

  const recommendations = getRecommendations()
  const isCustomView = selectedItem !== null && !items
  const [itemPositions, setItemPositions] = useState<Map<number | string, { top: number; left: number; width: number }>>(new Map())
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Helper function to convert width/height to CSS value
  const toCssValue = (value: number | string | undefined): string | undefined => {
    if (value === undefined) return undefined
    if (typeof value === 'number') return `${value}px`
    return value
  }

  // Tính toán vị trí masonry layout - tất cả ảnh trong 1 container, tự động điền vào khoảng trống
  useEffect(() => {
    if (isCustomView || !gridRef.current) return

    const container = gridRef.current
    const items = container.querySelectorAll('[data-item-id]')
    
    // Chờ DOM render xong và ảnh load
    const calculatePositions = () => {
      const containerWidth = container.clientWidth
      // Responsive: trên mobile dùng 1-2 cột, desktop giữ nguyên
      const responsiveColumns = isMobile ? (containerWidth < 640 ? 1 : 2) : columns
      const responsiveGap = isMobile ? (gap * 0.5) : gap // Gap nhỏ hơn trên mobile
      const columnWidth = (containerWidth - (responsiveGap * (responsiveColumns - 1))) / responsiveColumns
      const columnHeights = new Array(responsiveColumns).fill(0)
      const positions = new Map<number | string, { top: number; left: number; width: number }>()

      // Xử lý items theo thứ tự trong recommendations array, không phải thứ tự DOM
      recommendations.forEach((itemData, itemIndex) => {
        const itemId = String(itemData.id)
        const itemElement = Array.from(items).find(
          (el) => el.getAttribute('data-item-id') === itemId
        ) as HTMLElement | undefined
        
        if (!itemElement) return
        const itemWidthValue = itemData?.width
        const itemHeightValue = itemData?.height
        
        // Nếu có width cụ thể, sử dụng width đó
        let actualWidth: number
        let colSpan: number
        
        if (itemWidthValue) {
          // Chuyển đổi width sang pixel nếu cần
          let baseWidth: number
          if (typeof itemWidthValue === 'number') {
            baseWidth = itemWidthValue
          } else if (typeof itemWidthValue === 'string' && itemWidthValue.endsWith('px')) {
            baseWidth = parseFloat(itemWidthValue)
          } else {
            // Nếu là %, tính dựa trên container width
            const percent = parseFloat(itemWidthValue) / 100
            baseWidth = containerWidth * percent
          }
          
          // Trên mobile, scale width để phù hợp với màn hình nhỏ hơn
          if (isMobile) {
            // Scale width dựa trên tỷ lệ container width
            const scaleFactor = containerWidth / 1200 // Giả sử desktop width ~1200px
            actualWidth = Math.min(baseWidth * scaleFactor, containerWidth - (gap * 0.5))
          } else {
            actualWidth = baseWidth
          }
          
          // Tính colSpan dựa trên width thực tế
          const responsiveGap = isMobile ? (gap * 0.5) : gap
          const responsiveColumns = isMobile ? (container.clientWidth < 640 ? 1 : 2) : columns
          colSpan = Math.ceil((actualWidth + responsiveGap) / (columnWidth + responsiveGap))
          colSpan = Math.min(colSpan, responsiveColumns) // Không vượt quá số cột
        } else {
          const responsiveGap = isMobile ? (gap * 0.5) : gap
          const responsiveColumns = isMobile ? (container.clientWidth < 640 ? 1 : 2) : columns
          colSpan = itemData?.colSpan || 1
          // Trên mobile, colSpan không vượt quá số cột responsive
          if (isMobile) {
            colSpan = Math.min(colSpan, responsiveColumns)
          }
          actualWidth = columnWidth * colSpan + responsiveGap * (colSpan - 1)
        }
        
        // Kiểm tra xem có items cùng hàng không (sameRowGroup)
        const sameRowGroup = itemData?.sameRowGroup
        let targetColumn: number
        let top: number
        
        if (sameRowGroup && itemIndex > 0) {
          // Tìm item trước đó trong cùng group (item gần nhất trước đó)
          let prevItemIndex = -1
          for (let i = itemIndex - 1; i >= 0; i--) {
            if (recommendations[i].sameRowGroup === sameRowGroup) {
              prevItemIndex = i
              break
            }
          }
          
          if (prevItemIndex !== -1) {
            const prevItemId = String(recommendations[prevItemIndex].id)
            const prevPosition = positions.get(prevItemId)
            
            if (prevPosition) {
              // Đặt cùng hàng với item trước
              top = prevPosition.top
              // Tính left dựa trên vị trí item trước + width + gap
              const prevItemData = recommendations[prevItemIndex]
              const prevWidthValue = prevItemData?.width
              let prevWidth: number
              
              // Sử dụng width từ position đã tính (đã bao gồm responsive scaling)
              prevWidth = prevPosition.width
              
              // Sử dụng width từ position đã tính (đã bao gồm responsive scaling)
              prevWidth = prevPosition.width
              
              const marginLeft = itemData?.marginLeft || (isMobile ? gap * 0.5 : gap)
              // Tính left trực tiếp từ vị trí item trước + width + marginLeft
              const calculatedLeft = prevPosition.left + prevWidth + marginLeft
              
              // Đảm bảo không vượt quá container width
              const responsiveColumns = isMobile ? (container.clientWidth < 640 ? 1 : 2) : columns
              const maxLeft = containerWidth - actualWidth
              const finalLeft = Math.min(calculatedLeft, maxLeft)
              
              // Tính targetColumn từ finalLeft (chỉ để cập nhật columnHeights)
              targetColumn = Math.floor(finalLeft / (columnWidth + (isMobile ? gap * 0.5 : gap)))
              if (targetColumn + colSpan > responsiveColumns) {
                targetColumn = responsiveColumns - colSpan
              }
              
              // Lưu finalLeft vào position thay vì tính lại từ targetColumn
              positions.set(itemId, { top, left: finalLeft, width: actualWidth })
              
              // Cập nhật chiều cao các cột
              const itemHeight = itemElement.offsetHeight || itemElement.scrollHeight || 0
              const responsiveRowGap = isMobile ? (rowGap * 0.5) : rowGap
              for (let i = 0; i < colSpan; i++) {
                columnHeights[targetColumn + i] = top + itemHeight + responsiveRowGap
              }
              
              return // Bỏ qua phần tính toán left bên dưới
            } else {
              // Fallback: tìm cột có chiều cao thấp nhất
              let minHeight = Math.min(...columnHeights)
              targetColumn = columnHeights.indexOf(minHeight)
              const marginTop = itemData?.marginTop || 0
              top = columnHeights[targetColumn] + marginTop
            }
          } else {
            // Item đầu tiên trong group: tìm cột có chiều cao thấp nhất
            let minHeight = Math.min(...columnHeights)
            targetColumn = columnHeights.indexOf(minHeight)
            const marginTop = itemData?.marginTop || 0
            top = columnHeights[targetColumn] + marginTop
          }
        } else {
          // Logic bình thường: tìm cột có chiều cao thấp nhất
          let minHeight = Math.min(...columnHeights)
          targetColumn = columnHeights.indexOf(minHeight)
          const marginTop = itemData?.marginTop || 0
          top = columnHeights[targetColumn] + marginTop
        }

        // Chỉ tính toán left nếu chưa được set bởi sameRowGroup logic ở trên
        if (!positions.has(itemId)) {
          // Đảm bảo có đủ chỗ cho colSpan
          const responsiveColumns = isMobile ? (container.clientWidth < 640 ? 1 : 2) : columns
          const responsiveGap = isMobile ? (gap * 0.5) : gap
          
          if (targetColumn + colSpan > responsiveColumns) {
            targetColumn = responsiveColumns - colSpan
          }
          const left = targetColumn * (columnWidth + responsiveGap) + (itemData?.marginLeft || 0)
          positions.set(itemId, { top, left, width: actualWidth })
        }

        // Cập nhật chiều cao các cột - lấy chiều cao thực tế của item
        const itemHeight = itemElement.offsetHeight || itemElement.scrollHeight || 0
        
        // Cập nhật chiều cao cột: top position + item height + rowGap
        const responsiveRowGap = isMobile ? (rowGap * 0.5) : rowGap
        for (let i = 0; i < colSpan; i++) {
          columnHeights[targetColumn + i] = top + itemHeight + responsiveRowGap
        }
      })

      // Chỉ cập nhật state nếu có thay đổi thực sự để tránh vòng lặp vô hạn
      setItemPositions((prevPositions) => {
        // Kiểm tra xem có thay đổi không
        if (prevPositions.size !== positions.size) {
          return positions
        }
        for (const [key, value] of positions.entries()) {
          const prevValue = prevPositions.get(key)
          if (!prevValue || 
              prevValue.top !== value.top || 
              prevValue.left !== value.left || 
              prevValue.width !== value.width) {
            return positions
          }
        }
        return prevPositions // Không có thay đổi, giữ nguyên
      })
      
      // Cập nhật chiều cao container
      const maxHeight = Math.max(...columnHeights)
      setContainerHeight((prevHeight) => {
        // Chỉ cập nhật nếu có thay đổi đáng kể (tránh re-render không cần thiết)
        return Math.abs(prevHeight - maxHeight) > 1 ? maxHeight : prevHeight
      })
    }

    // Chờ một chút để DOM và ảnh render xong
    const timeoutId = setTimeout(calculatePositions, 100)
    
    // Lắng nghe khi ảnh load xong
    const images = container.querySelectorAll('img')
    let loadedCount = 0
    const totalImages = images.length
    const imageLoadHandlers: Array<() => void> = []

    if (totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++
        } else {
          const loadHandler = () => {
            loadedCount++
            if (loadedCount === totalImages) {
              calculatePositions()
            }
          }
          img.addEventListener('load', loadHandler)
          imageLoadHandlers.push(() => img.removeEventListener('load', loadHandler))
        }
      })
      
      if (loadedCount === totalImages) {
        clearTimeout(timeoutId)
        calculatePositions()
      }
    }

    // Lắng nghe resize với debounce để tránh vòng lặp vô hạn
    let resizeTimeout: NodeJS.Timeout | null = null
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        calculatePositions()
      }, 150)
    })
    resizeObserver.observe(container)

    return () => {
      clearTimeout(timeoutId)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeObserver.disconnect()
      // Remove image load listeners
      imageLoadHandlers.forEach((removeHandler) => removeHandler())
    }
  }, [recommendations, columns, gap, rowGap, isCustomView, isMobile])

  // Masonry layout - không dùng grid, tất cả ảnh trong 1 container
  const [containerHeight, setContainerHeight] = useState(0)

  const openImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImage = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null || !selectedItem?.images) return
    setSelectedImageIndex(
      selectedImageIndex > 0 ? selectedImageIndex - 1 : selectedItem.images.length - 1
    )
  }

  const goToNext = () => {
    if (selectedImageIndex === null || !selectedItem?.images) return
    setSelectedImageIndex(
      selectedImageIndex < selectedItem.images.length - 1 ? selectedImageIndex + 1 : 0
    )
  }

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
  }, [selectedImageIndex, selectedItem])


  return (
    <section 
      id="recommend-section"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f3f0] scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
            {isCustomView ? selectedItem?.name : "Recommend for You"}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg font-medium px-2 sm:px-4 md:px-0">
            {isCustomView 
              ? "Click on an image to view the full gallery"
              : "We've selected these works based on artists you'll love."
            }
          </p>
        </div>

        {/* Layout khác nhau tùy vào có selectedItem hay không */}
        {isCustomView ? (
          // Layout grid 3 cột cho selectedItem (layout mới)
          <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openImage(index)}
                className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-manipulation group"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt || `Image ${item.id}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          // Masonry layout - tất cả ảnh trong 1 container, tự động điền vào khoảng trống
          <div
            ref={gridRef}
            className="relative"
            style={{
              width: '100%',
              height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
              minHeight: '100px',
            }}
          >
            {recommendations.map((item) => {
              const hasMultipleImages = item.images && item.images.length > 1
              const images = hasMultipleImages 
                ? item.images! 
                : [{ src: item.image || "/placeholder.svg", alt: item.alt || `Image ${item.id}` }]
              
              const itemWidth = toCssValue(item.width)
              const itemHeight = toCssValue(item.height)
              const imageWidth = toCssValue(item.imageWidth)
              const imageHeight = toCssValue(item.imageHeight)
              
              // Nếu có imageWidth/imageHeight, chỉ áp dụng cho ảnh, container giữ kích thước cột
              const hasImageSize = imageWidth || imageHeight
              const hasContainerSize = itemWidth || itemHeight
              const hasFixedSize = hasContainerSize || hasImageSize

              // Tính toán colSpan: nếu có width cụ thể và không có colSpan, tính dựa trên width
              // Nếu có colSpan thì dùng colSpan, cho phép vượt qua các cột
              let colSpan = item.colSpan || 1
              if (hasContainerSize && !item.colSpan && typeof item.width === 'number') {
                // Ước tính số cột dựa trên width (có thể điều chỉnh logic này)
                // Giả sử mỗi cột ~25% width của container
                // Nhưng tốt nhất là để người dùng chỉ định colSpan khi cần vượt qua
              }

              const position = itemPositions.get(String(item.id))
              const useMasonry = position && !isCustomView

              return (
              <div
                key={item.id}
                  data-item-id={String(item.id)}
                  className={`relative bg-card cursor-pointer group ${item.allowOverflow ? 'overflow-visible' : 'overflow-hidden'}`}
                  style={{
                    position: useMasonry ? 'absolute' : 'relative',
                    top: useMasonry ? `${position.top}px` : undefined,
                    left: useMasonry ? `${position.left}px` : undefined,
                    width: useMasonry ? `${position.width}px` : itemWidth,
                    height: itemHeight,
                    aspectRatio: hasFixedSize ? undefined : (item.aspectRatio || "1"),
                    display: hasImageSize ? 'flex' : undefined,
                    alignItems: hasImageSize ? 'center' : undefined,
                    justifyContent: hasImageSize ? 'flex-start' : undefined,
                    marginLeft: item.marginLeft ? `${item.marginLeft}px` : 0,
                    marginTop: !useMasonry && item.marginTop ? `${item.marginTop}px` : 0, // marginTop chỉ áp dụng khi không dùng masonry
                    marginRight: 0,
                    marginBottom: 0,
                    padding: 0, // Không có padding
                    zIndex: item.allowOverflow ? 1 : 'auto',
                  }}
                >
                  {hasMultipleImages ? (
                    // Layout cho nhiều ảnh trong một ô
                    item.innerLayout === 'horizontal' ? (
                      // Horizontal layout - xếp ảnh ngang
                      <div
                        className="flex w-full h-full"
                        style={{
                          gap: `${item.innerGap || 2}px`,
                          flexDirection: 'row',
                          alignItems: 'stretch',
                        }}
                      >
                        {images.map((img, imgIndex) => {
                          const imgWidth = typeof img.width === 'number' ? `${img.width}px` : img.width
                          const imgHeight = typeof img.height === 'number' ? `${img.height}px` : img.height
                          const hasFixedSize = imgWidth || imgHeight
                          
                          return (
                            <div
                              key={imgIndex}
                              className="relative overflow-hidden shrink-0"
                              style={{
                                width: imgWidth || 'auto',
                                height: imgHeight || '100%',
                                flex: hasFixedSize ? '0 0 auto' : '1 1 0',
                              }}
                            >
                              {hasFixedSize ? (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={typeof img.width === 'number' ? img.width : undefined}
                                  height={typeof img.height === 'number' ? img.height : undefined}
                                  style={{
                                    width: imgWidth || '100%',
                                    height: imgHeight || '100%',
                                  }}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : item.innerLayout === 'vertical' ? (
                      // Vertical layout - xếp ảnh dọc (1 ảnh trên, 1 ảnh dưới)
                      <div
                        className="flex w-full h-full"
                        style={{
                          gap: `${item.innerGap || 2}px`,
                          flexDirection: 'column',
                          alignItems: 'stretch',
                        }}
                      >
                        {images.map((img, imgIndex) => {
                          const imgWidth = typeof img.width === 'number' ? `${img.width}px` : img.width
                          const imgHeight = typeof img.height === 'number' ? `${img.height}px` : img.height
                          const hasFixedSize = imgWidth || imgHeight
                          
                          return (
                            <div
                              key={imgIndex}
                              className="relative overflow-hidden shrink-0"
                              style={{
                                width: imgWidth || '100%',
                                height: imgHeight || 'auto',
                                flex: hasFixedSize ? '0 0 auto' : '1 1 0',
                              }}
                            >
                              {hasFixedSize ? (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={typeof img.width === 'number' ? img.width : undefined}
                                  height={typeof img.height === 'number' ? img.height : undefined}
                                  style={{
                                    width: imgWidth || '100%',
                                    height: imgHeight || '100%',
                                  }}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      // Grid layout cho nhiều ảnh trong một ô với kích thước tùy chỉnh
                      <div
                        className="grid w-full h-full"
                        style={{
                          gridTemplateColumns: `repeat(${item.innerColumns || 2}, 1fr)`,
                          gridTemplateRows: item.innerRows ? `repeat(${item.innerRows}, 1fr)` : undefined,
                          gap: `${item.innerGap || 2}px`,
                        }}
                      >
                        {images.map((img, imgIndex) => {
                          const imgWidth = typeof img.width === 'number' ? `${img.width}px` : img.width
                          const imgHeight = typeof img.height === 'number' ? `${img.height}px` : img.height
                          const hasFixedSize = imgWidth || imgHeight
                          
                          return (
                            <div
                              key={imgIndex}
                              className="relative overflow-hidden"
                              style={{
                                gridColumn: hasFixedSize ? undefined : `span ${img.colSpan || 1}`,
                                gridRow: hasFixedSize ? undefined : `span ${img.rowSpan || 1}`,
                                width: imgWidth,
                                height: imgHeight,
                                ...(hasFixedSize ? { position: 'relative' } : {}),
                              }}
                            >
                              {hasFixedSize ? (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={typeof img.width === 'number' ? img.width : undefined}
                                  height={typeof img.height === 'number' ? img.height : undefined}
                                  style={{
                                    width: imgWidth || '100%',
                                    height: imgHeight || '100%',
                                  }}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  ) : (
                    // Single image
                    <>
                      {hasImageSize ? (
                        // Ảnh có kích thước riêng, không ảnh hưởng đến container
                        <Image
                          src={images[0].src}
                          alt={images[0].alt}
                          width={typeof item.imageWidth === 'number' ? item.imageWidth : undefined}
                          height={typeof item.imageHeight === 'number' ? item.imageHeight : undefined}
                          style={{
                            width: imageWidth || '100%',
                            height: imageHeight || '100%',
                            objectFit: 'cover',
                            display: 'block', // Loại bỏ khoảng trắng dưới ảnh
                            margin: 0,
                            padding: 0,
                          }}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : images[0].width || images[0].height ? (
                        <Image
                          src={images[0].src}
                          alt={images[0].alt}
                          width={typeof images[0].width === 'number' ? images[0].width : undefined}
                          height={typeof images[0].height === 'number' ? images[0].height : undefined}
                          style={{
                            width: typeof images[0].width === 'number' ? `${images[0].width}px` : images[0].width || '100%',
                            height: typeof images[0].height === 'number' ? `${images[0].height}px` : images[0].height || '100%',
                          }}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                  <Image
                          src={images[0].src}
                          alt={images[0].alt}
                          fill
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      {/* Optional overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Image Viewer Modal - chỉ hiển thị khi có selectedItem */}
        {isCustomView && selectedItem && (
          <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeImage()}>
            <DialogContent 
              className="max-w-[100vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-screen sm:max-h-[95vh] p-0 bg-[#f5f5f0] border-none m-0 sm:m-4 rounded-none sm:rounded-lg"
              showCloseButton={false}
            >
              {selectedImageIndex !== null && selectedItem.images && (
                <div className="relative w-full h-screen sm:h-[90vh] flex items-center justify-center">
                  {/* Close Button */}
                  <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
                    <XIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                  </DialogClose>

                  {/* Previous Button */}
                  {selectedItem.images.length > 1 && (
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
                      src={selectedItem.images[selectedImageIndex]}
                      alt={`${selectedItem.name} - Image ${selectedImageIndex + 1}`}
                      width={1920}
                      height={1080}
                      className="max-w-full max-h-full object-contain"
                      priority
                    />
                  </div>

                  {/* Next Button */}
                  {selectedItem.images.length > 1 && (
                    <button
                      onClick={goToNext}
                      className="absolute right-3 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 md:p-3 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                  )}

                  {/* Image Counter */}
                  {selectedItem.images.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm touch-manipulation">
                      {selectedImageIndex + 1} / {selectedItem.images.length}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
