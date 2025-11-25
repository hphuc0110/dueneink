// Data structure for tattoos and digital art collections
// Bạn có thể thêm danh sách vào đây sau

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
    images: ["/img/ANIMALMINITATTOO/A1.WEBP", "/img/ANIMALMINITATTOO/A2.WEBP","/img/ANIMALMINITATTOO/A3.WEBP","/img/ANIMALMINITATTOO/A4.WEBP","/img/ANIMALMINITATTOO/A5.WEBP","/img/ANIMALMINITATTOO/A6.WEBP","/img/ANIMALMINITATTOO/A7.WEBP","/img/ANIMALMINITATTOO/A8.WEBP","/img/ANIMALMINITATTOO/A9.WEBP","/img/ANIMALMINITATTOO/A10.WEBP","/img/ANIMALMINITATTOO/A11.WEBP","/img/ANIMALMINITATTOO/A12.WEBP"],
  },
  {
    id: "tattoo-2",
    name: "BLACKWORK TATTOOS",
    images: ["/img/3_1.webp", "/img/3_2.webp"],
  },
  {
    id: "tattoo-3",
    name: "COLOR TATTOOS",
    images: ["/img/COLORTATTOO/C1.WEBP", "/img/COLORTATTOO/C2.WEBP","/img/COLORTATTOO/C3.WEBP","/img/COLORTATTOO/C4.WEBP","/img/COLORTATTOO/C5.WEBP","/img/COLORTATTOO/C6.WEBP","/img/COLORTATTOO/C7.WEBP","/img/COLORTATTOO/C8.WEBP","/img/COLORTATTOO/C9.WEBP","/img/COLORTATTOO/C10.WEBP","/img/COLORTATTOO/C11.WEBP","/img/COLORTATTOO/C12.WEBP","/img/COLORTATTOO/C13.WEBP","/img/COLORTATTOO/C14.WEBP","/img/COLORTATTOO/C15.WEBP"],
  },    
  {
    id: "tattoo-4",
    name: "COLOR FIX TATTOOS",
    images: ["/img/COLORFIXTATTOO/CF1.WEBP", "/img/COLORFIXTATTOO/CF2.WEBP","/img/COLORFIXTATTOO/CF3.WEBP","/img/COLORFIXTATTOO/CF4.WEBP","/img/COLORFIXTATTOO/CF5.WEBP","/img/COLORFIXTATTOO/CF6.WEBP","/img/COLORFIXTATTOO/CF7.WEBP"],
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

