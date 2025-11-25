// Data structure for tattoos and digital art collections
// Bạn có thể thêm danh sách vào đây sau
import a1 from "@/public/img/ANIMALMINITATTOO/A1.webp"  
import a2 from "@/public/img/ANIMALMINITATTOO/A2.webp"
import a3 from "@/public/img/ANIMALMINITATTOO/A3.webp"
import a4 from "@/public/img/ANIMALMINITATTOO/A4.webp"
import a5 from "@/public/img/ANIMALMINITATTOO/A5.webp"
import a6 from "@/public/img/ANIMALMINITATTOO/A6.webp"
import a7 from "@/public/img/ANIMALMINITATTOO/A7.webp"
import a8 from "@/public/img/ANIMALMINITATTOO/A8.webp"
import a9 from "@/public/img/ANIMALMINITATTOO/A9.webp"
import a10 from "@/public/img/ANIMALMINITATTOO/A10.webp"
import a11 from "@/public/img/ANIMALMINITATTOO/A11.webp"
import a12 from "@/public/img/ANIMALMINITATTOO/A12.webp"    
import c1 from "@/public/img/COLORTATTOO/C1.webp"
import c2 from "@/public/img/COLORTATTOO/C2.webp"
import c3 from "@/public/img/COLORTATTOO/C3.webp"
import c4 from "@/public/img/COLORTATTOO/C4.webp"
import c5 from "@/public/img/COLORTATTOO/C5.webp"
import c6 from "@/public/img/COLORTATTOO/C6.webp"
import c7 from "@/public/img/COLORTATTOO/C7.webp"
import c8 from "@/public/img/COLORTATTOO/C8.webp"
import c9 from "@/public/img/COLORTATTOO/C9.webp"
import c10 from "@/public/img/COLORTATTOO/C10.webp"
import c11 from "@/public/img/COLORTATTOO/C11.webp"
import c12 from "@/public/img/COLORTATTOO/C12.webp"
import c13 from "@/public/img/COLORTATTOO/C13.webp"
import c14 from "@/public/img/COLORTATTOO/C14.webp"
import c15 from "@/public/img/COLORTATTOO/C15.webp"
import cf1 from "@/public/img/COLORFIXTATTOO/CF1.webp"
import cf2 from "@/public/img/COLORFIXTATTOO/CF2.webp"
import cf3 from "@/public/img/COLORFIXTATTOO/CF3.webp"
import cf4 from "@/public/img/COLORFIXTATTOO/CF4.webp"
import cf5 from "@/public/img/COLORFIXTATTOO/CF5.webp"
import cf6 from "@/public/img/COLORFIXTATTOO/CF6.webp"
import cf7 from "@/public/img/COLORFIXTATTOO/CF7.webp"


export interface TattooItem {
  id: string
  name: string
  images: string[]
}

export interface DigitalArtItem {
  id: string
  name: string
  images: string[]
}

// Danh sách tattoos - bạn sẽ thêm vào sau
export const tattoosList: TattooItem[] = [
  {
    id: "tattoo-1",
    name: "ANIMAL MINI TATTOO",
    images: [a1.src, a2.src, a3.src, a4.src, a5.src, a6.src, a7.src, a8.src, a9.src, a10.src, a11.src, a12.src],
  },
  {
    id: "tattoo-2",
    name: "BLACKWORK TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-3",
    name: "COLOR TATTOOS",
    images: [c1.src, c2.src, c3.src, c4.src, c5.src, c6.src, c7.src, c8.src, c9.src, c10.src, c11.src, c12.src, c13.src, c14.src, c15.src],
  },    
  {
    id: "tattoo-4",
    name: "COLOR FIX TATTOOS",
    images: [cf1.src, cf2.src, cf3.src, cf4.src, cf5.src, cf6.src, cf7.src],
  },
  {
    id: "tattoo-5",
    name: "CRAYON TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-6",
    name: "FAMILY TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-7",
    name: "PORTRAIT TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-8",
    name: "REALISTIC TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-9",
    name: "STUPID MINI TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-10",
    name: "VIETNAMESE TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
]

// Danh sách digital art - bạn sẽ thêm vào sau
export const digitalArtList: DigitalArtItem[] = [
  {
    id: "digital-1",
    name: "DIGITAL ART",
    images: ["/img/3_3.webp", "/img/3_4.webp"],
  },
]

