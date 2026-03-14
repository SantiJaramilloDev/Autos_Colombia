import { useState } from 'react';
import { Mail, Lock, Car, ArrowRight, Eye, EyeOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    // Guardar usuario en sessionStorage
    const userData = { nombre, email, password };
    sessionStorage.setItem('userData', JSON.stringify(userData));

    toast.success("registro completado");
    navigate('/');
    console.log("Registrando usuario con:", userData);
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center p-4 antialiased">
      {/* Contenedor Principal (Glassmorphism) */}
      <div className="relative w-full max-w-md bg-[#0a0f1c]/60 backdrop-blur-2xl border border-blue-500/20 rounded-4xl p-8 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden animate-fade-in-up">

        {/* Efectos de luz difuminada internos (Neon) */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-600/20 rounded-full blur-[80px] z-0 pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] z-0 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo / Icono Superior */}
          <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-purple-700 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105 transition-transform duration-300">
            <Car className="text-white w-10 h-10 drop-shadow-lg" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-100 to-white tracking-widest uppercase shadow-blue-500/20 drop-shadow-sm">
            Autos Colombia
          </h1>
          {/* Encabezados */}
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mb-2 tracking-tight">
            Crear Cuenta
          </h2>
          <p className="text-blue-100/60 text-sm mb-8 text-center font-medium">
            Únete a nosotros y descubre la mejor experiencia
          </p>

          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            {/* Input Nombre */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <User className="w-5 h-5 text-blue-300/50 group-focus-within:text-blue-400 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-[#111827]/50 border border-blue-500/30 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            {/* Input Correo */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Mail className="w-5 h-5 text-blue-300/50 group-focus-within:text-blue-400 transition-colors duration-300" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111827]/50 border border-blue-500/30 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock className="w-5 h-5 text-blue-300/50 group-focus-within:text-purple-400 transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111827]/50 border border-blue-500/30 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 shadow-inner"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-300/50 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Input Confirmar Contraseña */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock className="w-5 h-5 text-blue-300/50 group-focus-within:text-purple-400 transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#111827]/50 border border-blue-500/30 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 shadow-inner"
                required
              />
            </div>

            {/* Botón de Submit Principal */}
            <button
              type="submit"
              className="relative w-full rounded-2xl overflow-hidden group mt-6 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-[200%_auto] group-hover:bg-position-[right_center] transition-all duration-500 ease-out"></div>

              <div className="relative flex items-center justify-center gap-2 py-4 px-6 text-white font-semibold text-lg hover:scale-[0.98] transition-transform duration-200">
                <span>Registrarse</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </button>
          </form>

          {/* Separador */}
          <div className="w-full flex items-center gap-4 my-6">
            <div className="h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent flex-1"></div>
            <span className="text-sm text-blue-200/50 font-medium">o continuar con</span>
            <div className="h-px bg-linear-to-l from-transparent via-purple-500/50 to-transparent flex-1"></div>
          </div>

          {/* Enlace de Login */}
          <p className="text-base text-blue-100/70">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" className="text-blue-400 font-semibold hover:text-purple-400 transition-colors duration-300 hover:underline decoration-purple-400/50 underline-offset-4">
              Inicia sesión aquí
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}