import IframeResizer from 'iframe-resizer-react'
import { useRef } from 'react'
import { useFetch } from '../../queries'
import { BASE_URL } from '../../utils/constants'

interface IProps {
  queryKey: string
  url: string
}

export default function ChartIframe({ queryKey, url }: IProps) {
  const iframeRef = useRef()
  const { data: chartData, isSuccess: chartSuccess } = useFetch<{ iframeurl: string }>(
    BASE_URL + url,
    queryKey,
    undefined,
    600000,
  )

  return (
    <>
      {chartSuccess && (
        <IframeResizer
          forwardRef={iframeRef}
          heightCalculationMethod='lowestElement'
          inPageLinks
          src={chartData?.iframeurl}
          className='w-full'
          id='connect-iframe'
        />
      )}
    </>
  )
}
