/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { RiFlowChart } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import heroImage from "../../assets/hero/heroImage.webp";

const headingFont = { fontFamily: "var(--font-heading)" };
const stripFont = {
  fontFamily: '"Montserrat", "Montserrat Fallback", system-ui, sans-serif',
};

const trustPoints = [
  {
    icon: HiOutlineBadgeCheck,
    label: "Trusted Tally & ERP workflows",
  },
  {
    icon: RiFlowChart,
    label: "Custom business automation",
  },
  {
    icon: MdOutlineSupportAgent,
    label: "Fast local support",
  },
];

function Hero() {
  return (
  <>
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative min-h-screen w-full overflow-hidden px-5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:px-12 lg:pt-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/75 backdrop-blur-md">
              CAMET IT SOLUTIONS LLP
            </div>

            <h1
              style={headingFont}
              className="mt-6 text-pretty text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-4xl md:text-6xl lg:text-6xl"
            >
              Software that makes
              <br />
              business feel
              <span className="block text-white/70">elegantly efficient.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg md:text-xl">
              TallyPrime, ERP, add-ons, and custom software solutions designed
              to simplify operations and accelerate your business.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="tel:9072632605
"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-slate-900 shadow-[0_18px_50px_rgba(255,255,255,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 sm:text-base"
              >
                Schedule a Call
              </a>

              <a
                href="https://wa.me/919876543210?text=Hello%20CAMET%20IT%20Solutions%2C%20I%20want%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-medium tracking-[0.02em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 sm:text-base"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/65">
            <span>Trusted Tally & ERP workflows</span>
            <span>Custom business automation</span>
            <span>Fast local support</span>
          </div> */}
          </div>
        </div>

        {/* <div className="absolute bottom-6 right-5 sm:right-8 lg:right-12 z-30 flex flex-col items-end gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative max-w-[220px] rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.16)]"
        >
          <p className="text-[12px] sm:text-[13px] leading-5 text-slate-800">
            Need help? Chat with us.
          </p>
          <span className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 bg-white/90"></span>
        </motion.div>

        <motion.a
          href="https://wa.me/919876543210?text=Hello%20CAMET%20IT%20Solutions%2C%20I%20want%20to%20know%20more%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.45)] hover:bg-[#1ebe5b]"
        >
          <FaWhatsapp className="text-[28px]" />
        </motion.a>
      </div> */}
      </section>
      {/* <div className="w-full bg-[#ebebeb] px-5 py-3 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={stripFont}
              className="flex items-center gap-3 text-[13px] font-medium tracking-[0.02em] text-slate-800 sm:text-[14px]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-900 shadow-sm">
                <Icon className="text-[18px]" />
              </span>
              <p className="text-balance">{label}</p>
            </div>
          ))}
        </div>
      </div> */}
      
  </>
  );
}

export default Hero