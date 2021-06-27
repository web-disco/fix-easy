import React from "react"
import { Link } from "gatsby"

const ServiceCTA = ({ title }) => {
  return (
    <div className="bg-orange pb-12 px-4 text-center">
      <div className="pt-12 pb-6">
        <h3 className="text-3xl font-bold text-white mb-10">
          Ready to get started?
        </h3>
        <Link
          to="/contact"
          title={title}
          target="_blank"
          rel="noreferrer"
          className="bg-white py-3 px-6 rounded-md text-orange pb-4 font-medium"
        >
          {title}
        </Link>
      </div>
    </div>
  )
}

export default ServiceCTA
