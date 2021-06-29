import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { renderHTML } from "../../agility/utils"
import {
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
  FaChevronRight,
} from "react-icons/fa"

const SiteFooter = () => {
  // query for services
  const data = useStaticQuery(graphql`
    query {
      allAgilityService(sort: { order: ASC, fields: properties___itemOrder }) {
        nodes {
          sitemapNode {
            menuText
            pagePath
          }
        }
      }
      agilitySiteFooter {
        linkedContent_agilityLink {
          customFields {
            link {
              text
              href
            }
          }
        }
        customFields {
          newsletterTitle
          newsletterText
          column1Title
          column2Title
          facebook {
            href
            target
            text
          }
          instagram {
            href
            target
            text
          }
          twitter {
            href
            target
            text
          }
        }
      }
    }
  `)

  // get footer
  const footer = data.agilitySiteFooter

  // get services
  const services = data.allAgilityService.nodes

  // get date
  const date = new Date()

  // get year from date
  const year = date.getFullYear()

  // setup email state
  const [email, setEmail] = useState("")

  // set up message
  const [message, setMessage] = useState("")

  // handle submit function
  const handleSubmit = async e => {
    e.preventDefault()
    const result = await addToMailchimp(email)
    console.log(result)
    setMessage(result.msg)
  }

  // handle change function
  const handleChange = e => {
    setEmail(e.target.value)
  }

  return (
    <>
      <footer className="bg-lighterGrey py-6">
        <div className="grid grid-cols-4 md:grid-cols-3 max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-sm mb-4 text-darkGrey">
              {footer.customFields.column1Title}
            </h3>
            <ul>
              {services.map((service, i) => (
                <li className="my-2 last:mb-0" key={i}>
                  <Link
                    to={service.sitemapNode.pagePath}
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
              {footer.linkedContent_agilityLink.map((link, i) => (
                <li className="my-2" key={i}>
                  <Link
                    to={link.customFields.link.href}
                    className="text-sm text-darkGrey hover:text-orange"
                    title={link.customFields.link.text}
                  >
                    {link.customFields.link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 md:mt-0 col-span-4 md:col-span-1">
            <h3 className="font-bold text-sm text-darkGrey mb-4">
              {footer.customFields.newsletterTitle}
            </h3>
            <form className="mb-4" onSubmit={handleSubmit}>
              <label htmlFor="email" className="flex">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={footer.customFields.newsletterText}
                  className="w-full rounded-md text-sm border-2 border-darkGrey"
                />
                <button
                  className="text-center bg-orange px-3 ml-3 rounded-md"
                  title="Submit"
                >
                  <FaChevronRight className="text-white" />
                </button>
              </label>
            </form>
            <p
              className="form-message"
              dangerouslySetInnerHTML={renderHTML(message)}
            />
            <h3 className="font-bold text-sm text-darkGrey mt-8 mb-4 text-center md:text-left">
              Stay Connected
            </h3>
            <ul className="flex justify-center md:justify-start mb-6">
              <li>
                {footer.customFields.facebook && (
                  <a
                    href={footer.customFields.facebook.href}
                    title={footer.customFields.facebook.text}
                    target={footer.customFields.facebook.target}
                  >
                    <FaFacebookSquare className="text-4xl md:text-2xl text-darkGrey mr-4 hover:text-orange" />
                  </a>
                )}
              </li>
              <li>
                {footer.customFields.twitter && (
                  <a
                    href={footer.customFields.twitter.href}
                    title={footer.customFields.twitter.href}
                    target={footer.customFields.twitter.target}
                  >
                    <FaTwitter className="text-4xl md:text-2xl  text-darkGrey mr-4 hover:text-orange" />
                  </a>
                )}
              </li>
              <li>
                {footer.customFields.instagram && (
                  <a
                    href={footer.customFields.instagram.href}
                    title={footer.customFields.instagram.href}
                    target={footer.customFields.instagram.target}
                  >
                    <FaInstagram className="text-4xl md:text-2xl  text-darkGrey mr-4 hover:text-orange" />
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="text-xs bg-darkGrey text-white py-6 md:py-3">
        <div className="max-w-screen-xl mx-auto block md:flex text-center justify-between px-4 md:px-8">
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
      </div>
    </>
  )
}

export default SiteFooter
