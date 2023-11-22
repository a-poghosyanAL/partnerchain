import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { setPage } from '../../redux/tableSlice/TableSlice'
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrowLeft.svg'
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRightIcon.svg'
interface IPagination {
  drivePage?: boolean
}
export default function Pagination({ drivePage }: IPagination) {
  const dispatch = useDispatch()
  const { filteredData, entries, page } = useAppSelector((state) => state.accountData)
  const totalPages = Math.ceil(filteredData.data.length / entries)

  return (
    <div className='relative mb-2 mt-3 flex justify-between pr-[38px] md:pr-0'>
      {!drivePage && (
        <span className='roboto pl-9 text-[13px] leading-[19px] text-grey-600'>
          Showing {page - 1 > 0 ? (page - 1) * entries : 1} to {page * entries} of{' '}
          {filteredData.data.length} entries
        </span>
      )}
      <div className='right-[38px] top-0 flex max-w-[320px] gap-[5px] overflow-x-auto pb-1 sm:absolute md:left-auto md:right-11 md:top-0'>
        <button
          className={`flex h-6 min-h-[24px] w-6 min-w-[24px] cursor-pointer items-center justify-center rounded bg-light-grey-500`}
          onClick={() => dispatch(setPage({ value: page - 1 }))}
          disabled={page === 1}
        >
          <ArrowLeft className={`h-3 ${page === 1 && 'hidden'}`} />
        </button>
        {new Array(Math.ceil(filteredData.data.length / entries)).fill(null).map((_, i) => {
          if (page - 1 === i) {
            return (
              <button
                key={i}
                className={`flex h-6 min-h-[24px] w-6 min-w-[24px] cursor-pointer items-center justify-center rounded ${
                  page - 1 === i ? 'bg-light-blue-100' : 'bg-gray-400'
                } `}
                onClick={() => dispatch(setPage({ value: i + 1 }))}
              >
                <span className='text-[13px] text-white'>{i + 1}</span>
              </button>
            )
          }
        })}
        <button
          className={`flex h-6 min-h-[24px] w-6 min-w-[24px] cursor-pointer items-center justify-center rounded bg-light-grey-500 `}
          onClick={() => dispatch(setPage({ value: page + 1 }))}
          disabled={page === totalPages}
        >
          <ArrowRight className={`h-3 ${page === totalPages && 'hidden'}`} />
        </button>
      </div>
    </div>
  )
}
