import Spinner from '../../assets/images/loading.png'

interface ILoaderProps {
  className?: string
}

const Loader = ({ className }: ILoaderProps) => {
  return (
    <div>
      <img src={Spinner} alt='loading' className={`mx-auto mt-3 ${className}`} />
    </div>
  )
}

export default Loader
