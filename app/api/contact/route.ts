import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phoneOrInstagram, email, contactTimes, demoTiming } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Get Google Apps Script URL from environment variable
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!scriptUrl) {
      console.error("GOOGLE_APPS_SCRIPT_URL is not set")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Get current date/time in GMT+7 (Vietnam timezone - Asia/Ho_Chi_Minh)
    const now = new Date()
    
    // Format timestamp in GMT+7 timezone for Google Sheets
    // Using toLocaleString with timezone option for accurate conversion
    const timestamp = now.toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    // Convert from MM/DD/YYYY, HH:MM:SS to YYYY-MM-DD HH:MM:SS
    const [datePart, timePart] = timestamp.split(', ')
    const [month, day, year] = datePart.split('/')
    const formattedTimestamp = `${year}-${month}-${day} ${timePart}`

    // Prepare data for Google Sheets
    const sheetData = {
      name: name.trim(),
      phoneOrInstagram: phoneOrInstagram?.trim() || "",
      email: email.trim(),
      contactTimes: Array.isArray(contactTimes) ? contactTimes.join(", ") : contactTimes || "",
      demoTiming: demoTiming?.trim() || "",
      timestamp: formattedTimestamp,
    }

    // Send data to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Google Apps Script error:", errorText)
      return NextResponse.json(
        { error: "Failed to save contact information" },
        { status: 500 }
      )
    }

    const result = await response.json()

    return NextResponse.json(
      { success: true, message: "Contact information submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}

