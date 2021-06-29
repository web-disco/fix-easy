import "./src/styles/global.css"
import React from "react"
import FacebookChat from "./src/components/facebook-chat/FacebookChat"
import SimpleReactLightbox from "simple-react-lightbox"

export const wrapPageElement = ({ element }) => (
  <React.Fragment>
    <SimpleReactLightbox>{element}</SimpleReactLightbox>
    <FacebookChat />
  </React.Fragment>
)
