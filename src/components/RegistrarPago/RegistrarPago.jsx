import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, CreditCard, DollarSign, CalendarDays, Hash, ChevronLeft, Wallet, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegistrarPago() {
  const navigate = useNavigate();
  const [pago, setPago] = useState({
    placa: '',
    monto: '',
    fechaHora: '',
    metodoPago: '',
    estado: ''
  });

  const handlePagoSubmit = (e) => {
    e.preventDefault();
    if (!pago.placa || !pago.monto || !pago.fechaHora || !pago.metodoPago || !pago.estado) {
      toast.error('Por favor completa todos los campos para registrar el pago');
      return;
    }
    toast.success('Pago registrado exitosamente');
    
    const storedData = JSON.parse(sessionStorage.getItem('pagosData') || '[]');
    const newRecord = {
      id: Date.now(),
      placa: pago.placa,
      monto: Number(pago.monto),
      fechaHora: pago.fechaHora,
      metodoPago: pago.metodoPago,
      estado: pago.estado
    };
    storedData.push(newRecord);
    sessionStorage.setItem('pagosData', JSON.stringify(storedData));

    navigate('/pagos'); // Redireccionar a la vista de pagos
  };

  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-100 to-white">
              Registrar Pago
            </h1>
          </div>

          <Link
            to="/pagos"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-emerald-500/50 rounded-xl transition-all duration-300 shadow-sm group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden sm:inline">Volver a Pagos</span>
          </Link>
        </div>

        {/* Formulario de Registro de Pago */}
        <div className="bg-[#111827]/60 backdrop-blur-xl border border-emerald-500/10 hover:border-emerald-500/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-emerald-500/10"></div>

          <form onSubmit={handlePagoSubmit} className="flex flex-col gap-6 grow">
            {/* Fila 1: Placa y Monto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Placa del Vehículo</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={pago.placa}
                    onChange={(e) => setPago({ ...pago, placa: e.target.value.toUpperCase() })}
                    placeholder="Ej. ABC123"
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-emerald-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500/20 py-3 pl-11 pr-4 transition-all duration-300 uppercase outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Monto del Pago (COP)</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={pago.monto}
                    onChange={(e) => setPago({ ...pago, monto: e.target.value })}
                    placeholder="Ej. 15000"
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-emerald-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500/20 py-3 pl-11 pr-4 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Fila 2: FechaHora y Metodo Pago */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Fecha y Hora</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="datetime-local"
                    value={pago.fechaHora}
                    onChange={(e) => setPago({ ...pago, fechaHora: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-emerald-500/50 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none scheme-dark"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Método de Pago</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Wallet className="h-5 w-5 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <select
                    value={pago.metodoPago}
                    onChange={(e) => setPago({ ...pago, metodoPago: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-emerald-500/50 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-500">Seleccione un método</option>
                    <option value="Efectivo" className="bg-[#0B1120]">Efectivo</option>
                    <option value="Tarjeta de Crédito" className="bg-[#0B1120]">Tarjeta de Crédito</option>
                    <option value="Transferencia" className="bg-[#0B1120]">Transferencia</option>
                    <option value="Nequi" className="bg-[#0B1120]">Nequi</option>
                    <option value="Daviplata" className="bg-[#0B1120]">Daviplata</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fila 3: Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Estado del Pago</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CheckCircle className="h-5 w-5 text-gray-500 group-focus-within/input:text-emerald-500 transition-colors" />
                  </div>
                  <select
                    value={pago.estado}
                    onChange={(e) => setPago({ ...pago, estado: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-emerald-500/50 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-500">Seleccione un estado</option>
                    <option value="Aprobado" className="bg-[#0B1120] text-green-400">Aprobado</option>
                    <option value="Pendiente" className="bg-[#0B1120] text-amber-400">Pendiente</option>
                    <option value="Rechazado" className="bg-[#0B1120] text-red-400">Rechazado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-700/30">
              <button
                type="submit"
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98]"
              >
                <CreditCard className="w-5 h-5" />
                Completar Registro de Pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
