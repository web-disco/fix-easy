import React from "react"
import useSWR from "swr"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import { ImSpinner } from "react-icons/im"

const Gallery = ({ module }) => {
  const { customFields } = module

  // fetcher for swr
  const fetcher = url =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        Apikey: `${process.env.GATSBY_AGILITY_API_KEY}`,
      },
    }).then(res => res.json())

  // fetch gallery
  const { data, error } = useSWR(
    `/api/gallery?id=${customFields.gallery.galleryid}`,
    fetcher
  )
  // error fetching gallery
  if (error) {
    return (
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto text-center py-20">
        <p className="text-4xl">We're sorry, we could not load gallery...</p>
      </div>
    )
  }

  // loading gallery
  if (!data) {
    return (
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto text-center py-20">
        <ImSpinner className="animate-spin text-4xl text-orange" />
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl px-4 md:px-8 mx-auto my-12">
      <SimpleReactLightbox>
        <SRLWrapper>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {data.media.map((image, index) => (
              <a href={image.url} key={index}>
                <AgilityImage
                  image={image}
                  layout="fullWidth"
                  className="rounded-md"
                />
              </a>
            ))}
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  )
}

export default Gallery
