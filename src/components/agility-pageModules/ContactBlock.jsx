import React from "react"
import Form from "../form/Form"
import { useStaticQuery, graphql } from "gatsby"

const ContactBlock = ({ module }) => {
  const { customFields } = module

  const data = useStaticQuery(graphql`
    query {
      allAgilityService {
        nodes {
          customFields {
            title
          }
        }
      }
    }
  `)

  const services = data.allAgilityService.nodes

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mb-12 md:mb-0">
          <p className="text-lightGrey mb-4">{customFields.text}</p>
          <p className="text-lightGrey mb-2">
            <a href={`tel:${customFields.phone}`} title="Call us today">
              <span className="text-orange font-medium">T</span>:{" "}
              {customFields.phone}
            </a>
          </p>
          <p className="text-lightGrey">
            <a href={`mailto:${customFields.email}`} title="Email us today">
              <span className="text-orange font-medium">E</span>:{" "}
              {customFields.email}
            </a>
          </p>
        </div>
        <Form services={services} />
      </div>
    </div>
  )
}

export default ContactBlock
