import { motion } from 'framer-motion'
import { Phone, ChevronUp } from 'lucide-react'
import { BsWhatsapp } from 'react-icons/bs'

function FloatingWhatsApp() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pointer-events-none fixed right-4 bottom-20 z-50 flex flex-col items-center gap-2 sm:right-6 sm:bottom-6"
    >
      <motion.a
        href="tel:9072632605
"
        aria-label="Call CAMET"
        title="Call CAMET"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#6BD43B] text-white shadow-[0_10px_24px_rgba(107,212,59,0.35)] transition-colors duration-300 hover:bg-[#5dc030] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6BD43B]/30"
      >
        <Phone className="h-4 w-4" strokeWidth={2.5} />
      </motion.a>

      <motion.a
        href="#"
        aria-label="WhatsApp chat coming soon"
        title="WhatsApp chat coming soon"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#41D856] text-white shadow-[0_10px_24px_rgba(65,216,86,0.32)] transition-colors duration-300 hover:bg-[#35c94a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#41D856]/30"
      >
        <BsWhatsapp className="text-[18px]" />
      </motion.a>

      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#1FA6D8] text-white shadow-[0_10px_24px_rgba(31,166,216,0.3)] transition-colors duration-300 hover:bg-[#1696c6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1FA6D8]/30"
      >
        <ChevronUp className="h-5 w-5" strokeWidth={2.75} />
      </motion.button>
    </motion.div>
  )
}

export default FloatingWhatsApp
