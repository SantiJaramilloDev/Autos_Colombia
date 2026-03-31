import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Car, LogIn, LogOut, Hash, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegistroVehiculos() {
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.editItem;

  const [entrada, setEntrada] = useState(() => {
    if (editItem && editItem.tipo === 'Entrada') {
      return { placa: editItem.placa, fechaHora: editItem.fechaHora };
    }
    return { placa: '', fechaHora: '' };
  });

  const [salida, setSalida] = useState(() => {
    if (editItem && editItem.tipo === 'Salida') {
      return { placa: editItem.placa, fechaHora: editItem.fechaHora };
    }
    return { placa: '', fechaHora: '' };
  });

  const handleEntradaSubmit = (e) => {
    e.preventDefault();
    if (!entrada.placa || !entrada.fechaHora) {
      toast.error('Por favor completa todos los campos para entrada');
      return;
    }
    
    // Guardar en sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('entradasSalidasData') || '[]');
    
    if (editItem && editItem.tipo === 'Entrada') {
      const index = storedData.findIndex(item => item.id === editItem.id);
      if (index !== -1) {
        storedData[index] = { ...editItem, placa: entrada.placa, fechaHora: entrada.fechaHora };
        sessionStorage.setItem('entradasSalidasData', JSON.stringify(storedData));
        toast.success('Entrada actualizada exitosamente');
      }
    } else {
      const newRecord = {
        id: Date.now(),
        placa: entrada.placa,
        tipo: 'Entrada',
        fechaHora: entrada.fechaHora,
        estado: 'Completado'
      };
      storedData.push(newRecord);
      sessionStorage.setItem('entradasSalidasData', JSON.stringify(storedData));
      toast.success('Entrada registrada exitosamente');
    }

    setEntrada({ placa: '', fechaHora: '' });
    navigate('/entradas-salidas');
  };

  const handleSalidaSubmit = (e) => {
    e.preventDefault();
    if (!salida.placa || !salida.fechaHora) {
      toast.error('Por favor completa todos los campos para salida');
      return;
    }
    
    // Guardar en sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('entradasSalidasData') || '[]');
    
    if (editItem && editItem.tipo === 'Salida') {
      const index = storedData.findIndex(item => item.id === editItem.id);
      if (index !== -1) {
        storedData[index] = { ...editItem, placa: salida.placa, fechaHora: salida.fechaHora };
        sessionStorage.setItem('entradasSalidasData', JSON.stringify(storedData));
        toast.success('Salida actualizada exitosamente');
      }
    } else {
      const newRecord = {
        id: Date.now(),
        placa: salida.placa,
        tipo: 'Salida',
        fechaHora: salida.fechaHora,
        estado: 'Completado'
      };
      storedData.push(newRecord);
      sessionStorage.setItem('entradasSalidasData', JSON.stringify(storedData));
      toast.success('Salida registrada exitosamente');
    }

    setSalida({ placa: '', fechaHora: '' });
    navigate('/entradas-salidas');
  };

  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header con botón de volver */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-100 to-white">
              Registro de Vehículos
            </h1>
          </div>

          <Link
            to="/home"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-blue-500/50 rounded-xl transition-all duration-300 shadow-sm group"
          >
            <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden sm:inline">Volver al Home</span>
          </Link>
        </div>

        {/* Formularios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de Entrada */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-green-500/10"></div>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shadow-inner">
                <LogIn className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                {editItem && editItem.tipo === 'Entrada' ? 'Editar Entrada' : 'Registrar Entrada'}
              </h2>
            </div>

            <form onSubmit={handleEntradaSubmit} className="flex flex-col gap-6 grow">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Placa del Vehículo</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-500 group-focus-within/input:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={entrada.placa}
                    onChange={(e) => setEntrada({ ...entrada, placa: e.target.value.toUpperCase() })}
                    placeholder="Ej. ABC-123"
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-green-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-green-500/20 py-3 pl-11 pr-4 transition-all duration-300 uppercase outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Fecha y Hora de Ingreso</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-500 group-focus-within/input:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="datetime-local"
                    value={entrada.fechaHora}
                    onChange={(e) => setEntrada({ ...entrada, fechaHora: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-green-500/50 text-white rounded-xl focus:ring-2 focus:ring-green-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none scheme-dark"
                  />
                </div>
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] cursor-pointer"
                >
                  <LogIn className="w-5 h-5" />
                  {editItem && editItem.tipo === 'Entrada' ? 'Actualizar Entrada' : 'Registrar Entrada'}
                </button>
              </div>
            </form>
          </div>

          {/* Formulario de Salida */}
          <div className="bg-[#111827]/60 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-red-500/10"></div>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-400 shadow-inner">
                <LogOut className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                {editItem && editItem.tipo === 'Salida' ? 'Editar Salida' : 'Registrar Salida'}
              </h2>
            </div>

            <form onSubmit={handleSalidaSubmit} className="flex flex-col gap-6 grow">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Placa del Vehículo</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={salida.placa}
                    onChange={(e) => setSalida({ ...salida, placa: e.target.value.toUpperCase() })}
                    placeholder="Ej. ABC123"
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 uppercase outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Fecha y Hora de Salida</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="datetime-local"
                    value={salida.fechaHora}
                    onChange={(e) => setSalida({ ...salida, fechaHora: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none scheme-dark"
                  />
                </div>
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.2)] hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  {editItem && editItem.tipo === 'Salida' ? 'Actualizar Salida' : 'Registrar Salida'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
