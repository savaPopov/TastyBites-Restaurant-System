
import './components/Button.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Hero'
import Cart from './components/Cart/Cart'
import { Menu } from './components/Menu/Menu'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Details from './components/Details/Details'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ControlPanel from './components/Admin/ControlPanel/ControlPanel'
import AdminGuard from './components/common/AdminGuard'
import GuestGuard from './components/common/GuestGuard'



function App() {

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin/controlPanel" element={<ControlPanel />} />
          </Route>

          <Route path="/menu/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
