import RichTextArea from "./RichTextArea"
import TextBlockWithImage from "./TextBlockWithImage"
import HomeHero from "./HomeHero"
import ServicesSlider from "./ServicesSlider"
import TestimonialsSlider from "./TestimonialsSlider"
import ServiceDetails from "./ServiceDetails"
import PageHero from "./PageHero"

// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
  { name: "TextBlockWithImage", module: TextBlockWithImage },
  { name: "RichTextArea", module: RichTextArea },
  { name: "HomeHero", module: HomeHero },
  { name: "ServicesSlider", module: ServicesSlider },
  { name: "TestimonialsSlider", module: TestimonialsSlider },
  { name: "ServiceDetails", module: ServiceDetails },
  { name: "PageHero", module: PageHero },
]

export const getModule = moduleName => {
  if (!moduleName) return null
  const obj = allModules.find(
    m => m.name.toLowerCase() === moduleName.toLowerCase()
  )
  if (!obj) return null
  return obj.module
}
