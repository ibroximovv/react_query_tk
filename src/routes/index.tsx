import { Route, Routes } from "react-router-dom"
import { Create, Home } from "../pages"

const PageRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
    </Routes>
  )
}

export default PageRoutes