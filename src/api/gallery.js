import agility from "@agility/content-fetch"

// set up content fetch
const api = agility.getApi({
  guid: process.env.GATSBY_AGILITY_GUID,
  apiKey: process.env.GATSBY_AGILITY_API_KEY,
})

export default async function handler(req, res) {
  // get gallery id
  const id = req.query.id

  // fetch gallery
  const gallery = await api.getGallery({
    galleryID: id,
  })

  res.status(200).json(gallery)
}
