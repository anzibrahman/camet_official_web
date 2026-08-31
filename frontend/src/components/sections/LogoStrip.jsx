import { motion } from "framer-motion";
import {
  FaCloud,
  FaChartLine,
  FaTools,
  FaFlask,
  FaHotel,
  FaUtensils,
  FaCalculator,
} from "react-icons/fa";
import { BsShop } from "react-icons/bs";

const logos = [
  { name: "Tally", icon: FaCalculator, color: "text-[#2ecc71]" },
  { name: "Cloud", icon: FaCloud, color: "text-[#3498db]" },
  { name: "Biz Analyst", icon: FaChartLine, color: "text-[#8e44ad]" },
  { name: "ERP Vansale", icon: FaTools, color: "text-[#e67e22]" },
  { name: "Lab Management", icon: FaFlask, color: "text-[#16a085]" },
  { name: "Hotel Management", icon: FaHotel, color: "text-[#e84393]" },
  { name: "Restaurant Management", icon: FaUtensils, color: "text-[#f39c12]" },
 
];

function LogoItem({ icon: Icon, name, color }) {
  return (
    <div className="flex items-center justify-center gap-3 min-w-fit px-6 md:px-8 py-3">
      <Icon className={`text-[26px] md:text-[30px] shrink-0 ${color}`} />
      <span className="text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-slate-600 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function LogoStrip() {
  return (
    <section className="relative overflow-hidden bg-[#e7e7e7] py-3 md:py-3">
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#efefec] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#efefec] to-transparent z-10" />

        <motion.div
          className="flex items-center gap-2 md:gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <LogoItem
              key={`${logo.name}-${index}`}
              icon={logo.icon}
              name={logo.name}
              color={logo.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LogoStrip;
