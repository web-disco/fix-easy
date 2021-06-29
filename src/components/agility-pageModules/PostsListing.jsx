import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import { renderHTML } from "../../agility/utils"

const PostsListing = () => {
  const data = useStaticQuery(graphql`
    {
      posts: allAgilityPost(
        filter: { properties: { referenceName: { eq: "posts" } } }
        sort: { fields: customFields___date, order: DESC }
      ) {
        nodes {
          sitemapNode {
            path
          }
          customFields {
            title
            date
            category_TextField
            image {
              url
              label
            }
            content
          }
        }
      }
      categories: allAgilityService(
        filter: { properties: { referenceName: { eq: "services" } } }
        sort: { order: ASC, fields: properties___itemOrder }
      ) {
        nodes {
          customFields {
            title
          }
        }
      }
    }
  `)

  // get posts
  const posts = data.posts.nodes

  // get categories
  const categories = data.categories.nodes

  // set up state active category for initial load
  const [activeCategory, setActiveCategory] = useState(
    categories[0].customFields.title
  )

  const results = posts.filter(
    post => post.customFields.category_TextField === activeCategory
  )

  // function to truncate text
  const truncate = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "..."
    }
    return str
  }

  if (!results) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-8 mb-20">
        <div className="text-center py-20">
          <h3 className="text-2xl">No posts available in this category.</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-8 mb-20">
      <div className="my-12">
        <select
          onChange={e => setActiveCategory(e.target.value)}
          className="form-select bg-orange text-lighterGrey rounded-md border-orange focus:outline-none focus-visible:outline-none mb-8 block w-full sm:w-72"
        >
          {categories.map((category, index) => (
            <option key={index} value={category.customFields.title}>
              {category.customFields.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results?.map((post, index) => {
          const excerpt = truncate(post.customFields.content, 80)
          return (
            <div key={index}>
              <Link to={post.sitemapNode.path}>
                <AgilityImage
                  image={post.customFields.image}
                  className="rounded-md mb-4"
                  layout="fullWidth"
                />
                <p className="text-sm text-lightGrey my-2 block">
                  {new Date(post.customFields.date).toLocaleDateString()} —{" "}
                  <span className="text-orange font-medium">
                    {post.customFields.category_TextField}
                  </span>
                </p>
                <h3 className="text-xl font-bold text-darkGrey">
                  {post.customFields.title}
                </h3>
                <div
                  dangerouslySetInnerHTML={renderHTML(excerpt)}
                  className="mb-2"
                />
              </Link>
              <Link
                to={post.sitemapNode.path}
                title={post.customFields.title}
                className="font-bold text-orange border-b-3 border-orange pb-1 text-sm"
              >
                Read More
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostsListing
