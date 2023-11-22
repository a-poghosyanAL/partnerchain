import { ReactComponent as ChartIcon } from '../assets/icons/chart.svg'
import { ReactComponent as CopyIcon } from '../assets/icons/copyIcon.svg'
import { ReactComponent as UploadIcon } from '../assets/icons/UploadIconSideBar.svg'
import { IFilterValues } from './model'
import { ReactComponent as MessageIcon } from '../assets/icons/messageCheck.svg'
import { ReactComponent as ScreenIcons } from '../assets/icons/plusScreen.svg'
import { ReactComponent as LetterIcon } from '../assets/icons/letter.svg'
import { ReactComponent as SendIcon } from '../assets/icons/send.svg'
import { ReactComponent as TemplateIcon } from '../assets/icons/TemplateIcon.svg'

export const BASE_URL = import.meta.env.VITE_BASE_URL
export const URL_SEND = import.meta.env.VITE_URL_SEND

export const masterCarddata = [
  {
    title: 'Grid Text',
    value: '234,435,435.00',
  },
  {
    title: 'Grid Text',
    value: '234,435,435.00',
  },
  {
    title: 'Grid Text',
    value: '234,435,435.00',
  },
  {
    title: 'Grid Text',
    value: '234,435,435.00',
  },
]

export const breadcrumbs = {
  '/': {
    title: 'Drive',
  },
  '/connect': {
    title: 'Connect',
  },
  '/upload': {
    title: 'Upload',
  },
  '/template': {
    title: 'Template Design',
  },
}

export const navigation = [
  { name: 'Drive', href: '/', icon: ChartIcon, current: true },
  { name: 'Connect', href: '/connect', icon: CopyIcon, current: false },
  {
    name: 'Import Data',
    href: '/upload',
    icon: UploadIcon,
    current: false,
  },
  { name: 'Template Design', href: '/template', icon: TemplateIcon, current: true },
]

export const connectionStaticData = ['bg-[#8D8D8D]', 'bg-[#148EFF]', 'bg-[#FF7E7E]', 'bg-[#65DB8E]']

export const driveStaticData = ['bg-[#8D8D8D]', 'bg-[#148EFF]', 'bg-[#FF7E7E]', 'bg-[#65DB8E]']

type AllFilters = {
  sortValues?: IFilterValues[]
  accountValues?: IFilterValues[]
  ownerValues?: IFilterValues[]
  partnersValues?: IFilterValues[]
  partnersOwnerValues?: IFilterValues[]
}

export const connectselect = ({
  sortValues = [
    {
      id: 1,
      name: 'High to Low',
    },
    {
      id: 2,
      name: 'Low to High',
    },
  ],
  accountValues = [],
  ownerValues = [],
  partnersValues = [],
  partnersOwnerValues = [],
}: AllFilters = {}) => [
  {
    id: 1,
    sortKey: 'opportunities',
    sortLabel: 'Sort By:',
    sortval: '',
    isSort: true,
    value: sortValues,
  },
  {
    id: 2,
    sortKey: 'shared_accounts',
    sortLabel: 'Accounts:',
    sortval: 'All',
    value: accountValues,
  },
  {
    id: 3,
    sortKey: 'account_owner',
    sortLabel: 'Account Owners:',
    sortval: 'All',
    value: ownerValues,
  },
  {
    id: 4,
    sortKey: 'partner_company',
    sortLabel: 'Partners:',
    sortval: 'All',
    value: partnersValues,
  },
  {
    id: 5,
    sortKey: 'partner_account_owner',
    sortLabel: 'Partner Owners:',
    sortval: 'All',
    value: partnersOwnerValues,
  },
]

export const chartdata = [
  {
    name: 'JAN',
    uv: 7,
    pv: 4,
    uvpv: 2,
    amt: 2400,
  },
  {
    name: 'FEB',
    uv: 5.5,
    pv: 5,
    uvpv: 4,
    amt: 2210,
  },
  {
    name: 'MAR',
    uv: 6.5,
    pv: 9.5,
    uvpv: 0.5,
    amt: 2290,
  },
  {
    name: 'APR',
    uv: 4.5,
    pv: 5.5,
    uvpv: 7.5,
    amt: 2000,
  },
  {
    name: 'MAY',
    uv: 3.5,
    pv: 5,
    uvpv: 4,
    amt: 2181,
  },
  {
    name: 'JUN',
    uv: 8,
    pv: 4,
    uvpv: 3,
    amt: 2500,
  },
]

export const lineData = [
  {
    title: 'Current Week Connections',
    value: '130',
    precent: 70,
  },
  {
    title: 'Weekly Influenced Pipeline',
    value: '$44M',
    precent: 35,
  },
  {
    title: 'Response Rate',
    value: '77%',
    precent: 78,
  },
  {
    title: 'Connection Completion Rate',
    value: '55%',
    precent: 48,
  },
  {
    title: 'Avg. Time to Connect',
    value: '2 hours',
    precent: 87,
  },
]

