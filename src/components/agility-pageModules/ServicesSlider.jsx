import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import TitleSection from "../common/TitleSection"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import SwiperCore, { Navigation } from "swiper"
import "swiper/components/navigation/navigation.min.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"

// install Swiper modules
SwiperCore.use([Navigation])

const ServicesSlider = ({ module }) => {
  // module fields
  const { customFields } = module

  // query for services
  const data = useStaticQuery(graphql`
    query {
      services: allAgilityService {
        nodes {
          customFields {
            icon {
              url
              label
            }
            shortDescription
            title
            uRL
          }
        }
      }
    }
  `)

  // set services
  const services = data.services.nodes

  return (
    <div className="max-w-screen-xl mx-auto px-4 mb-20" id="services">
      <TitleSection
        subTitle={customFields.subTitle}
        title={customFields.title}
      />
      <Swiper
        spaceBetween={40}
        navigation={{
          nextEl: ".services-swiper-button-next",
          prevEl: ".services-swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 4,
          },
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <Link to={`/services/${service.customFields.uRL}`}>
              <div>
                <img
                  src={service.customFields.icon.url}
                  alt={service.customFields.icon.label}
                />
                <h4 className="text-darkGrey font-bold my-2">
                  {service.customFields.title}
                </h4>
                <p className="text-lightGrey">
                  {service.customFields.shortDescription}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-end mt-8">
        <button className="services-swiper-button-prev focus:outline-none">
          <FaChevronLeft className="text-orange text-2xl mr-4" />
        </button>
        <button className="services-swiper-button-next focus:outline-none">
          <FaChevronRight className="text-orange text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default ServicesSlider
