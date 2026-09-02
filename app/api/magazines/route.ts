import { NextRequest, NextResponse } from "next/server"
import {
  getAllMagazines,
  createMagazine,
  getMagazineById,
  updateMagazine,
  deleteMagazine,
} from "@/lib/magazines-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const magazine = getMagazineById(id)
      if (!magazine) {
        return NextResponse.json({ error: "Magazine not found" }, { status: 404 })
      }
      return NextResponse.json(magazine)
    }

    const magazines = getAllMagazines()
    return NextResponse.json(magazines)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch magazines" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, images } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      )
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      )
    }

    const newMagazine = createMagazine({ title, content, images })
    return NextResponse.json(newMagazine, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create magazine" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, images } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const updated = updateMagazine(id, { title, content, images })
    if (!updated) {
      return NextResponse.json({ error: "Magazine not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update magazine" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const deleted = deleteMagazine(id)
    if (!deleted) {
      return NextResponse.json({ error: "Magazine not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete magazine" }, { status: 500 })
  }
}

