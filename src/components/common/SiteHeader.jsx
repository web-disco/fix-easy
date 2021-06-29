import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa"

const SiteHeader = () => {
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
      links: allAgilitySitemapNode(
        filter: { visible: { menu: { eq: true } } }
      ) {
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

  // open / close menus
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  // functions that help with menu
  typeof window !== "undefined" &&
    window.addEventListener("resize", function(event) {
      var w = document.documentElement.clientWidth
      // Display result inside a div element
      if (w >= 991) {
        setOpenMenu(false)
        setOpenMobileMenu(false)
      }
    })

  // get header
  const header = data.siteHeader.customFields

  // get services
  const services = data.services.nodes

  // create our links
  const links = data.links.nodes

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
                width="150"
                height="45"
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
                          title={navitem.menuText}
                        >
                          {navitem.menuText}
                        </Link>
                      ) : (
                        <span
                          className="text-lightGrey font-bold cursor-pointer hover:text-orange flex items-center"
                          onClick={() => setOpenDropdown(!openDropdown)}
                          onKeyDown={() => setOpenDropdown(!openDropdown)}
                          role="button"
                          tabIndex={index}
                        >
                          {navitem.menuText}
                          {openDropdown ? (
                            <FaChevronUp className="ml-2" />
                          ) : (
                            <FaChevronDown className="ml-2" />
                          )}
                        </span>
                      )}
                      {navitem.menuText === "Services" ? (
                        <div
                          onMouseLeave={() => setOpenDropdown(false)}
                          role="menu"
                          tabIndex={0}
                        >
                          <ul
                            className={`absolute z-50 bg-white w-60 py-3 px-3 ${
                              openDropdown ? `block` : `hidden`
                            }`}
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
                        </div>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </nav>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              onKeyDown={() => setOpenMenu(!openMenu)}
              className="block md:hidden"
              name="toggle"
            >
              {openMenu ? (
                <FaTimes className="text-lightGrey text-3xl" />
              ) : (
                <FaBars className="text-lightGrey text-3xl" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`absolute top-18 left-0 bg-white w-full z-50 shadow-xl py-3 ${
            openMenu ? `block` : `hidden`
          }`}
        >
          <ul className="z-50">
            {links.map((navitem, index) => {
              return (
                <li className="py-2 list-none" key={index}>
                  {!navitem.isFolder ? (
                    <Link
                      to={navitem.path}
                      className="font-bold text-lightGrey hover:text-orange px-4"
                      title={navitem.menuText}
                    >
                      {navitem.menuText}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        onKeyDown={() => setOpenMobileMenu(!openMobileMenu)}
                        className="px-4 flex text-lightGrey font-bold hover:text-orange cursor-pointer items-center"
                      >
                        {navitem.title} <FaChevronDown className="ml-2" />
                      </button>
                      <ul
                        className={`${
                          openMobileMenu ? `block` : `hidden`
                        } mt-3 px-8 py-3 text-sm font-medium text-lightGrey bg-lighterGrey`}
                      >
                        {services.map((service, index) => (
                          <li
                            className="my-3 first:mt-0 last:mb-0 hover:text-orange"
                            key={index}
                          >
                            <Link
                              to={service.sitemapNode.path}
                              title={service.sitemapNode.title}
                            >
                              {service.sitemapNode.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </header>
    </>
  )
}

export default SiteHeader
