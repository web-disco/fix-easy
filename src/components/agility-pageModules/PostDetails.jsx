import React from "react"
import { Link } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { renderHTML } from "../../agility/utils"

const PostDetails = ({ dynamicPageItem }) => {
  const { customFields } = dynamicPageItem
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 my-20">
      <AgilityImage
        image={customFields.image}
        layout="constrained"
        aspectRatio={16 / 9}
      />
      <p className="text-sm text-lightGrey my-2 block">
        Published: {new Date(customFields.date).toLocaleDateString()} —{" "}
        <span className="text-orange font-medium">
          {customFields.category_TextField}
        </span>
      </p>
      <h1 className="text-4xl font-bold mb-8 text-darkGrey">
        {customFields.title}
      </h1>
      <div
        className="prose max-w-full mb-8 text-lightGrey"
        dangerouslySetInnerHTML={renderHTML(customFields.content)}
      />
      <div className="text-center">
        <Link
          to="/blog"
          className="bg-orange text-white max-w-max py-3 px-6 rounded-md font-medium"
        >
          Return To Blog
        </Link>
      </div>
    </div>
  )
}

export default PostDetails
