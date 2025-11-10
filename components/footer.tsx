import { Button } from "@/components/ui/button"

interface SocialMediaLink {
  name: string
  url: string
}

interface FooterProps {
  imageSrc?: string
  headingText?: string | React.ReactNode
  buttonText?: string
  buttonLink?: string
  address?: string
  email?: string
  socialMedia?: SocialMediaLink[]
}

export function Footer({
  imageSrc = "/img/9.webp",
  headingText = (
    <>
      We'll be in
      <br />
      touch soon
    </>
  ),
  buttonText = "EXPLORE THE PRODUCT",
  buttonLink,
  address = "1, Lane 169 Tay Son Street, Hanoi, Vietnam",
  email = "duene.tattoostudio@gmail.com",
  socialMedia = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/Duene.inktattoo",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/duene.inkstudio?igsh=eWlyMTJvNDMydGJ1",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@duene.studio?_r=1&_t=ZS-91B6tuiP1Dc",
    },
  ],
}: FooterProps) {
  return (
    <footer className="relative min-h-[500px] sm:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="Footer background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[500px] sm:h-[600px] flex-col justify-between px-6 py-8 sm:px-12 sm:py-12">
        {/* Main Content */}
        <div className="flex flex-1 items-center justify-between
                        md:flex-row flex-col text-center md:text-left gap-6 md:gap-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight text-white">
            {headingText}
          </h2>
          {buttonLink ? (
            <a href={buttonLink}>
              <Button
                variant="outline"
                className="rounded-full border-white bg-transparent px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 
                           text-xs sm:text-sm text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
              >
                {buttonText}
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              className="rounded-full border-white bg-transparent px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 
                         text-xs sm:text-sm text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          )}
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-white text-center md:text-left mt-6 sm:mt-0">
          <div>
            <h3 className="mb-2 font-medium">Address</h3>
            <p className="text-white/70 break-words">{address}</p>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Social media</h3>
            <div className="flex md:flex-col justify-center md:justify-start space-x-3 md:space-x-0 md:space-y-1 text-white/70">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Email</h3>
            <p className="text-white/70 break-words">{email}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
