import { Button } from "antd"
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between px-10 py-5 bg-gradient-to-r from-green-900 to-orange-50">
        <NavLink className={'cursor-pointer text-white font-bold text-[20px]'} to={'/'}>Home</NavLink>
        <div>
            <Button onClick={() => navigate('/create')} className="!cursor-pointer !bg-green-800 !text-[18px] !border-none !text-white !font-semibold !rounded-lg hover:!bg-green-700 transition-colors ">Create</Button>
        </div>
    </header>
  )
}

export default Header