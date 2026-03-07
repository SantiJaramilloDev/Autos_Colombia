import { Link, useNavigate } from 'react-router-dom';
import { Car, ArrowRightLeft, CreditCard, AlertTriangle, LogOut, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar estados/tokens si fuera necesario
    navigate('/');
  };

  const menuItems = [
    { title: 'Registro de Vehículos', icon: Car, path: '/registro-vehiculos', color: 'from-blue-500 to-cyan-500' },
    { title: 'Entradas y Salidas', icon: ArrowRightLeft, path: '/entradas-salidas', color: 'from-purple-500 to-pink-500' },
    { title: 'Gestionar Pagos', icon: CreditCard, path: '/pagos', color: 'from-green-500 to-emerald-500' },
    { title: 'Ver Incidentes', icon: AlertTriangle, path: '/incidentes', color: 'from-red-500 to-orange-500' },
  ];

  return (
    <div className="w-full h-full p-6 md:p-12 font-sans antialiased relative flex flex-col justify-center items-center grow">
      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center animate-fade-in-up">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-16 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 tracking-tight drop-shadow-sm">
            Bienvenido a Autos Colombia
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="group relative bg-[#111827]/60 backdrop-blur-xl border border-blue-500/10 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white drop-shadow-md" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">
                    {item.title}
                  </h2>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
