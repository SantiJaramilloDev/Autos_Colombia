import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, CreditCard, Plus, Calendar, Hash, DollarSign, Wallet, Edit2, Trash2, Settings } from 'lucide-react';

const mockDataPagos = [
  { id: 1, placa: 'ABC123', monto: 15000, fechaHora: '2023-10-27T08:30', metodoPago: 'Efectivo', estado: 'Aprobado' },
  { id: 2, placa: 'XYZ789', monto: 20000, fechaHora: '2023-10-27T17:45', metodoPago: 'Tarjeta de Crédito', estado: 'Pendiente' },
  { id: 3, placa: 'DEF456', monto: 15000, fechaHora: '2023-10-28T09:15', metodoPago: 'Efectivo', estado: 'Aprobado' },
  { id: 4, placa: 'LMN012', monto: 25000, fechaHora: '2023-10-28T18:00', metodoPago: 'Transferencia', estado: 'Rechazado' },
  { id: 5, placa: 'PQR345', monto: 15000, fechaHora: '2023-10-29T07:50', metodoPago: 'Efectivo', estado: 'Aprobado' },
];

const getEstadoColor = (estado) => {
  switch (estado) {
    case 'Aprobado':
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'Pendiente':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'Rechazado':
      return 'bg-red-500/10 text-red-400 border border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount);
};

export default function Pagos() {
  const [data] = useState(() => {
    const storedData = sessionStorage.getItem('pagosData');
    if (storedData) return JSON.parse(storedData);
    return mockDataPagos;
  });

  useEffect(() => {
    if (!sessionStorage.getItem('pagosData')) {
      sessionStorage.setItem('pagosData', JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header con botón de volver */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-100 to-white">
              Gestionar Pagos
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              to="/registrar-pago"
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Registrar Pago</span>
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-green-500/50 rounded-xl transition-all duration-300 shadow-sm group"
            >
              <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden sm:inline">Volver al Home</span>
            </Link>
          </div>
        </div>

        {/* Tabla Refinada */}
        <div className="bg-[#111827]/60 backdrop-blur-xl border border-green-500/10 hover:border-green-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm font-semibold tracking-wider">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-green-400" />
                      PLACA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      MONTO
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      FECHA Y HORA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-green-400" />
                      MÉTODO DE PAGO
                    </div>
                  </th>
                  <th className="px-6 py-4">ESTADO</th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Settings className="w-4 h-4 text-green-400" />
                      ACCIONES
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {data.map((pago) => (
                  <tr
                    key={pago.id}
                    className="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-white group-hover:text-green-300 transition-colors">
                      {pago.placa}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {formatCurrency(pago.monto)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white/90">
                          {new Date(pago.fechaHora).toLocaleDateString('es-CO', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(pago.fechaHora).toLocaleTimeString('es-CO', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {pago.metodoPago}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(pago.estado)}`}>
                        {pago.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
