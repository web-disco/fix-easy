import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const SiteHeader = ({ languageCode, isMultiLanguage }) => {
  // graphql query to fetch our sitemap & header data
  const data = useStaticQuery(graphql`
    query {
      siteHeader: agilitySiteHeader(
        properties: { referenceName: { eq: "siteheader" } }
      ) {
        customFields {
          logo {
            label
            url
          }
          siteName
        }
      }
      links: allAgilitySitemapNode {
        nodes {
          languageCode
          path
          menuText
        }
      }
    }
  `)

  // open / close mobile nav
  const [open, setOpen] = useState(false)

  // get header
  const header = data.siteHeader.customFields

  // create our links
  const links = data.links.nodes.filter(sitemapNode => {
    // check for top level pages
    let isTopLevelPage = sitemapNode.path.split("/").length === 2

    // check for pages in current locale
    const isThisLanguage = sitemapNode.languageCode === languageCode

    if (isMultiLanguage) {
      isTopLevelPage = sitemapNode.path.split("/").length === 3
    }

    // return top level pages in current locale
    return isThisLanguage && isTopLevelPage
  })

  // no header available
  if (!header) {
    return (
      <header className="relative p-8 text-center">
        <p className="text-gray-400 font-bold">No Header Available</p>
      </header>
    )
  }
  return (
    <>
      <header className="relative w-full mx-auto bg-white px-4 py-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" title={header.siteName}>
              <img
                className="w-auto z-50"
                src={header.logo.url}
                alt={header.logo.label}
                title={header.siteName}
                style={{ width: "150px" }}
              />
            </Link>
            <nav className="hidden md:block">
              {links.map((navitem, index) => {
                return (
                  <Link
                    to={navitem.path}
                    key={`mobile-${index}`}
                    className="text-lightGrey font-bold mr-6 last:mr-0"
                  >
                    {navitem.menuText}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default SiteHeader
