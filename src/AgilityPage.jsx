import React from "react"
import { graphql } from "gatsby"
import agilityUtils from "./agility/utils"
import { getPageTemplate } from "./components/agility-pageTemplates"
import SiteHeader from "./components/common/SiteHeader"
import SiteFooter from "./components/common/SiteFooter"
import SEO from "./components/common/SEO"
import FacebookChat from "./components/facebook-chat/FacebookChat"

//Our query to get the our page data and check for a dynamic page item (agilityItem)
export const query = graphql`
  query($pageID: Int!, $contentID: Int!, $languageCode: String!) {
    agilitypage(languageCode: { eq: $languageCode }, itemID: { eq: $pageID }) {
      pageJson
    }
    agilityitem(
      languageCode: { eq: $languageCode }
      itemID: { eq: $contentID }
    ) {
      itemJson
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
        callToAction {
          href
          target
          text
        }
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
`
const AgilityPage = ({ pageContext, data }) => {
  // build the page view model
  const viewModel = agilityUtils.buildPageViewModel({ pageContext, data })

  // get our page template
  const AgilityPageTemplate = getPageTemplate(
    viewModel.page.templateName.replace(/\s/g, "")
  )

  // if dynamic page, use that description as meta description
  if (viewModel.dynamicPageItem?.seo?.metaDescription) {
    viewModel.page.seo.metaDescription =
      viewModel.dynamicPageItem.seo.metaDescription
  }

  return (
    <>
      <SEO
        title={viewModel.page.title}
        description={viewModel.page.seo.metaDescription}
        keywords={viewModel.page.seo.metaKeywords}
        ogImage={viewModel.dynamicPageItem?.customFields?.image?.url}
      />
      <div id="site-wrapper" className="flex flex-col min-h-screen">
        <SiteHeader
          languageCode={viewModel.languageCode}
          isMultiLanguage={viewModel.isMultiLanguage}
        />
        <main className="flex-grow">
          <AgilityPageTemplate {...viewModel} />
        </main>
        <SiteFooter footer={data.agilitySiteFooter} />
        <FacebookChat />
      </div>
    </>
  )
}

export default AgilityPage
