import React from "react"

const Form = ({ services }) => {
  return (
    <div className="mb-20 md:mb-0">
      <form
        className="grid grid-cols-2 gap-4"
        name="Contact"
        method="POST"
        data-netlify="true"
        action="/thank-you"
      >
        <input type="hidden" name="form-name" value="Contact" />
        <label htmlFor="First Name" className="text-lightGrey">
          First Name
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
            name="first-name"
          />
        </label>
        <label htmlFor="Last Name" className="text-lightGrey">
          Last Name
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
            name="last-name"
          />
        </label>
        <label htmlFor="Phone Number" className="text-lightGrey">
          Phone Number
          <input
            type="text"
            required
            className="form-input block w-full text-lightGrey rounded-md border-2 border-darkGrey"
            name="phone-number"
          />
        </label>
        <label htmlFor="Email" className="text-lightGrey">
          Email
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
            name="email"
          />
        </label>
        <label htmlFor="Service" className="col-span-2 text-lightGrey">
          I'm interested in...
          <select
            className="form-select block w-full rounded-md border-2 border-darkGrey"
            required
            name="service[]"
          >
            <option selected>Select a service</option>
            {services.map(service => (
              <option value={service.customFields.title}>
                {service.customFields.title}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="Message" className="col-span-2 text-lightGrey">
          Anything else we should know?
          <textarea
            className="form-textarea block w-full rounded-md border-2 border-darkGrey"
            rows="4"
            name="message"
          />
        </label>
        <button
          className="bg-orange text-lighterGrey block max-w-max py-3 px-6 rounded-md font-medium"
          title="Submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
