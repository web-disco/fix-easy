import React from "react"
import TitleSection from "../common/TitleSection"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useStaticQuery, graphql } from "gatsby"

const containerStyle = {
  width: "100%",
  height: "300px",
}

const center = {
  lat: 44.0384,
  lng: -79.2,
}

const Map = ({ module }) => {
  const { customFields } = module

  const data = useStaticQuery(graphql`
    query {
      agilityMap {
        linkedContent_agilityLocations {
          customFields {
            latitude
            longitude
          }
        }
      }
    }
  `)

  const locations = data.agilityMap.linkedContent_agilityLocations.map(
    location => {
      return {
        lat: parseFloat(location.customFields.latitude),
        lng: parseFloat(location.customFields.longitude),
      }
    }
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-12" id="locations">
      <TitleSection
        title={customFields.title}
        subTitle={customFields.subTitle}
      />
      <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={parseFloat(customFields.zoom)}
        >
          {locations.map((location, index) => {
            return <Marker position={location} key={index} />
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
