import React from "react"
import { Link } from "gatsby"
import { AgilityImage } from "@agility/gatsby-image-agilitycms"

const TextBlockWithImage = ({ module }) => {
  // get module fields
  const { customFields } = module

  // function to check whether or not the url is absolute
  const isUrlAbsolute = url => url.indexOf("://") > 0 || url.indexOf("//") === 0

  // function to generate proper link
  const generateLink = (url, target, text) => {
    // if relative link, use Gatsby Link
    if (isUrlAbsolute(url) === false) {
      return (
        <Link
          to={url}
          title={text}
          target={target}
          className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange hover:bg-orange focus:outline-none focus:border-orange focus:shadow-outline-indigo transition ease-in-out duration-150"
        >
          {text}
        </Link>
      )
    } else {
      // else use anchor tag
      return (
        <a
          href={url}
          title={text}
          target={target}
          className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange hover:bg-orange focus:outline-none focus:border-orange focus:shadow-outline-indigo transition ease-in-out duration-150"
        >
          {text}
        </a>
      )
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-xl px-4 md:px-8 mx-auto pb-12 items-center">
        <div className="md:w-6/12 flex-shrink-0 relative">
          {customFields.primaryButton ? (
            <Link
              to={customFields.primaryButton.href}
              title={customFields.primaryButton.text}
            >
              <AgilityImage
                image={customFields.image}
                layout="constrained"
                width="768"
                height="600"
                className="rounded-lg object-cover object-center cursor-pointer"
              />
            </Link>
          ) : (
            <AgilityImage
              image={customFields.image}
              layout="constrained"
              width="768"
              height="512"
              className="rounded-lg object-cover object-center cursor-pointer"
            />
          )}
        </div>
        <div
          className={`md:w-6/12 mt-8 md:mt-0 ${
            customFields.imagePosition !== "right"
              ? `md:ml-12 lg:ml-16 md:order-last`
              : `md:mr-12 lg:mr-16 md:order-first`
          }`}
        >
          <div className="g:py-8 md:text-left">
            <div className="border-l-4 pl-4 border-orange">
              {customFields.tagline && (
                <span className="font-bold text-lightGrey text-xs md:text-left uppercase">
                  {customFields.tagline}
                </span>
              )}
              <h2 className="font-display text-2xl md:text-4xl font-bold text-darkGrey tracking-wide mt-2">
                {customFields.title}
              </h2>
            </div>
            <p className="mt-4 text-lightGrey text-left text-base leading-relaxed text-secondary-200">
              {customFields.content}
            </p>
            {customFields.primaryButton &&
              generateLink(
                customFields.primaryButton.href,
                customFields.primaryButton.target,
                customFields.primaryButton.text
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextBlockWithImage
