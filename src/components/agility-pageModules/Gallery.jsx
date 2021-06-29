import React, { useEffect, useState } from "react"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

const Gallery = ({ module }) => {
  const { customFields } = module

  // set up gallery
  const [gallery, setGallery] = useState({
    media: [],
  })

  // fetch gallery on component load
  useEffect(() => {
    // get gallery function
    const getGallery = async () => {
      const gallery = await fetch(
        `/api/gallery?id=${customFields.gallery.galleryid}`
      )
      setGallery(await gallery.json())
    }

    // call get gallery
    getGallery()
  }, [customFields.gallery.galleryid])

  return (
    <div className="max-w-screen-xl px-4 md:px-8 mx-auto my-12">
      {gallery && gallery.media.length > 0 ? (
        <SimpleReactLightbox>
          <SRLWrapper>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {gallery.media.map((image, index) => (
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
      ) : (
        <div className="text-center py-20 text-4xl">
          The gallery could not be loaded at this time.
        </div>
      )}
    </div>
  )
}

export default Gallery
