import { connectionStaticData, driveStaticData, icons } from '../../utils/constants'

interface ICustomBoxes {
  data: {
    approved: number
    awaiting_owner_response: number
    awaiting_partner_response: number
    awaiting_response: number
    complete: number
    ready: number
    rejected: number
    total_connections: number
  }[]
  page: 'drive' | 'connect'
}

const CustomBoxes = ({ data, page }: ICustomBoxes) => {
  const transformedData = [
    { text: 'Connections in Queue', val: data[0]?.total_connections },
    { text: 'Sent Awaiting Response', val: data[0]?.awaiting_response },
    { text: 'Declined Introduction', val: data[0]?.rejected },
    { text: 'Auto Introductions Complete', val: data[0]?.complete },
  ]
  return (
    <div className='relative z-[8] m-auto grid max-w-[1330px] grid-cols-1 justify-between gap-6 pb-6 md:grid-cols-2 md:px-4 xl:grid-cols-3 2xl:flex'>
      {data &&
        transformedData.map((item, idx) => {
          const Icon = icons[idx]
          return (
            <div
              key={idx}
              className={`mx-auto flex max-h-[130px] w-full max-w-[445px] flex-col gap-2 rounded-[10px] px-4 pt-4 pb-[13px] md:max-w-[293px] ${
                page === 'connect'
                  ? connectionStaticData[idx]
                  : page === 'drive'
                  ? driveStaticData[idx]
                  : ''
              }`}
            >
              <div className='flex justify-center'>
                <span className='roboto text-base font-light capitalize text-white'>
                  {item.text}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='roboto text-[40px] font-medium text-white'>{item.val}</span>
                {<Icon />}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default CustomBoxes
