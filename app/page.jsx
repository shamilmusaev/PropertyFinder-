import Hero from "@/components/Hero"
import HomeProperties from "@/components/HomeProperties"
import InfoBoxes from "@/components/infoBoxes"
import Link from "next/link"



const HomePage = () => {
  return (
    <div>
      <Hero/>
      <InfoBoxes/>
      <HomeProperties/>
    </div>
  )
}

export default HomePage