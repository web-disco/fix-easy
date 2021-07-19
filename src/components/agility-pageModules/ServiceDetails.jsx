import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { renderHTML } from "../../agility/utils"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import SwiperCore, { Navigation } from "swiper"
import "swiper/components/navigation/navigation.min.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import TitleSection from "../common/TitleSection"
import ServiceCTA from "../common/ServiceCTA"

// install Swiper modules
SwiperCore.use([Navigation])

const ServiceDetails = ({ dynamicPageItem }) => {
  // get module fields
  const { customFields } = dynamicPageItem

  // set up gallery
  const [gallery, setGallery] = useState(null)

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

  // get services list
  const data = useStaticQuery(graphql`
    query {
      allAgilityService {
        nodes {
          contentID
          linkedContent_agilityServiceDetails {
            customFields {
              detail
            }
          }
        }
      }
    }
  `)

  // get services
  const services = data.allAgilityService.nodes

  // filter out the service we're looking for to so we can also get linked content
  const service = services.filter(
    service => service.contentID === dynamicPageItem.contentID
  )

  return (
    <>
      <div className="bg-lighterGrey py-28">
        <div className="max-w-screen-xl mx-auto text-center px-4 md:px-8">
          <h1 className="text-4xl font-bold my-2">{customFields.title}</h1>
        </div>
      </div>
      <div className="bg-orange">
        <Link
          to="/contact"
          title="Contact us today for a free consultation"
          className="text-white font-medium"
        >
          <div className="max-w-screen-xl mx-auto py-3 px-4 flex items-center">
            <p className="mr-4">Contact us today for a free consultation</p>
            <FaChevronRight />
          </div>
        </Link>
      </div>
      <div className="py-8">
        <div
          className="max-w-screen-xl mx-auto px-4 prose text-lightGrey"
          dangerouslySetInnerHTML={renderHTML(customFields.fullDescription)}
        />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 mb-8">
        <Swiper
          spaceBetween={40}
          loop={true}
          navigation={{
            nextEl: ".service-swiper-button-next",
            prevEl: ".service-swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 3,
            },
          }}
        >
          {gallery &&
            gallery.media.map((image, index) => (
              <SwiperSlide key={index}>
                <AgilityImage
                  image={image}
                  layout="fullWidth"
                  className="rounded-md"
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="flex justify-end mt-8">
          <button
            className="service-swiper-button-prev focus:outline-none"
            title="Previous Slide"
          >
            <FaChevronLeft className="text-orange text-2xl mr-4" />
          </button>
          <button
            className="service-swiper-button-next focus:outline-none"
            title="Next Slide"
          >
            <FaChevronRight className="text-orange text-2xl" />
          </button>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 mb-20">
        <TitleSection title={`${customFields.title} Services`} />
        <ul className="grid grid-cols-1 md:grid-cols-3">
          {service[0].linkedContent_agilityServiceDetails.map(
            (detail, index) => (
              <li className="text-lightGrey mb-2" key={index}>
                {detail.customFields.detail}
              </li>
            )
          )}
        </ul>
      </div>
      <ServiceCTA title={customFields.cTAButtonLabel} />
    </>
  )
}

export default ServiceDetails
