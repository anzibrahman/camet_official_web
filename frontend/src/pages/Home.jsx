import Hero from '../components/sections/Hero'
import BannerSlider from '../components/sections/BannerSlider'
import Services from '../components/sections/Services'
import About from '../components/sections/About'
import VideoSection from '../components/sections/VideoSection' // <--- IMPORT THIS
import LogoStrip from '../components/sections/LogoStrip'
import Testimonials from '../components/sections/Testimonials'
import ContactSection from '../components/sections/ContactSection'
import ClientLogos from '@/components/sections/ClientLogos'

function Home() {
  return (
    <div>
      <Hero />
      <LogoStrip />
      <About />
      {/* <BannerSlider /> */}
      <Services />
      <VideoSection />
      <Testimonials />
      <ClientLogos />
      <ContactSection />
    </div>
  )
}

export default Home
