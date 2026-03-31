import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, AlertTriangle, CalendarDays, Hash, ChevronLeft, FileText, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegistrarIncidente() {
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.editItem;

  const [incidente, setIncidente] = useState(() => {
    if (editItem) {
      return { ...editItem };
    }
    return {
      placa: '',
      tipoDano: '',
      descripcion: '',
      fecha: '',
      estado: ''
    };
  });

  const handleIncidenteSubmit = (e) => {
    e.preventDefault();
    if (!incidente.placa || !incidente.tipoDano || !incidente.descripcion || !incidente.fecha || !incidente.estado) {
      toast.error('Por favor completa todos los campos para registrar el incidente');
      return;
    }
    
    const storedData = JSON.parse(sessionStorage.getItem('incidentesData') || '[]');
    
    if (editItem) {
      const index = storedData.findIndex(item => item.id === editItem.id);
      if (index !== -1) {
        storedData[index] = { ...incidente };
        sessionStorage.setItem('incidentesData', JSON.stringify(storedData));
        toast.success('Incidente actualizado exitosamente');
      }
    } else {
      const newRecord = {
        id: Date.now(),
        placa: incidente.placa,
        tipoDano: incidente.tipoDano,
        descripcion: incidente.descripcion,
        fecha: incidente.fecha,
        estado: incidente.estado
      };
      storedData.push(newRecord);
      sessionStorage.setItem('incidentesData', JSON.stringify(storedData));
      toast.success('Incidente registrado exitosamente');
    }

    navigate('/incidentes'); // Redireccionar a la vista de incidentes
  };

  return (
    <div className="w-full flex-col justify-center items-center min-h-screen p-6 md:p-12 font-sans antialiased relative bg-[#0B1120] flex grow">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-100 to-white">
              {editItem ? 'Editar Incidente' : 'Registrar Incidente'}
            </h1>
          </div>

          <Link
            to="/incidentes"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111827]/80 hover:bg-[#1f2937] text-gray-300 hover:text-white border border-gray-700/50 hover:border-red-500/50 rounded-xl transition-all duration-300 shadow-sm group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden sm:inline">Volver a Incidentes</span>
          </Link>
        </div>

        {/* Formulario de Registro de Incidente */}
        <div className="bg-[#111827]/60 backdrop-blur-xl border border-red-500/10 hover:border-red-500/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-red-500/10"></div>

          <form onSubmit={handleIncidenteSubmit} className="flex flex-col gap-6 grow">
            {/* Fila 1: Placa y Tipo de Daño */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Placa del Vehículo</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={incidente.placa}
                    onChange={(e) => setIncidente({ ...incidente, placa: e.target.value.toUpperCase() })}
                    placeholder="Ej. ABC123"
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 uppercase outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Tipo de Daño</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <AlertTriangle className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <select
                    value={incidente.tipoDano}
                    onChange={(e) => setIncidente({ ...incidente, tipoDano: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-500">Seleccione un tipo</option>
                    <option value="Choque Frontal" className="bg-[#0B1120]">Choque Frontal</option>
                    <option value="Choque Trasero" className="bg-[#0B1120]">Choque Trasero</option>
                    <option value="Falla Mecánica" className="bg-[#0B1120]">Falla Mecánica</option>
                    <option value="Pintura" className="bg-[#0B1120]">Pintura</option>
                    <option value="Eléctrico" className="bg-[#0B1120]">Eléctrico</option>
                    <option value="Cristales" className="bg-[#0B1120]">Cristales</option>
                    <option value="Otro" className="bg-[#0B1120]">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fila 2: Descripción Larga */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Descripción del Daño</label>
              <div className="relative group/input">
                <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors mt-1" />
                </div>
                <textarea
                  value={incidente.descripcion}
                  onChange={(e) => setIncidente({ ...incidente, descripcion: e.target.value })}
                  placeholder="Detalle los daños visibles o el problema reportado..."
                  rows="3"
                  className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white placeholder-gray-600 rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 outline-none resize-none"
                />
              </div>
            </div>

            {/* Fila 3: Fecha y Estado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Fecha del Incidente</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="date"
                    value={incidente.fecha}
                    onChange={(e) => setIncidente({ ...incidente, fecha: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none scheme-dark"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Estado del Incidente</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShieldAlert className="h-5 w-5 text-gray-500 group-focus-within/input:text-red-500 transition-colors" />
                  </div>
                  <select
                    value={incidente.estado}
                    onChange={(e) => setIncidente({ ...incidente, estado: e.target.value })}
                    className="w-full bg-[#0B1120]/80 border border-gray-700/50 focus:border-red-500/50 text-white rounded-xl focus:ring-2 focus:ring-red-500/20 py-3 pl-11 pr-4 transition-all duration-300 text-sm outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-500">Seleccione un estado</option>
                    <option value="En Revisión" className="bg-[#0B1120] text-blue-400">En Revisión</option>
                    <option value="En Reparación" className="bg-[#0B1120] text-orange-400">En Reparación</option>
                    <option value="Pendiente" className="bg-[#0B1120] text-amber-400">Pendiente</option>
                    <option value="Resuelto" className="bg-[#0B1120] text-green-400">Resuelto</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-700/30">
              <button
                type="submit"
                className="w-full bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5" />
                {editItem ? 'Actualizar Incidente' : 'Completar Registro de Incidente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
