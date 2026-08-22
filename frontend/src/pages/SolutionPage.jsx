import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { solutions } from '@/data/solutions'
import api from '@/utils/api'
import { FaLaptopCode } from 'react-icons/fa'
import Button from '../components/common/Button'

function SolutionsPage() {
  const [databaseSolutions, setDatabaseSolutions] = useState([])

  useEffect(() => {
    api.get('/solutions')
      .then(({ data }) => setDatabaseSolutions(data?.data || []))
      .catch((error) => console.error('Could not load solutions:', error))
  }, [])

  const filteredSolutions = (databaseSolutions.length ? databaseSolutions : solutions)
    .filter((item) => item.slug !== 'all-solutions')

  return (
    <main className="min-h-screen bg-slate-50 pt-[76px] text-slate-900">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            Business Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-slate-600"
          >
            Explore accounting, billing, inventory, GST, automation, integrations,
            custom software, and industry-specific business solutions.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
          {filteredSolutions.map((item, index) => {
            const Icon = typeof item.icon === 'function' ? item.icon : FaLaptopCode

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <Link
                  to={item.path}
                  className="group block rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
                  >
                    <Icon className={`text-lg ${item.iconColor}`} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {item.label}
                  </h2>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.desc}
                  </p>

                  <div className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition group-hover:text-slate-900">
                    View Details
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Need a tailored implementation plan?
          </h2>

          <p className="mb-8 text-slate-600">
            We can map the right combination of software solutions, Tally
            customizations, integrations, and support services to your business process.
          </p>

          <Button
            to="/contact"
            className="rounded-md bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
          >
            Request Consultation
          </Button>
        </div>
      </section>
    </main>
  )
}

export default SolutionsPage
