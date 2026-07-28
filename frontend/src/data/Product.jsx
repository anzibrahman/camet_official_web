import {
  FaLaptopCode,
  FaDatabase,
  FaCloud,
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaServer,
} from 'react-icons/fa'
import { MdMiscellaneousServices } from 'react-icons/md'
import { BsFillGearFill } from 'react-icons/bs'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'

export const products = [
  {
    category: 'Tally Products',
    slug: 'tallyprime',
    path: '/products/tallyprime',
    label: 'TallyPrime',
    desc: 'Business management software for accounting, inventory, GST, payroll, and reporting',
    description:
      'TallyPrime is a comprehensive business management software that helps businesses manage accounting, inventory, banking, taxation including GST, payroll, and financial reporting.',
    icon: FaFileInvoiceDollar,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    pricing: {
      type: 'plans',
      plans: [
        { name: 'TallyPrime Silver', price: '₹22,500 + 18% GST' },
        { name: 'TallyPrime Gold', price: '₹67,500 + 18% GST' },
      ],
    },
    features: [
      'Accounting and inventory management',
      'GST and taxation support',
      'Payroll and financial reporting',
      'Business operations in one platform',
    ],
    notes: ['Available in Silver and Gold editions.'],
  },
  {
    category: 'Tally Products',
    slug: 'tallyprime-cloud',
    path: '/products/tallyprime-cloud',
    label: 'TallyPrime on Cloud',
    desc: 'Remote Tally access with secure cloud hosting and backup',
    description:
      'TallyPrime on Cloud allows users to access TallyPrime from anywhere using the internet with secure hosting and remote accessibility.',
    icon: FaCloud,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    pricing: {
      type: 'starting',
      value: 'Starting at ₹600',
    },
    features: [
      '24x7 secured cloud access',
      'Flexible plans',
      'Remote access from anywhere',
      'Secure data hosting',
    ],
    notes: ['Cloud pricing starts at ₹600.', 'Flexible plans available.'],
  },
  {
    category: 'Tally Products',
    slug: 'tallyprime-server',
    path: '/products/tallyprime-server',
    label: 'TallyPrime Server',
    desc: 'Enterprise-grade multi-user server solution for Tally environments',
    description:
      'TallyPrime Server improves performance, security, and multi-user efficiency for TallyPrime Gold environments.',
    icon: FaServer,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    pricing: {
      type: 'fixed',
      value: '₹2,70,000 + 18% GST',
    },
    features: [
      'Advanced monitoring',
      'Greater concurrency',
      'Superior performance',
      'Seamless multi-user access',
      'Improved productivity',
    ],
    notes: [
      'Enhances your Gold license with advanced monitoring.',
      'Built for faster and smoother multi-user performance.',
    ],
  },
  {
    category: 'Tally Products',
    slug: 'tally-software-services',
    path: '/products/tally-software-services',
    label: 'Tally Software Services (TSS)',
    desc: 'Annual subscription for updates, connected services, and support',
    description:
      'Tally Software Services keeps your Tally environment updated with statutory updates, product updates, and connected services.',
    icon: FaDatabase,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
    pricing: {
      type: 'variants',
      variants: [
        {
          name: 'TSS Silver',
          plans: [
            { duration: '1 Year', price: '₹4,500 + 18% GST' },
            { duration: '2 Years', price: '₹8,100 + 18% GST', offer: 'Get 10% off' },
          ],
        },
        {
          name: 'TSS Gold',
          plans: [
            { duration: '1 Year', price: '₹13,500 + 18% GST' },
            { duration: '2 Years', price: '₹24,300 + 18% GST', offer: 'Get 10% off' },
          ],
        },
        {
          name: 'TSS Auditors',
          plans: [
            { duration: 'Plan Price', price: '₹12,150 + 18% GST', offer: 'Get 10% off' },
          ],
        },
      ],
    },
    features: [
      'Product updates',
      'Statutory updates',
      'Connected business services',
      'Support for smoother operations',
    ],
  },
  {
    category: 'Tally Products',
    slug: 'tally-virtual-user',
    path: '/products/tally-virtual-user',
    label: 'Tally Virtual User (TVU)',
    desc: 'Virtual desktop licensing for secure centralized Tally access',
    description:
      'Tally Virtual User enables secure access to TallyPrime through virtual desktop environments such as VDI or Citrix.',
    icon: FaClipboardCheck,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    pricing: null,
    features: [
      'Virtual desktop access',
      'Centralized secure usage',
      'VDI and Citrix compatibility',
    ],
    notes: ['Pricing not provided in the PDF.'],
  },
  {
    category: 'Tally Products',
    slug: 'tally-customization',
    path: '/products/tally-customization',
    label: 'Tally Customization',
    desc: 'Business-specific Tally modifications, reports, workflows, and automation',
    description:
      'Tally Customization adapts TallyPrime to specific business requirements using TDL, reports, workflows, integrations, and automation.',
    icon: FaLaptopCode,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    pricing: null,
    features: [
      'Custom reports',
      'Workflow changes',
      'Automation support',
      'Invoice and voucher customization',
    ],
    notes: ['Pricing not provided in the PDF.'],
  },
  {
    category: 'Tally Products',
    slug: 'tally-rental',
    path: '/products/tally-rental',
    label: 'Tally Rental',
    desc: 'Flexible monthly and yearly rental plans for Tally Silver and Gold',
    description:
      'Tally Rental offers subscription-style access for businesses that want flexible short-term or annual usage.',
    icon: FaFileInvoiceDollar,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    pricing: {
      type: 'variants',
      variants: [
        {
          name: 'Silver Rental',
          plans: [
            { duration: '1 Month', price: '₹750 + 18% GST' },
            { duration: '3 Months', price: '₹2,138 + 18% GST', offer: 'Get 5% off' },
            { duration: '12 Months', price: '₹8,100 + 18% GST', offer: 'Get 10% off' },
          ],
        },
        {
          name: 'Gold Rental',
          plans: [
            { duration: '1 Month', price: '₹2,250 + 18% GST' },
            { duration: '3 Months', price: '₹6,413 + 18% GST', offer: 'Get 5% off' },
            { duration: '12 Months', price: '₹24,300 + 18% GST', offer: 'Get 10% off' },
          ],
        },
      ],
    },
    features: [
      'Silver and Gold rental plans',
      'Short-term and annual options',
      'Discounts on longer durations',
    ],
  },
  {
    category: 'Tally Products',
    slug: 'tallyprime-upgrade-silver-to-gold',
    path: '/products/tallyprime-upgrade-silver-to-gold',
    label: 'TallyPrime Silver to Gold Upgrade',
    desc: 'Upgrade your TallyPrime Silver license to Gold',
    description:
      'This upgrade helps businesses move from TallyPrime Silver to TallyPrime Gold when multi-user growth or broader access is needed.',
    icon: FaServer,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
    pricing: {
      type: 'fixed',
      value: '₹45,000 + 18% GST',
    },
    features: [
      'Upgrade path from Silver to Gold',
      'Supports business growth and broader team usage',
    ],
  },
  {
    category: 'Tally Products',
    slug: 'biz-analyst',
    path: '/products/biz-analyst',
    label: 'Biz Analyst',
    desc: 'Mobile app integrated with Tally for live dashboards, reports, and collections tracking',
    description:
      'Biz Analyst is a mobile app integrated with Tally that helps businesses monitor dashboards, sales, outstanding, inventory, and reports from anywhere.',
    icon: FaCloud,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    pricing: {
      type: 'plans',
      plans: [
        { name: '1 Year / User', price: '₹3,300 + 18% GST' },
        { name: '3 Years / User', price: '₹6,600 + 18% GST', offer: 'Pay for 2 years & get 1 year free' },
        { name: '5 Years / User', price: '₹9,900 + 18% GST', offer: 'Pay for 3 years & get 2 years free' },
      ],
    },
    features: [
      'Real-time Business Dashboard',
      'Sales & Collection Tracking',
      'Customer & Outstanding Management',
      'Inventory Monitoring',
      'Reports on Mobile Anytime, Anywhere',
    ],
  },
  {
    category: 'Business Software Products',
    slug: 'hotel-management-system',
    path: '/products/hotel-management-system',
    label: 'Hotel Management System',
    desc: 'Web-based hotel operations platform for reservations, billing, housekeeping, and reporting',
    description:
      'A complete hotel software solution for reservations, billing, housekeeping, restaurant management, inventory, and reports.',
    icon: HiOutlineWrenchScrewdriver,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    pricing: null,
    features: ['Reservations', 'Billing', 'Housekeeping', 'Inventory', 'Reports'],
    notes: ['Contact for pricing.'],
  },
  {
    category: 'Business Software Products',
    slug: 'laboratory-management-system',
    path: '/products/laboratory-management-system',
    label: 'Laboratory Management System (LIMS)',
    desc: 'Laboratory software for registration, tests, billing, reports, and sample tracking',
    description:
      'A laboratory solution for patient registration, sample tracking, billing, report generation, and secure operations.',
    icon: MdMiscellaneousServices,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
    pricing: null,
    features: ['Registration', 'Tests', 'Billing', 'Reports', 'Sample tracking'],
    notes: ['Contact for pricing.'],
  },
  {
    category: 'Business Software Products',
    slug: 'industry-specific-solutions',
    path: '/products/industry-specific-solutions',
    label: 'Industry-Specific Solutions',
    desc: 'Custom web applications for manufacturing, trading, healthcare, education, retail, and services',
    description:
      'Custom web applications designed for industry-specific workflows, process automation, reporting, and operational control.',
    icon: BsFillGearFill,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    pricing: null,
    features: [
      'Custom workflow automation',
      'Business-specific reporting',
      'Operational control modules',
    ],
    notes: ['Contact for pricing.'],
  },
]

export const productSections = [
  {
    title: 'Tally Products',
    items: products.filter((item) => item.category === 'Tally Products'),
  },
  {
    title: 'Business Software Products',
    items: products.filter((item) => item.category === 'Business Software Products'),
  },
]