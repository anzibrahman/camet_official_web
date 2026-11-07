import BookServiceButton from '@/components/common/BookServiceButton'
import { motion } from 'framer-motion'

function SupportPage() {
  const supportItems = [
    'Onsite & Remote Support',
    'AMC / Annual Support Cover',
    'Training',
    'Tally Software Service',
    'Tally Virtual User (TVU) License',
    'TallyPrime with WhatsApp',
  ]

  return (
    <div className="bg-slate-50 min-h-screen pt-[76px]">
      <section className="bg-white border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Support Services
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Ongoing assistance for product setup, training, maintenance, user enablement, and business continuity.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {supportItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item}</h3>
                    <p className="text-slate-600 mt-2">
                      Delivered by our team as part of implementation, usage enablement, maintenance, or managed assistance.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need immediate help?</h2>
          <p className="text-slate-600 mb-2">Phone: +91 9072632601</p>
          <p className="text-slate-600 mb-8">Email: admin@camet.in</p>
          <BookServiceButton className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md font-semibold">
            Book a Service
          </BookServiceButton>
        </div>
      </section>
    </div>
  )
}

export default SupportPage