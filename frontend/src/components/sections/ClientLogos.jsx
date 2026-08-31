import { motion } from "framer-motion";

import bekalClub from "../../assets/WhatsApp Image 2026-07-29 at 4.19.10 PM (1).jpeg";
import forestIndustries from "../../assets/WhatsApp Image 2026-07-29 at 4.19.10 PM (2).jpeg";
import anaswara from "../../assets/WhatsApp Image 2026-07-29 at 4.19.10 PM.jpeg";
import jj from "../../assets/WhatsApp Image 2026-08-28 at 4.01.06 PM.jpeg";
import jac from "../../assets/WhatsApp Image 2026-07-29 at 4.19.11 PM (2).jpeg";
import kovax from "../../assets/WhatsApp Image 2026-07-29 at 4.19.11 PM.jpeg";

import meron from "../../assets/WhatsApp Image 2026-07-29 at 4.19.12 PM (2).jpeg";
import milma from "../../assets/WhatsApp Image 2026-07-29 at 4.19.12 PM.jpeg";
import central from "../../assets/WhatsApp Image 2026-07-29 at 4.19.13 PM.jpeg";

const clients = [
  {
    name: "bekalClub",
    image: bekalClub,
  },
  {
    name: "forestIndustries",
    image: forestIndustries,
  },
  {
    name: "anaswara",
    image: anaswara,
  },
   {
    name: "jj",
    image: jj,
  },
  {
    name: "jac",
    image: jac,
  },
  {
    name: "kovax",
    image: kovax,
  },
   
  {
    name: "meron",
    image: meron,
  },
  {
    name: "milma",
    image: milma,
  },
   {
    name: "Central",
    image: central,
  },
];

function ClientItem({ image, name }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="h-16 md:h-20 w-auto object-contain"
      />
    </div>
  );
}

export default function ClientLogos() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-6 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...clients, ...clients].map((client, index) => (
          <ClientItem
            key={`${client.name}-${index}`}
            image={client.image}
            name={client.name}
          />
        ))}
      </motion.div>
    </div>
  );
}
