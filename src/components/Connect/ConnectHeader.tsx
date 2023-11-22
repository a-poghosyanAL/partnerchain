// import CustomBoxes from '../reusable/CustomBoxes'
import { BASE_URL } from '../../utils/constants'
import { useFetch } from '../../queries'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getBoxdata } from '../../redux/tableSlice/TableSlice'
import Loader from '../Table/Loader'
import ChartIframe from '../reusable/ChartIframe'

const ConnectHeader = () => {
  const dispatch = useAppDispatch()
  useFetch(BASE_URL + 'GetCustomerDataStatusCounts', 'boxValues', getBoxDataSuccess)
  const { boxData } = useAppSelector((state) => state.accountData)

  function getBoxDataSuccess(data: []) {
    dispatch(getBoxdata(data))
  }

  return (
    <div>
      <div className='bg-transparent'>
        <div>
          {boxData && boxData.length ? (
            <div>
              <div className='flex h-12 items-center gap-[15px] border-b-[1px] border-light-grey-100 pl-4'>
                <span className='roboto text-sm font-bold text-dark-grey'>Connect </span>
                <span className='roboto text-sm font-light italic text-dark-grey'>
                  Initiate Co-Sell Connection & Collaboration
                </span>
              </div>
              <div className='mx-[17px] mt-[17px] mb-0 pt-[7px]'>
                <ChartIframe queryKey='chartValueConnect' url='GetMetabaseConnectUrl' />
              </div>
            </div>
          ) : (
            <Loader className='max-w-[100px]' />
          )}
        </div>
      </div>
    </div>
  )
}

export default ConnectHeader
