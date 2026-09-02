"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { ArrowUp, ArrowDown, X, GripVertical, Eye, Edit, Image as ImageIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface MagazineArticle {
  id: string
  title: string
  content: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export default function AdminMagazinesPage() {
  const [magazines, setMagazines] = useState<MagazineArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [] as string[],
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [contentCursorPosition, setContentCursorPosition] = useState<number>(0)
  const [imageSizes, setImageSizes] = useState<Array<{ width: number; height: number; enabled: boolean }>>([])

  useEffect(() => {
    fetchMagazines()
  }, [])

  const fetchMagazines = async () => {
    try {
      const response = await fetch("/api/magazines")
      const data = await response.json()
      setMagazines(data)
    } catch (error) {
      console.error("Failed to fetch magazines:", error)
      toast.error("Failed to load magazines")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast.error("Please fill in title and content")
      return
    }

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image")
      return
    }

    try {
      if (editingId) {
        // Update existing
        const response = await fetch("/api/magazines", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...formData }),
        })

        if (response.ok) {
          toast.success("Article updated successfully")
          setEditingId(null)
          setFormData({ title: "", content: "", images: [] })
          setSelectedFiles([])
          setPreviewUrls([])
          setImageSizes([])
          fetchMagazines()
        } else {
          toast.error("Failed to update article")
        }
      } else {
        // Create new
        const response = await fetch("/api/magazines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          toast.success("Article created successfully")
          setFormData({ title: "", content: "", images: [] })
          setSelectedFiles([])
          setPreviewUrls([])
          setImageSizes([])
          fetchMagazines()
        } else {
          toast.error("Failed to create article")
        }
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred")
    }
  }

  const handleEdit = (magazine: MagazineArticle) => {
    setEditingId(magazine.id)
    setFormData({
      title: magazine.title,
      content: magazine.content,
      images: magazine.images || [],
    })
    setSelectedFiles([])
    setPreviewUrls([])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const response = await fetch(`/api/magazines?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Article deleted successfully")
        fetchMagazines()
      } else {
        toast.error("Failed to delete article")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred")
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ title: "", content: "", images: [] })
    setSelectedFiles([])
    setPreviewUrls([])
    setImageSizes([])
  }

  const resizeImage = (file: File, width: number, height: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement("img")
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          
          if (!ctx) {
            reject(new Error("Could not get canvas context"))
            return
          }

          // Calculate aspect ratio
          const imgAspect = img.width / img.height
          const targetAspect = width / height
          
          let sourceX = 0
          let sourceY = 0
          let sourceWidth = img.width
          let sourceHeight = img.height

          // Crop to fit target aspect ratio (center crop)
          if (imgAspect > targetAspect) {
            // Image is wider, crop width
            sourceWidth = img.height * targetAspect
            sourceX = (img.width - sourceWidth) / 2
          } else {
            // Image is taller, crop height
            sourceHeight = img.width / targetAspect
            sourceY = (img.height - sourceHeight) / 2
          }

          canvas.width = width
          canvas.height = height

          // Draw and resize image
          ctx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, width, height
          )

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
                resolve(resizedFile)
              } else {
                reject(new Error("Failed to create blob"))
              }
            },
            file.type,
            0.9 // Quality
          )
        }
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = e.target?.result as string
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const validFiles: File[] = []

    files.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`)
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`)
        return
      }

      validFiles.push(file)
    })

    // Process all files and maintain order
    const previews: string[] = []
    const newSizes: Array<{ width: number; height: number; enabled: boolean }> = []
    let loadedCount = 0

    validFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = document.createElement("img")
        img.onload = () => {
          previews[index] = reader.result as string
          newSizes[index] = {
            width: img.width,
            height: img.height,
            enabled: false,
          }
          loadedCount++
          
          // Update state when all images are loaded
          if (loadedCount === validFiles.length) {
            setPreviewUrls((prev) => [...prev, ...previews])
            setImageSizes((prev) => [...prev, ...newSizes])
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    })

    setSelectedFiles([...selectedFiles, ...validFiles])
  }

  const handleUploadAll = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files first")
      return
    }

    // Validate all enabled resize settings
    for (let i = 0; i < imageSizes.length; i++) {
      const size = imageSizes[i]
      if (size.enabled && (size.width <= 0 || size.height <= 0)) {
        toast.error(`Please enter valid width and height for image ${i + 1} (greater than 0)`)
        return
      }
    }

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        let fileToUpload = file

        // Resize image if enabled for this specific image
        const size = imageSizes[i]
        if (size && size.enabled && size.width > 0 && size.height > 0) {
          try {
            fileToUpload = await resizeImage(file, size.width, size.height)
          } catch (error) {
            console.error(`Failed to resize ${file.name}:`, error)
            toast.error(`Failed to resize ${file.name}, uploading original`)
          }
        }

        const uploadFormData = new FormData()
        uploadFormData.append("file", fileToUpload)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        })

        const data = await response.json()

        if (response.ok && data.url) {
          uploadedUrls.push(data.url)
        } else {
          toast.error(`Failed to upload ${file.name}`)
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData({ ...formData, images: [...formData.images, ...uploadedUrls] })
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`)
        setSelectedFiles([])
        setPreviewUrls([])
        setImageSizes([])
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("An error occurred while uploading")
    } finally {
      setUploading(false)
    }
  }

  const updateImageSize = (index: number, field: "width" | "height" | "enabled", value: number | boolean) => {
    const newSizes = [...imageSizes]
    if (!newSizes[index]) {
      newSizes[index] = { width: 0, height: 0, enabled: false }
    }
    newSizes[index] = { ...newSizes[index], [field]: value }
    setImageSizes(newSizes)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...formData.images]
    if (direction === "up" && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
    } else if (direction === "down" && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
    }
    setFormData({ ...formData, images: newImages })
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...formData.images]
    const draggedItem = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedItem)
    setFormData({ ...formData, images: newImages })
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleInsertImage = (imageIndex: number) => {
    const imageTag = `[IMAGE:${imageIndex}]`
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newContent =
        formData.content.substring(0, start) + imageTag + formData.content.substring(end)
      setFormData({ ...formData, content: newContent })
      
      // Set cursor position after inserted image tag
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + imageTag.length, start + imageTag.length)
      }, 0)
    } else {
      // Fallback: append to end
      setFormData({ ...formData, content: formData.content + "\n\n" + imageTag + "\n\n" })
    }
    toast.success(`Image ${imageIndex + 1} inserted into content`)
  }

  const renderPreviewContent = (content: string, images: string[]) => {
    const parts = content.split(/(\[IMAGE:\d+\])/g)
    return parts.map((part, index) => {
      const imageMatch = part.match(/\[IMAGE:(\d+)\]/)
      if (imageMatch) {
        const imageIndex = parseInt(imageMatch[1])
        if (images[imageIndex]) {
          return (
            <div key={index} className="my-6">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden">
                <Image
                  src={images[imageIndex]}
                  alt={`Image ${imageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )
        }
        return null
      }
      if (part.trim()) {
        return (
          <p key={index} className="mb-4 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {part}
          </p>
        )
      }
      return null
    })
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      <section className="py-12 sm:py-16 md:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                Admin - Magazines
              </h1>
              <p className="text-muted-foreground">Manage your magazine articles</p>
            </div>
            <Link href="/magazines">
              <Button variant="outline">View Magazines</Button>
            </Link>
          </div>

          {/* Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Article" : "Create New Article"}</CardTitle>
              <CardDescription>
                {editingId ? "Update the article details" : "Add a new article to your magazine"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Images ({formData.images.length})</Label>
                  
                  {/* Upload File Section */}
                  <div className="space-y-2 border rounded-lg p-4 bg-muted/30">
                    <Label htmlFor="file-upload" className="text-sm font-medium">
                      Upload Image Files (Multiple)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                        disabled={uploading}
                      />
                      {selectedFiles.length > 0 && (
                        <Button
                          type="button"
                          onClick={handleUploadAll}
                          disabled={uploading}
                          size="sm"
                        >
                          {uploading ? "Uploading..." : `Upload ${selectedFiles.length} File(s)`}
                        </Button>
                      )}
                    </div>
                    
                    {selectedFiles.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {selectedFiles.length} file(s) selected
                      </p>
                    )}
                    {previewUrls.length > 0 && (
                      <div className="space-y-4 mt-4">
                        {previewUrls.map((url, index) => {
                          const size = imageSizes[index] || { width: 0, height: 0, enabled: false }
                          return (
                            <div key={index} className="border rounded-lg p-3 bg-white">
                              <div className="flex gap-3">
                                <div className="relative w-24 h-24 rounded-md overflow-hidden border shrink-0">
                                  <Image
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">
                                      Ảnh {index + 1}
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`enable-resize-${index}`}
                                        checked={size.enabled}
                                        onChange={(e) => updateImageSize(index, "enabled", e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                        disabled={uploading}
                                      />
                                      <Label htmlFor={`enable-resize-${index}`} className="text-xs cursor-pointer">
                                        Điều chỉnh kích thước
                                      </Label>
                                    </div>
                                  </div>
                                  {size.enabled && (
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="space-y-1">
                                        <Label htmlFor={`image-width-${index}`} className="text-xs">
                                          Chiều rộng (px)
                                        </Label>
                                        <Input
                                          id={`image-width-${index}`}
                                          type="number"
                                          min="1"
                                          value={size.width || ""}
                                          onChange={(e) => updateImageSize(index, "width", parseInt(e.target.value) || 0)}
                                          placeholder="Width"
                                          disabled={uploading}
                                          className="h-8"
                                        />
                                      </div>
                                      <div className="space-y-1">
                                        <Label htmlFor={`image-height-${index}`} className="text-xs">
                                          Chiều cao (px)
                                        </Label>
                                        <Input
                                          id={`image-height-${index}`}
                                          type="number"
                                          min="1"
                                          value={size.height || ""}
                                          onChange={(e) => updateImageSize(index, "height", parseInt(e.target.value) || 0)}
                                          placeholder="Height"
                                          disabled={uploading}
                                          className="h-8"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {size.enabled && size.width > 0 && size.height > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Ảnh sẽ được cắt và điều chỉnh về {size.width} x {size.height} px
                                    </p>
                                  )}
                                  {!size.enabled && (
                                    <p className="text-xs text-muted-foreground">
                                      Kích thước gốc: {size.width} x {size.height} px
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Images List with Drag & Drop */}
                  {formData.images.length > 0 && (
                    <div className="space-y-2 border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">
                          Uploaded Images (Click to insert into content)
                        </Label>
                      </div>
                      <div className="space-y-2">
                        {formData.images.map((imageUrl, index) => (
                          <div
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`flex items-center gap-2 p-2 border rounded-lg bg-white hover:bg-muted/50 transition-colors cursor-move ${
                              draggedIndex === index ? "opacity-50" : ""
                            }`}
                          >
                            <GripVertical className="w-5 h-5 text-muted-foreground shrink-0" />
                            <div className="relative w-20 h-20 rounded-md overflow-hidden border shrink-0">
                              <Image
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground truncate">
                                Image {index + 1}
                              </p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleInsertImage(index)}
                                title="Insert into content"
                                className="h-8"
                              >
                                <ImageIcon className="w-4 h-4 mr-1" />
                                Insert
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMoveImage(index, "up")}
                                disabled={index === 0}
                                title="Move up"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMoveImage(index, "down")}
                                disabled={index === formData.images.length - 1}
                                title="Move down"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleRemoveImage(index)}
                                title="Remove"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Tip: Use [IMAGE:0], [IMAGE:1], etc. in your content to place images. Or click "Insert" button.
                      </p>
                    </div>
                  )}

                  {formData.images.length === 0 && selectedFiles.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Please upload at least one image to continue
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  
                  <Tabs defaultValue="edit" className="w-full">
                    <TabsList>
                      <TabsTrigger value="edit">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </TabsTrigger>
                      <TabsTrigger value="preview">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="mt-2">
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        onSelect={(e) => {
                          const target = e.target as HTMLTextAreaElement
                          setContentCursorPosition(target.selectionStart)
                        }}
                        placeholder="Enter article content. Use [IMAGE:0], [IMAGE:1], etc. to insert images at specific positions."
                        rows={15}
                        required
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Tip: Click "Insert" button on images above, or type [IMAGE:0], [IMAGE:1], etc. where you want images to appear.
                      </p>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-2">
                      <div className="border rounded-lg p-6 bg-white min-h-[300px]">
                        <div className="prose prose-lg max-w-none">
                          {formData.content ? (
                            renderPreviewContent(formData.content, formData.images)
                          ) : (
                            <p className="text-muted-foreground">No content yet. Start typing in edit mode.</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Update Article" : "Create Article"}</Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Articles List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">All Articles ({magazines.length})</h2>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : magazines.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-muted-foreground">No articles yet. Create your first one above!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {magazines.map((magazine) => (
                  <Card key={magazine.id}>
                    <div className="relative w-full h-48">
                      <Image
                        src={magazine.images?.[0] || "/placeholder.jpg"}
                        alt={magazine.title}
                        fill
                        className="object-cover"
                      />
                      {magazine.images && magazine.images.length > 1 && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                            +{magazine.images.length - 1} more
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{magazine.title}</CardTitle>
                      <CardDescription>
                        {new Date(magazine.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {magazine.content}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(magazine)}
                          className="flex-1"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(magazine.id)}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer imageSrc="/img/9.webp" />
    </main>
  )
}
