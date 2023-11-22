import FullLogo from '../assets/images/partnerchainlogo.png'
import Sidebar from './Layout'

function Header() {
  return (
    <div>
      <Sidebar />
      <img src={FullLogo} alt='Partner Chain Logo' className='h-32 pb-4 pt-4' />
      <hr />
    </div>
  )
}
export default Header
