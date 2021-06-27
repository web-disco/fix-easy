import "./src/styles/global.css"
import React from "react"
import FacebookChat from "./src/components/facebook-chat/FacebookChat"

exports.wrapPageElement = ({ element, props }) => (
  <React.Fragment {...props}>
    {element}
    <FacebookChat />
  </React.Fragment>
)
