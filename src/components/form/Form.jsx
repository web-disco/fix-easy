import React from "react"

const Form = ({ services }) => {
  return (
    <div className="mb-20 md:mb-0">
      <form className="grid grid-cols-2 gap-4">
        <label htmlFor="First Name" className="text-lightGrey">
          First Name
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
          />
        </label>
        <label htmlFor="Last Name" className="text-lightGrey">
          Last Name
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
          />
        </label>
        <label htmlFor="Phone Number" className="text-lightGrey">
          Phone Number
          <input
            type="text"
            required
            className="form-input block w-full text-lightGrey rounded-md border-2 border-darkGrey"
          />
        </label>
        <label htmlFor="Email" className="text-lightGrey">
          Email
          <input
            type="text"
            required
            className="form-input block w-full rounded-md border-2 border-darkGrey"
          />
        </label>
        <label htmlFor="Service" className="col-span-2 text-lightGrey">
          I'm interested in...
          <select
            className="form-select block w-full rounded-md border-2 border-darkGrey"
            required
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
