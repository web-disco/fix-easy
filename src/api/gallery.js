import agility from "@agility/content-fetch"

// set up content fetch
const api = agility.getApi({
  guid: process.env.GATSBY_AGILITY_GUID,
  apiKey: process.env.GATSBY_AGILITY_API_KEY,
})

export default async function handler(req, res) {
  // get gallery id
  const id = req.query.id

  if (!id) {
    res
      .status(400)
      .json({
        error: "No gallery id sent - add a query param for the gallery id",
      })
  }

  try {
    // fetch gallery
    const gallery = await api.getGallery({
      galleryID: id,
    })

    res.status(200).json(gallery)
  } catch (err) {
    console.log({ err })
    res.status(500).json({ err })
  }
}
