import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Home, ArrowRightLeft, Plus, LogIn, LogOut, Calendar, Hash, Edit2, Trash2, Settings } from 'lucide-react';

const mockData = [
  { id: 1, placa: 'ABC123', tipo: 'Entrada', fechaHora: '2023-10-27T08:30', estado: 'Completado' },
  { id: 2, placa: 'XYZ789', tipo: 'Salida', fechaHora: '2023-10-27T17:45', estado: 'Completado' },
  { id: 3, placa: 'DEF456', tipo: 'Entrada', fechaHora: '2023-10-28T09:15', estado: 'Completado' },
  { id: 4, placa: 'LMN012', tipo: 'Salida', fechaHora: '2023-10-28T18:00', estado: 'Pendiente' },
  { id: 5, placa: 'PQR345', tipo: 'Entrada', fechaHora: '2023-10-29T07:50', estado: 'Completado' },
];

export default function EntradasSalidas() {
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem('entradasSalidasData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return mockData;
  });

  useEffect(() => {
    // Sync to storage if initialized with mockData and it wasn't there
    if (!sessionStorage.getItem('entradasSalidasData')) {
      sessionStorage.setItem('entradasSalidasData', JSON.stringify(data));
    }
  }, [data]);

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    sessionStorage.setItem('entradasSalidasData', JSON.stringify(newData));
    toast.success('Registro eliminado exitosamente');
  };

  const handleEdit = (registro) => {
    navigate('/registro-vehiculos', { state: { editItem: registro } });
  };

  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header con botón de volver */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-100 to-white">
              Entradas y Salidas
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              to="/registro-vehiculos"
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Registrar Entrada/Salida</span>
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-purple-500/50 rounded-xl transition-all duration-300 shadow-sm group"
            >
              <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden sm:inline">Volver al Home</span>
            </Link>
          </div>
        </div>

        {/* Tabla Refinada */}
        <div className="bg-[#111827]/60 backdrop-blur-xl border border-purple-500/10 hover:border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm font-semibold tracking-wider">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-purple-400" />
                      PLACA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-purple-400" />
                      TIPO
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      FECHA Y HORA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Settings className="w-4 h-4 text-purple-400" />
                      ACCIONES
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {data.map((registro) => (
                  <tr
                    key={registro.id}
                    className="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-white group-hover:text-purple-300 transition-colors">
                      {registro.placa}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {registro.tipo === 'Entrada' ? (
                          <div className="p-1.5 bg-green-500/10 rounded-lg text-green-400">
                            <LogIn className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="p-1.5 bg-red-500/10 rounded-lg text-red-400">
                            <LogOut className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium">{registro.tipo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white/90">
                          {new Date(registro.fechaHora).toLocaleDateString('es-CO', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(registro.fechaHora).toLocaleTimeString('es-CO', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(registro)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(registro.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
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
