import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  LegendProps,
} from 'recharts'
import { chartdata, lineData } from '../../utils/constants'
import { CustomTooltip } from '../reusable/CustomTooltip'
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRightIcon.svg'
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrowLeft.svg'

const RenderLegend = (props: LegendProps) => {
  const { payload } = props
  return (
    <ul className='absolute top-[-27px] 2xl:top-[-70px]  flex w-[85%] left-[60px] flex-row-reverse justify-between gap-[30px]'>
      <div className='flex items-center justify-center gap-4 flex-row-reverse'>
        {payload?.map((entry, index: number) => (
          <div key={`item-${index}`} className='flex  gap-[11px] items-center'>
            <div
              className='h-4 w-[31px] rounded-[4px]'
              style={{ backgroundColor: entry.color }}
            ></div>
            <p className='text-sm font-normal text-light-gray-300'>{entry.value}</p>
          </div>
        ))}
      </div>
      <span className='font-medium text-xl hidden md:block'>Vendor Connections</span>
    </ul>
  )
}

const DriveHeader = () => {
  const [size, setSize] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (date: Date | null) => {
    setIsOpen(!isOpen)
    if (date) {
      setStartDate(date)
    }
  }
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   setIsOpen(!isOpen)
  // }
  const DateFormatter = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
  }

  useEffect(() => {
    const div = document.querySelector('.charts') as HTMLDivElement
    setSize(div?.offsetWidth)

    const getDivSize = () => {
      setSize(div?.offsetWidth)
    }
    window.addEventListener('resize', getDivSize)

    return () => {
      window.removeEventListener('resize', getDivSize)
    }
  }, [])

  return (
    <>
      <div>
        <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
          <span className='roboto text-sm font-bold text-dark-grey'>Analyze</span>
          <span className='roboto text-sm font-light italic text-dark-grey'>
            Co-Sell Connection Activity
          </span>
        </div>
      </div>
      <div className='relative flex flex-col items-center justify-center pb-2 2xl:flex-row 3xl:justify-start'>
        <div className='h-[450px] w-full pt-1 2xl:pl-4 2xl:max-w-[920px] mt-3 md:mt-0'>
          <ResponsiveContainer>
            <AreaChart
              width={920}
              height={400}
              data={chartdata}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#292D30' />
                  <stop offset='95%' stopColor='#292D30' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#34B3F1' />
                  <stop offset='95%' stopColor='#34B3F1' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorQv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#11AF22' />
                  <stop offset='95%' stopColor='#34B3F1' stopOpacity={0} />
                </linearGradient>
              </defs>
              <ReferenceLine
                x={chartdata[chartdata.length - 1].name}
                stroke='#D9D9D9'
                alwaysShow={true}
              />
              <XAxis
                dataKey='name'
                fontSize={'14px'}
                fontFamily={'Poppins,sans-serif'}
                tickLine={false}
                tickMargin={12}
                tick={{ fill: '#666666' }}
                interval={0}
                axisLine={{ stroke: '#D9D9D9' }}
              />
              <YAxis
                tickCount={200}
                interval={1}
                fontFamily={'Poppins,sans-serif'}
                tick={{ fill: '#666666' }}
                domain={[0, 10]}
                axisLine={{ stroke: '#D9D9D9' }}
                tickMargin={25}
                tickLine={false}
                allowDecimals={false}
              />
              <CartesianGrid vertical={false} stroke='#D9D9D9' />
              <Legend align='right' verticalAlign='top' content={<RenderLegend />} />
              <Tooltip
                content={<CustomTooltip active payload={[{ dataKey: '', value: '' }]} />}
                cursor={{ fill: 'transparent' }}
              />
              <Area
                type='monotone'
                name='Zoom'
                dot={{ r: 4, cx: 6, cy: 2 }}
                dataKey='uv'
                stroke='#292D30'
                activeDot={<></>}
                strokeWidth={5}
                fillOpacity={1}
                className='border-[1px]'
                fill='url(#colorUv)'
              />
              <Area
                type='monotone'
                name='Lumen'
                dataKey='pv'
                activeDot={<></>}
                stroke='#34B3F1'
                strokeWidth={5}
                className='border-[1px]'
                fillOpacity={1}
                fill='url(#colorPv)'
              />
              <Area
                type='monotone'
                dataKey='uvpv'
                name='Genesys'
                activeDot={<></>}
                stroke='#11AF22'
                strokeWidth={5}
                fillOpacity={1}
                fill='url(#colorQv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className='charts flex h-[400px] min-w-[250px] flex-col gap-4 py-9 pl-2 pr-5 sm:w-[90%] sm:max-w-[900px] sm:pl-0 2xl:h-[600px] 2xl:w-[500px] 3xl:pr-0'>
          <div className='flex flex-wrap items-center gap-5'>
            <div className='rounded-[10px] border py-[10px] px-5'>
              <img src='filterIcon.png' />
            </div>
            <div className='flex items-center justify-center gap-[76px] rounded-[10px] border py-[10px] px-5'>
              <img src='sortIcon.png' />
              <p className='font-roboto text-sm font-normal text-light-grey-200'>Lumen</p>
            </div>
            <div>
              <div>
                <button className='flex items-center gap-6 rounded-[10px] border px-[29px] py-[11px]'>
                  <ArrowLeft />
                  <p className='w-max font-roboto text-light-grey-200'>
                    {DateFormatter(startDate)}
                  </p>
                  <ArrowRight />
                </button>
                {isOpen && <ReactDatePicker selected={startDate} onChange={handleChange} inline />}
              </div>
            </div>
          </div>
          {lineData.map((elem, idx) => {
            const borderValue = (size * elem.precent) / 100

            return (
              <div key={idx} className='flex flex-col'>
                <div className='flex justify-between'>
                  <span className='roboto text-[13px] leading-5 text-grey-600'>{elem.title}</span>
                  <span className='roboto text-[13px] leading-5 text-grey-600'>{elem.value}</span>
                </div>
                <div
                  style={{
                    transition: 'border-left-width 2s linear',
                    borderLeftWidth: `${borderValue}px`,
                  }}
                  className='h-2 min-w-[250px] rounded-[160px] border-l-light-blue-200 bg-light-grey-100 transition-all duration-300 ease-in-out sm:max-w-[900px] 3xl:w-[500px]'
                ></div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className='grid max-w-[1503px] grid-cols-2 py-5 pl-0  sm:pl-6 lg:grid-cols-4'>
        {pieChart.map((elem, idx) => {
          return (
            <div
              key={idx}
              className='flex items-center gap-4 border-l pl-0 first:pl-0 lg:pl-4 lg:first:border-l-0'
            >
              <div className='relative flex items-center justify-center'>
                <PieCharts innerRadius={15} outerRadius={20} width={50} height={50} data01={elem} />
                <div className='absolute'>
                  <span className='roboto text-[15px] font-light text-grey-500'>
                    {elem[0].value}
                  </span>
                </div>
              </div>
              <div>
                <span className='roboto text-grey-700'>{elem[0].title}</span>
              </div>
            </div>
          )
        })}
      </div> */}
    </>
  )
}

export default DriveHeader
