export interface Artist {
  id: string
  slug: string
  name: string
  role: string
  style: string
  bio: string
  image: string
  /** Big title at top of profile (e.g. "BOSS") */
  headerTitle?: string
  /** Name shown next to "Name:" in profile (independent from name/headerTitle) */
  profileName?: string
  age?: string
  from?: string
  /** Long bio for "About him/her" section, can be multi-paragraph */
  about?: string
  /** Label for about section, e.g. "About her:" or "About him:" */
  aboutLabel?: string
  /** Image paths for View Gallery grid */
  galleryImages?: string[]
}

export const artistsList: Artist[] = [
  {
    id: "artist-1",
    slug: "phuongbee",
    name: "Phuongbee",
    role: "Tattoo Artist",
    style: "Fine line • Minimal • Custom",
    bio: " She's a new tattoo artist who recently joined the Duene family. With over 6 years of experience, she can transform your ideas onto your skin.",
    image: "/img/ARTIST/phuong/phuongbee.webp",
    headerTitle: "Phuongbee",
    profileName: "Nguyen Mai Phuong",
    aboutLabel: "About her:",
    age: "23",
    from: "Ha Tinh, Viet Nam",
    about:
      "Bringing fine-art discipline into tattoo, PhuongBee focuses on emotional storytelling and delicate composition on skin. Each piece is a collaboration between artist and wearer.",
    galleryImages: [
      "/img/ARTIST/phuong/phuong1.webp",
      "/img/ARTIST/phuong/phuong2.webp",
      "/img/ARTIST/phuong/phuong3.webp",
      "/img/ARTIST/phuong/phuong4.webp",
      "/img/ARTIST/phuong/phuong5.webp",
      "/img/ARTIST/phuong/phuong6.webp",
      "/img/ARTIST/phuong/phuong7.webp",
      "/img/ARTIST/phuong/phuong8.webp",
      "/img/ARTIST/phuong/phuong9.webp",
      "/img/ARTIST/phuong/phuong10.webp",
      "/img/ARTIST/phuong/phuong11.webp",
      "/img/ARTIST/phuong/phuong12.webp",
    ],
  },
  {
    id: "artist-2",
    slug: "stush",
    name: "Stush",
    role: "Tattoo Artist",
    style: "Illustration • Character • Bold",
    bio: "Loves bold palettes and playful forms, blending illustration and design language into vibrant tattoos.",
    image: "/img/ARTWORK/12.webp",
    headerTitle: "BOSS",
    profileName: "Stush",
    age: "???",
    from: "Ha Noi, Viet Nam",
    about: `I just had a hunch. I'm a sensitive person. And artists are sensitive to change, so I've earned that label of being an artist. I receive signals and try to understand what the universe wants me to do. I still consider myself dramatic because of my perspective.

"Who am I? This club, this foundation, will be who I am, what I am. I have to build this so artists and people like me finally have a home, somewhere safe—a place where they belong, a place where I belong."

"Welcome to the era."`,
    galleryImages: [
      "/img/ARTIST/stush/1.webp",
      "/img/ARTIST/stush/2.webp",
      "/img/ARTIST/stush/3.webp",
      "/img/ARTIST/stush/4.webp",
      "/img/ARTIST/stush/5.webp",
      "/img/ARTIST/stush/6.webp",
      "/img/ARTIST/stush/7.webp",
      "/img/ARTIST/stush/9.webp",
      "/img/ARTIST/stush/10.webp",
      "/img/ARTIST/stush/11.webp",
      "/img/ARTIST/stush/12.webp",
      "/img/ARTIST/stush/13.webp",
      "/img/ARTIST/stush/14.webp",
      "/img/ARTIST/stush/15.webp",
      "/img/ARTIST/stush/16.webp",
      "/img/ARTIST/stush/17.webp",
      "/img/ARTIST/stush/18.webp",
      "/img/ARTIST/stush/19.webp",
      "/img/ARTIST/stush/20.webp",
      "/img/ARTIST/stush/21.webp",
      "/img/ARTIST/stush/22.webp",
      "/img/ARTIST/stush/23.webp",
      "/img/ARTIST/stush/24.webp",
      "/img/ARTIST/stush/25.webp",
    ],
  },
  {
    id: "artist-3",
    slug: "duy-ng",
    name: "Duy Ng",
    role: "Tattoo Artist",
    style: "Realistic • Portrait • Blackwork",
    bio: "Focuses on precise realism and strong composition, creating pieces with deep personal meaning.",
    image: "/img/ARTIST/duyng/duy.webp",
    headerTitle: "Duy Ng",
    profileName: "Nguyen Duy Anh",
    age: "22",
    from: "Ha Noi, Viet Nam",
    about:
      "He's been with Duene since the beginning. With over 5 years of experience and a never-ending learning spirit, no tattoo is too difficult for this tattoo artist.",
    galleryImages: [
      "/img/ARTIST/duyng/1.webp",
      "/img/ARTIST/duyng/2.webp",
      "/img/ARTIST/duyng/3.webp",
      "/img/ARTIST/duyng/4.webp",
      "/img/ARTIST/duyng/5.webp",
      "/img/ARTIST/duyng/6.webp",
      "/img/ARTIST/duyng/7.webp",
      "/img/ARTIST/duyng/8.webp",
      "/img/ARTIST/duyng/9.webp",
      "/img/ARTIST/duyng/10.webp",
      "/img/ARTIST/duyng/11.webp",
      "/img/ARTIST/duyng/12.webp",
      "/img/ARTIST/duyng/13.webp",
      "/img/ARTIST/duyng/14.webp",
      "/img/ARTIST/duyng/15.webp",
      "/img/ARTIST/duyng/16.webp",
      "/img/ARTIST/duyng/17.webp",
      "/img/ARTIST/duyng/18.webp",
    ],
  },
]

export function getArtistBySlug(slug: string): Artist | undefined {
  return artistsList.find((a) => a.slug === slug)
}
