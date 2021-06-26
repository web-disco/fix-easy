import React from "react"
import TitleSection from "../common/TitleSection"
import { graphql, useStaticQuery } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Autoplay } from "swiper"
import "swiper/components/navigation/navigation.min.css"
import "swiper/swiper-bundle.min.css"

// install Swiper modules
SwiperCore.use([Navigation, Autoplay])

const TestimonialsSlider = ({ module }) => {
  // get module fields
  const { customFields } = module

  // get testimonials
  const data = useStaticQuery(graphql`
    query {
      allAgilityTestimonial(
        filter: {
          properties: {
            referenceName: { eq: "home_testimonialsslider73_te5e3549" }
          }
        }
      ) {
        nodes {
          customFields {
            name
            text
            image {
              url
            }
            location
            rating
            serviceProvided_TextField
          }
        }
      }
    }
  `)

  // set testimonials
  const testimonials = data.allAgilityTestimonial.nodes

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-20">
      <TitleSection
        subTitle={customFields.subTitle}
        title={customFields.title}
      />
      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 6000,
        }}
        navigation={{
          nextEl: ".testimonial-swiper-button-next",
          prevEl: ".testimonial-swiper-button-prev",
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
        {testimonials.map((testimonial, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="border-solid bg-lighterGrey p-4 rounded-md">
                <div className="flex items-center">
                  <AgilityImage
                    image={testimonial.customFields.image}
                    layout="constrained"
                    width="50"
                    height="50"
                    className="rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="font-bold">
                      {testimonial.customFields.name}
                    </h3>
                    <ul className="flex">
                      <li>
                        <FaStar className="text-orange" />
                      </li>
                      <li>
                        <FaStar className="text-orange" />
                      </li>
                      <li>
                        <FaStar className="text-orange" />
                      </li>
                      <li>
                        <FaStar className="text-orange" />
                      </li>
                      <li>
                        <FaStar className="text-orange" />
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-lightGrey my-4 italic">
                  "{testimonial.customFields.text}"
                </p>
                <p className="text-sm font-medium">
                  {testimonial.customFields.serviceProvided_TextField && (
                    <span>
                      {testimonial.customFields.serviceProvided_TextField} |
                    </span>
                  )}{" "}
                  {testimonial.customFields.location}
                </p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className="flex justify-end mt-8">
        <button className="testimonial-swiper-button-prev focus:outline-none">
          <FaChevronLeft className="text-orange text-2xl mr-4" />
        </button>
        <button className="testimonial-swiper-button-next focus:outline-none">
          <FaChevronRight className="text-orange text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default TestimonialsSlider
