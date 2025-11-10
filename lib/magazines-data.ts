// Simple in-memory storage for magazines
// In production, you should use a database

export interface MagazineArticle {
  id: string
  title: string
  content: string
  images: string[] // Array of image URLs
  createdAt: string
  updatedAt: string
}

let magazines: MagazineArticle[] = []

export function getAllMagazines(): MagazineArticle[] {
  return magazines.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getMagazineById(id: string): MagazineArticle | undefined {
  return magazines.find((m) => m.id === id)
}

export function createMagazine(article: Omit<MagazineArticle, "id" | "createdAt" | "updatedAt">): MagazineArticle {
  const newArticle: MagazineArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  magazines.push(newArticle)
  return newArticle
}

export function updateMagazine(id: string, updates: Partial<Omit<MagazineArticle, "id" | "createdAt">>): MagazineArticle | null {
  const index = magazines.findIndex((m) => m.id === id)
  if (index === -1) return null

  magazines[index] = {
    ...magazines[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return magazines[index]
}

export function deleteMagazine(id: string): boolean {
  const index = magazines.findIndex((m) => m.id === id)
  if (index === -1) return false
  magazines.splice(index, 1)
  return true
}

