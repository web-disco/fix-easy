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
    categories.[0].customFields.title
  )

  console.log(activeCategory)

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

  if (posts.length <= 0) {
    return <p>sorry... no posts yet!</p>
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-8">
      <div>
        <select onChange={(e) => setActiveCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category.customFields.title}>{category.customFields.title}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.length > 0 ? results.map((post, index) => {
  const excerpt = truncate(post.customFields.content, 80)
  return (
    <div key={index}>
      <Link to={post.sitemapNode.path}>
        <AgilityImage
          image={post.customFields.image}
          className="rounded-md mb-2"
          layout="fullWidth"
        />
        <span className="text-sm text-lightGrey">
          {new Date(post.customFields.date).toLocaleDateString()}
        </span>
        <h3 className="text-xl font-bold text-darkGrey">
          {post.customFields.title}
        </h3>
        <div dangerouslySetInnerHTML={renderHTML(excerpt)} />
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
        }) : (
          <p>no posts</p>
        )}
      </div>
    </div>
  )
}

export default PostsListing