export const pieChart = [
  [
    {
      value: 75,
      fill: '#C68CB5',
      title: 'Stalled',
    },
    {
      value: 25,
      fill: '#F5F5F5',
    },
  ],
  [
    {
      value: 101,
      fill: '#3FD071',
      title: 'Rejected by Broker',
    },
    {
      value: 0,
      fill: '#F5F5F5',
    },
  ],
  [
    {
      value: 11,
      fill: '#20E2F3',
      title: 'Rejected by Vendor',
    },
    {
      value: 89,
      fill: '#F5F5F5',
    },
  ],
  [
    {
      value: 21,
      fill: '#535353',
      title: 'Rejected',
    },
    {
      value: 79,
      fill: '#F5F5F5',
    },
  ],
]

export const companyLogos = {
  'Intel Corporation': 'https://logo.clearbit.com/intel.com',
  'International Business Machines Corporation': 'https://logo.clearbit.com/ibm.com',
  'Johnson & Johnson': 'https://logo.clearbit.com/jnj.com',
  'JPMorgan Chase & Co.': 'https://logo.clearbit.com/jpmorganchase.com',
  "McDonald's Corporation": 'https://logo.clearbit.com/mcdonalds.com',
  'Microsoft Corporation': 'https://logo.clearbit.com/microsoft.com',
  'Nike Inc.': 'https://logo.clearbit.com/nike.com',
  'PepsiCo Inc.': 'https://logo.clearbit.com/pepsico.com',
  'Pfizer Inc.': 'https://logo.clearbit.com/pfizer.com',
  'Procter & Gamble Co.': 'https://logo.clearbit.com/pg.com',
  'Tesla Inc.': 'https://logo.clearbit.com/tesla.com',
  'The 3M Company': 'https://logo.clearbit.com/3m.com',
  'The Boeing Company': 'https://logo.clearbit.com/boeing.com',
  'The Caterpillar Inc.': 'https://logo.clearbit.com/cat.com',
  'The Coca-Cola Company': 'https://logo.clearbit.com/coca-cola.com',
  'The General Electric Company': 'https://logo.clearbit.com/ge.com',
  'The Goldman Sachs Group Inc.': 'https://logo.clearbit.com/goldmansachs.com',
  'The Home Depot Inc.': 'https://logo.clearbit.com/homedepot.com',
  'The Intel Corporation': 'https://logo.clearbit.com/intel.com',
  'The Johnson & Johnson': 'https://logo.clearbit.com/jnj.com',
  "The McDonald's Corporation": 'https://logo.clearbit.com/mcdonalds.com',
  'The Nike Inc.': 'https://logo.clearbit.com/nike.com',
  'The Procter & Gamble Company': 'https://logo.clearbit.com/pg.com',
  'The Travelers Companies Inc.': 'https://logo.clearbit.com/travelers.com',
  'The United Technologies Corporation': 'https://logo.clearbit.com/utc.com',
  'The Visa Inc.': 'https://logo.clearbit.com/visa.com',
  'The Wal-Mart Stores Inc.': 'https://logo.clearbit.com/walmart.com',
  'The Walt Disney Company': 'https://logo.clearbit.com/disney.com',
  'UnitedHealth Group Incorporated': 'https://logo.clearbit.com/unitedhealthgroup.com',
  'Verizon Communications Inc.': 'https://logo.clearbit.com/verizon.com',
  'Visa Inc.': 'https://logo.clearbit.com/visa.com',
  'Walmart Inc.': 'https://logo.clearbit.com/walmart.com',
  'Walt Disney Co.': 'https://logo.clearbit.com/disney.com',
  'Lumen Technologies': 'https://logo.clearbit.com/lumen.com',
  Avant: 'https://logo.clearbit.com/avant.com',
}

export const icons = [ScreenIcons, LetterIcon, SendIcon, MessageIcon]

export const colors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
  'aqua',
  'black',
  'blue',
  'fuchsia',
  'gray',
  'green',
  'lime',
  'maroon',
  'navy',
  'olive',
  'orange',
  'purple',
  'red',
  'silver',
  'teal',
  'white',
  'yellow',
  '#006400',
  '#00008B',
]
export const colorArray = ['#BB6BD9', '#2D9CDB', '#F2994A', '#219653', '#BC6F6F']

export const status = {
  Ready: 'bg-light-green',
  'Awaiting Owner Response': 'bg-[#FFB549]',
  Complete: 'bg-[#34B3F1]',
  'Awaiting Partner Response': 'bg-[#7172AD]',
  Rejected: 'bg-[#34B3F1]',
}
