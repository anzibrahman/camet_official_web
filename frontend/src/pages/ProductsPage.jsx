import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import { getProductsApi } from '@/services/productApi'

function ProductsPage() {
  const fallbackProducts = [
    {
      title: 'TallyPrime Rel 7.0',
      category: 'Core Product',
      description: 'A modern business management solution designed to simplify accounting, inventory, compliance, and daily operations.',
    },
    {
      title: 'TallyPrime Server (Rel 7.0)',
      category: 'Enterprise Product',
      description: 'Built for businesses that need secure, high-performance access to Tally data across multiple users and locations.',
    },
    {
      title: 'Smart Backup++',
      category: 'Add-on',
      description: 'A smart backup utility that helps reduce manual intervention and lowers the risk of missed backups.',
    },
    {
      title: 'Multi File Attachment',
      category: 'Add-on',
      description: 'Attach files such as DOC, XLS, PDF, and JPG directly to financial transactions and retrieve them inside the workflow.',
    },
    {
      title: 'Tally Sheet Magic',
      category: 'Add-on',
      description: 'Generate Excel-based reports from Tally data and convert existing report formats into reusable reporting templates.',
    },
    {
      title: 'Audit Trail With Voucher History',
      category: 'Add-on',
      description: 'Track full transaction history including alterations, inventory changes, ledger updates, rate, and amount changes.',
    },
  ]
  const [databaseProducts, setDatabaseProducts] = useState([])

  useEffect(() => {
    getProductsApi()
      .then(({ data }) => setDatabaseProducts(data?.data || []))
      .catch((error) => console.error('Could not load products:', error))
  }, [])

  const products = databaseProducts.length ? databaseProducts : fallbackProducts

  return (
    <div className="bg-slate-50 min-h-screen pt-[76px]">
      <section className="bg-white border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Products & Add-ons
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Business software products and Tally-focused extensions designed to improve reporting, compliance, backup, and operational control.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((item, index) => (
            <motion.div
              key={item._id || item.slug || item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-3">
                {item.category}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.label || item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description || item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need help selecting the right product?</h2>
          <p className="text-slate-600 mb-8">
            We help businesses choose the right Tally setup, server edition, and add-ons based on workflows, scale, and reporting needs.
          </p>
          <Button to="/contact" className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md font-semibold">
            Talk to Our Team
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
