import React from "react"
import { Link } from "gatsby"
import { FaChevronRight } from "react-icons/fa"

const PageHero = ({ module }) => {
  const { customFields } = module
  return (
    <>
      <div className="bg-lighterGrey py-28">
        <div className="max-w-screen-xl mx-auto text-center px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-4 text-darkGrey">
            {customFields.title}
          </h1>
          <p className="max-w-md mx-auto mb-8 text-darkGrey">
            {customFields.text}
          </p>
          {customFields.primaryButton && (
            <Link
              to={customFields.primaryButton.href}
              title={customFields.primaryButton.text}
              className="bg-orange text-white py-3 px-6 rounded-md font-medium"
            >
              {customFields.primaryButton.text}
            </Link>
          )}
        </div>
      </div>
      {customFields.secondaryButton && (
        <div className="bg-orange">
          <Link
            to={customFields.secondaryButton.href}
            title={customFields.secondaryButton.text}
            className="text-white font-medium"
          >
            <div className="max-w-screen-xl mx-auto py-3 px-4 flex items-center">
              <p className="mr-4">{customFields.secondaryButton.text}</p>
              <FaChevronRight />
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default PageHero
