import React from "react"
import { Link } from "gatsby"
import SiteHeader from "../components/common/SiteHeader"
import SiteFooter from "../components/common/SiteFooter"
import { graphql, useStaticQuery } from "gatsby"
import TitleSection from "../components/common/TitleSection"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import SwiperCore, { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/components/navigation/navigation.min.css"
import "swiper/swiper-bundle.min.css"

// install Swiper modules
SwiperCore.use([Navigation, Autoplay])

const Error404 = () => {
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
    <>
      <SiteHeader />
      <div className="bg-lighterGrey py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto text-center px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-4 text-darkGrey">Error 404</h1>
          <p className="max-w-md mx-auto mb-8 text-darkGrey">
            We're sorry, we couldn't find what you were looking for.
          </p>
        </div>
      </div>
      <div className="bg-orange">
        <Link
          to="/"
          title="Return Home"
          className="text-lighterGrey font-medium"
        >
          <div className="max-w-screen-xl mx-auto py-3 px-4 md:px-8 flex items-center">
            <p className="mr-4">Return Home</p>
            <FaChevronRight className="text-lighterGrey" />
          </div>
        </Link>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-20" id="services">
        <TitleSection subTitle="What we do" title="Here's how we can help" />
        <Swiper
          spaceBetween={40}
          autoplay={{
            delay: 3500,
          }}
          loop={true}
          navigation={{
            nextEl: ".services-swiper-button-next",
            prevEl: ".services-swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 4,
            },
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className="text-center md:text-left">
              <Link
                to={`/services/${service.customFields.uRL}`}
                title={service.customFields.title}
              >
                <div>
                  <img
                    src={service.customFields.icon.url}
                    alt={service.customFields.icon.label}
                    className="mx-auto md:mx-0"
                    width="100"
                    height="100"
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
          <button
            className="services-swiper-button-prev focus:outline-none"
            title="Previous Slide"
          >
            <FaChevronLeft className="text-orange text-2xl mr-4" />
          </button>
          <button
            className="services-swiper-button-next focus:outline-none"
            title="Next Slide"
          >
            <FaChevronRight className="text-orange text-2xl" />
          </button>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}

export default Error404
