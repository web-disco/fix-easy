import React from "react"

const TitleSection = ({ subTitle, title }) => {
  return (
    <div className="border-l-4 pl-4 border-orange mb-8">
      <span className="font-bold text-lightGrey text-xs md:text-left uppercase">
        {subTitle}
      </span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-darkGrey tracking-wide mt-2">
        {title}
      </h2>
    </div>
  )
}

export default TitleSection
