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
import EditMenuItem from './components/Admin/EditMenuItem/EditMenuItem'
import UserGuard from './components/common/UserGuard'
import UsersManagment from './components/Admin/ControlPanel/UsersManagment/UsersManagment'
import { Toaster } from 'sonner';



function App() {

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Details />} />

          {/* GUEST ONLY */}
          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>


          {/* ADMIN ONLY */}
          <Route element={<AdminGuard />}>
            <Route path="/admin/controlPanel" element={<ControlPanel />} />
            <Route path="/edit/:id" element={<EditMenuItem />} />
            <Route path="/admin/users" element={<UsersManagment />} />

          </Route>
          {/* USER ONLY */}
          <Route element={<UserGuard />}>
            <Route path="/cart" element={<Cart />} />
          </Route>




          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
      <Footer />

      <Toaster
        position="top-right"
        duration={4000}
        closeButton={true}
        richColors={true}
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '14px',
          },

          success: {
            style: {
              border: '1px solid green',
            },
          },
          error: {
            style: {
              border: '1px solid red',
            },
          },
        }}
      />
    </>

  )
}

export default App
