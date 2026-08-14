/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { RiFlowChart } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { getHeroBannerApi } from "../../services/heroApi";
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
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroBanner = async () => {
      try {
        const { data } = await getHeroBannerApi();
        setHeroData(data.hero);
      } catch (error) {
        console.error("Failed to fetch hero banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroBanner();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </section>
    );
  }

  const badgeText = heroData?.badgeText || "CAMET IT SOLUTIONS LLP";
  const titleLine1 = heroData?.titleLine1 || "Software that makes";
  const titleLine2 = heroData?.titleLine2 || "business feel";
  const titleHighlight = heroData?.titleHighlight || "elegantly efficient.";
  const subtitle =
    heroData?.subtitle ||
    "TallyPrime, ERP, add-ons, and custom software solutions designed to simplify operations and accelerate your business.";
  const primaryCtaText = heroData?.primaryCtaText || "Schedule a Call";
  const primaryCtaLink = heroData?.primaryCtaLink || "tel:9072632603";
  const secondaryCtaText = heroData?.secondaryCtaText || "Chat on WhatsApp";
  const secondaryCtaLink =
    heroData?.secondaryCtaLink ||
    "https://wa.me/919072632603?text=Hello%20CAMET%20IT%20Solutions%2C%20I%20want%20to%20know%20more%20about%20your%20services.";
  const bannerImageUrl = heroData?.bannerImageUrl || heroImage;

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${bannerImageUrl})`,
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
              {badgeText}
            </div>

            <h1
              style={headingFont}
              className="mt-6 text-pretty text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-4xl md:text-6xl lg:text-6xl"
            >
              {titleLine1}
              <br />
              {titleLine2}
              <span className="block text-white/70">{titleHighlight}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg md:text-xl">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={primaryCtaLink}
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-slate-900 shadow-[0_18px_50px_rgba(255,255,255,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 sm:text-base"
              >
                {primaryCtaText}
              </a>

              <a
                href={secondaryCtaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-medium tracking-[0.02em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 sm:text-base"
              >
                {secondaryCtaText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
