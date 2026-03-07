import { Routes, Route } from 'react-router-dom'
import InicioSesion from './components/InicioSesion/InicioSesion'
import Registro from './components/Resgistro/Registro'
import Home from './components/Home/Home'
import { Toaster } from "react-hot-toast";
import RegistroVehiculos from './components/RegistroVehiculos/RegistroVehiculos'
import EntradasSalidas from './components/EntradasSalidas/EntradasSalidas'
import Pagos from './components/Pagos/Pagos'
import RegistrarPago from './components/RegistrarPago/RegistrarPago'
import Incidentes from './components/Incidentes/Incidentes'
import RegistrarIncidente from './components/RegistrarIncidente/RegistrarIncidente'

function App() {

  return (
    <div className='w-full min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden relative flex flex-col'>
      {/* Global Background blur effects */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full h-full grow flex flex-col">
        <Toaster richColors position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path='/' element={<InicioSesion />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/home' element={<Home />} />
          <Route path='/registro-vehiculos' element={<RegistroVehiculos />} />
          <Route path='/entradas-salidas' element={<EntradasSalidas />} />
          <Route path='/pagos' element={<Pagos />} />
          <Route path='/registrar-pago' element={<RegistrarPago />} />
          <Route path='/incidentes' element={<Incidentes />} />
          <Route path='/registrar-incidente' element={<RegistrarIncidente />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
