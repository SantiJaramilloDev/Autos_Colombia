import { Link } from 'react-router-dom';
import { Home, AlertTriangle, Plus, Hash, FileText, Calendar, ShieldAlert, Edit2, Trash2, Settings } from 'lucide-react';

const mockDataIncidentes = [
  { id: 1, placa: 'ABC123', tipoDano: 'Choque Frontal', descripcion: 'Rasguño en parachoques', fecha: '2023-10-27', estado: 'En Revisión' },
  { id: 2, placa: 'XYZ789', tipoDano: 'Falla Mecánica', descripcion: 'Motor no arranca', fecha: '2023-10-26', estado: 'Resuelto' },
  { id: 3, placa: 'DEF456', tipoDano: 'Pintura', descripcion: 'Desgaste en puerta lateral', fecha: '2023-10-28', estado: 'Pendiente' },
  { id: 4, placa: 'LMN012', tipoDano: 'Eléctrico', descripcion: 'Luces traseras no funcionan', fecha: '2023-10-28', estado: 'En Reparación' },
  { id: 5, placa: 'PQR345', tipoDano: 'Cristales', descripcion: 'Parabrisas astillado', fecha: '2023-10-29', estado: 'Pendiente' },
];

const getEstadoColor = (estado) => {
  switch (estado) {
    case 'Resuelto':
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'En Revisión':
    case 'En Reparación':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    case 'Pendiente':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  }
};

export default function Incidentes() {
  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header con botón de volver */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-100 to-white">
              Incidentes
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              to="/registrar-incidente"
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Registrar Incidente</span>
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-red-500/50 rounded-xl transition-all duration-300 shadow-sm group"
            >
              <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden sm:inline">Volver al Home</span>
            </Link>
          </div>
        </div>

        {/* Tabla Refinada */}
        <div className="bg-[#111827]/60 backdrop-blur-xl border border-red-500/10 hover:border-red-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm font-semibold tracking-wider">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-red-400" />
                      PLACA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      TIPO DE DAÑO
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-400" />
                      DESCRIPCIÓN
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-400" />
                      FECHA
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      ESTADO
                    </div>
                  </th>
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Settings className="w-4 h-4 text-red-400" />
                      ACCIONES
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {mockDataIncidentes.map((incidente) => (
                  <tr
                    key={incidente.id}
                    className="hover:bg-white/5 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-white group-hover:text-red-300 transition-colors">
                      {incidente.placa}
                    </td>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {incidente.tipoDano}
                    </td>
                    <td className="px-6 py-4 text-gray-300 max-w-xs truncate" title={incidente.descripcion}>
                      {incidente.descripcion}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/90">
                        {new Date(incidente.fecha).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getEstadoColor(incidente.estado)}`}>
                        {incidente.estado}
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
