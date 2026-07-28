
import { Network, UserCheck, TrendingUp, LayoutGrid } from 'lucide-react'

const storyParagraphs = [
  `With years of experience in business software solutions, we specialize in delivering Tally solutions, cloud services, and custom web applications that meet the unique requirements of businesses across various industries.
Our focus is to understand each client's business processes and provide tailor-made software solutions that simplify operations, enhance productivity, and support business growth`
]

const features = [
  {
    icon: Network,
    title: 'Enterprise data hub',
    description:
      'We integrate Tally with mobile and cloud platforms to create a unified financial ecosystem for your business.',
    color: '#1ea3cf',
  },
  {
    icon: UserCheck,
    title: 'Partner success first',
    description:
      'As a 5-star Tally partner, we prioritize your growth with dedicated support, training, and customized add-ons.',
    color: '#d6825f',
  },
  {
    icon: TrendingUp,
    title: 'Built to scale',
    description:
      'From single-user Tally licenses to complex ERP and CRM rollouts, our solutions grow as you grow.',
    color: '#7c9a5c',
  },
  {
    icon: LayoutGrid,
    title: 'Multi-platform expertise',
    description:
      'We implement Tally, ERP, CRM, and Marg, tailored to how your business actually runs.',
    color: '#b0894a',
  },
]

const About = () => {
  return (
    <section
      className="bg-[#edf1ef] px-6 py-14 text-[#22252a] sm:px-10 lg:px-16 lg:py-16 xl:px-20"
      id="about"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1.7fr_0.9fr] lg:gap-20">
        <div className="max-w-[700px]">
          <h2 className="font-['Josefin_Sans',sans-serif] text-[2.65rem] font-[300] uppercase leading-[0.98] tracking-[0.32em] text-[#6f8494] sm:text-[3.2rem] lg:text-[3.55rem]">
            <span className="block">Your   </span>
            <span className="block">Trusted</span>
            <span className="block">Technology</span>
            <span className="block">Partner</span>
          </h2>

          <div className="mt-7 max-w-[640px] space-y-5 font-['Jost',sans-serif] text-[1.14rem] leading-[1.48] font-[400] tracking-[0.01em] text-[#25292f] sm:text-[1.22rem]">
            {storyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 font-['Jost',sans-serif] text-[#17191d]">
            <p className="text-[1.18rem] font-[700] uppercase tracking-[0.01em]">Shine Mathew</p>
            <p className="text-[0.92rem] leading-[1.35] text-[#33373d]">Founder & chairman</p>
            <p className="text-[0.92rem] leading-[1.35] text-[#33373d]">Camet IT Solutions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-9 lg:pt-8">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div key={title}>
              <Icon size={24} strokeWidth={1.5} style={{ color }} />
              <p className="mt-3.5 font-['Jost',sans-serif] text-[0.95rem] font-[500] text-[#22252a]">
                {title}
              </p>
              <p className="mt-2 font-['Jost',sans-serif] text-[0.85rem] leading-[1.5] text-[#5b5f56]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About