import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

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
          title
          isFolder
        }
      }
      services: allAgilityService {
        nodes {
          sitemapNode {
            title
            path
          }
        }
      }
    }
  `)

  // open / close mobile nav
  const [open, setOpen] = useState(false)

  // get header
  const header = data.siteHeader.customFields

  // get services
  const services = data.services.nodes

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
      <header className="relative w-full mx-auto bg-white px-4 md:px-8 py-4 shadow-xl">
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
              <ul className="flex">
                {links.map((navitem, index) => {
                  return (
                    <li
                      className="mr-6 last:mr-0 relative hover:text-orange"
                      key={index}
                    >
                      {!navitem.isFolder ? (
                        <Link
                          to={navitem.path}
                          className="text-lightGrey font-bold hover:text-orange"
                        >
                          {navitem.menuText}
                        </Link>
                      ) : (
                        <span
                          className="text-lightGrey font-bold cursor-pointer hover:text-orange flex items-center"
                          onClick={() => setOpen(!open)}
                        >
                          {navitem.menuText}
                          {open ? (
                            <FaChevronUp className="ml-2" />
                          ) : (
                            <FaChevronDown className="ml-2" />
                          )}
                        </span>
                      )}
                      {navitem.menuText === "Services" ? (
                        <ul
                          className={`absolute z-50 bg-white w-60 px-3 ${
                            open ? `block` : `hidden`
                          }`}
                          onMouseLeave={() => setOpen(false)}
                        >
                          {services.map((service, index) => (
                            <li className="my-2" key={index}>
                              <Link
                                to={service.sitemapNode.path}
                                title={service.sitemapNode.title}
                                className="text-lightGrey hover:text-orange font-medium"
                                activeClassName="active"
                              >
                                {service.sitemapNode.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default SiteHeader
