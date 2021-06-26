import React from "react"
import { Link } from "gatsby"

const HomeHero = ({ module }) => {
  const { customFields } = module

  return (
    <div
      style={{ backgroundImage: `url('${customFields.backgroundImage.url}')` }}
      className="h-350 sm:h-400 md:h-500 bg-center bg-cover bg-no-repeat relative z-10"
    >
      <div className="absolute w-full h-full bg-darkGrey bg-opacity-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col h-full justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold mb-2 max-w-md">
            {customFields.title}
          </h1>
          <p className="text-white mb-4 max-w-sm">{customFields.text}</p>
          <Link
            to={customFields.button.href}
            title={customFields.button.text}
            className="bg-orange text-lighterGrey block max-w-max py-3 px-6 rounded-md font-medium"
          >
            {customFields.button.text}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
