import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa"

const SiteFooter = ({ footer }) => {
  const data = useStaticQuery(graphql`
    query {
      allAgilityService {
        nodes {
          sitemapNode {
            menuText
            pagePath
          }
        }
      }
    }
  `)
  const services = data.allAgilityService.nodes
  const date = new Date()
  const year = date.getFullYear()
  return (
    <>
      <footer className="bg-lighterGrey px-4 md:px-8 py-8">
        <div className="grid grid-cols-4 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm mb-4 text-darkGrey">
              {footer.customFields.column1Title}
            </h3>
            <ul>
              {services.map(service => (
                <li className="my-2 last:mb-0">
                  <Link
                    to={service.sitemapNode.menuText}
                    className="text-sm text-darkGrey hover:text-orange"
                  >
                    {service.sitemapNode.menuText}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm mb-4 text-darkGrey">
              {footer.customFields.column2Title}
            </h3>
            <ul>
              {footer.linkedContent_agilityLink.map(link => (
                <li className="my-2">
                  <Link
                    to={link.customFields.link.href}
                    className="text-sm text-darkGrey hover:text-orange"
                  >
                    {link.customFields.link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 md:mt-0 col-span-4 md:col-span-1">
            <Link
              to={footer.customFields.callToAction.href}
              className="block w-full text-center mb-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange hover:bg-orange focus:outline-none focus:border-orange focus:shadow-outline-indigo transition ease-in-out duration-150"
            >
              {footer.customFields.callToAction.text}
            </Link>
            <h3 className="font-bold text-sm text-darkGrey mb-4 text-center md:text-left">
              Stay Connected
            </h3>
            <ul className="flex justify-center md:justify-start">
              <li>
                {footer.customFields.facebook && (
                  <Link
                    to={footer.customFields.facebook.href}
                    title={footer.customFields.facebook.text}
                    target={footer.customFields.facebook.target}
                  >
                    <FaFacebookSquare className="text-4xl md:text-2xl text-darkGrey mr-4 hover:text-orange" />
                  </Link>
                )}
              </li>
              <li>
                {footer.customFields.twitter && (
                  <Link
                    to={footer.customFields.twitter.href}
                    title={footer.customFields.twitter.href}
                    target={footer.customFields.twitter.target}
                  >
                    <FaTwitter className="text-4xl md:text-2xl  text-darkGrey mr-4 hover:text-orange" />
                  </Link>
                )}
              </li>
              <li>
                {footer.customFields.instagram && (
                  <Link
                    to={footer.customFields.instagram.href}
                    title={footer.customFields.instagram.href}
                    target={footer.customFields.instagram.target}
                  >
                    <FaInstagram className="text-4xl md:text-2xl  text-darkGrey mr-4 hover:text-orange" />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="block md:flex text-center justify-between px-4 md:px-8 text-xs bg-darkGrey text-white py-6">
        <p className="mb-4 md:mb-0">
          © {year} Copyright Fix Easy | All Rights Reserved.
        </p>
        <p>
          Website by{" "}
          <a
            href="https://www.webdisco.digital"
            title="Toronto Web Development"
            className="hover:text-orange"
            target="_blank"
            rel="noreferrer"
          >
            Web Disco
          </a>
        </p>
      </div>
    </>
  )
}

export default SiteFooter
