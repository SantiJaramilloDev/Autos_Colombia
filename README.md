# 🚗 Autos Colombia

Sistema de gestión para un parqueadero de vehículos, desarrollado como proyecto académico para la asignatura de **Ingeniería de Software** de la **IU Digital**.

---

## 📋 Descripción

**Autos Colombia** es una aplicación web que permite administrar las operaciones principales relacionadas con un parqueadero: registro, control de entradas y salidas, gestión de pagos e incidentes. Cuenta con autenticación de usuario, navegación entre módulos y una interfaz moderna con tema oscuro.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | Framework de UI |
| [Vite](https://vitejs.dev/) | 7 | Bundler y servidor de desarrollo |
| [React Router DOM](https://reactrouter.com/) | 7 | Enrutamiento del lado del cliente |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [Lucide React](https://lucide.dev/) | 0.577 | Librería de iconos |
| [React Hot Toast](https://react-hot-toast.com/) | 2 | Notificaciones toast |
| [ESLint](https://eslint.org/) | 9 | Linter de código |

---

## 🚀 Cómo ejecutar el proyecto

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd autos-colombia
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** en `http://localhost:5173`

### Credenciales de prueba

Para acceder a la aplicación en desarrollo, usa:

- **Email:** `admin`
- **Contraseña:** `admin`

---

## 📁 Estructura del proyecto

```
autos-colombia/
├── public/                      # Archivos estáticos públicos
├── src/
│   ├── assets/                  # Imágenes y recursos estáticos
│   ├── components/              # Componentes de la aplicación
│   │   ├── InicioSesion/        # Vista de login
│   │   ├── Resgistro/           # Vista de registro de usuario
│   │   ├── Home/                # Dashboard principal
│   │   ├── RegistroVehiculos/   # Módulo de registro de vehículos
│   │   ├── EntradasSalidas/     # Control de entradas y salidas
│   │   ├── Pagos/               # Listado de pagos
│   │   ├── RegistrarPago/       # Formulario para registrar un pago
│   │   ├── Incidentes/          # Listado de incidentes
│   │   └── RegistrarIncidente/  # Formulario para registrar un incidente
│   ├── App.jsx                  # Componente raíz con el enrutador
│   ├── App.css                  # Estilos globales del componente App
│   ├── index.css                # Estilos globales y variables CSS
│   └── main.jsx                 # Punto de entrada de la aplicación
├── index.html                   # Plantilla HTML principal
├── vite.config.js               # Configuración de Vite
├── eslint.config.js             # Configuración de ESLint
└── package.json                 # Dependencias y scripts del proyecto
```

---

## 🔀 Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `InicioSesion` | Página de inicio de sesión |
| `/registro` | `Registro` | Página de registro de nuevo usuario |
| `/home` | `Home` | Dashboard principal |
| `/registro-vehiculos` | `RegistroVehiculos` | Gestión de vehículos |
| `/entradas-salidas` | `EntradasSalidas` | Control de entradas y salidas |
| `/pagos` | `Pagos` | Historial de pagos |
| `/registrar-pago` | `RegistrarPago` | Formulario de nuevo pago |
| `/incidentes` | `Incidentes` | Historial de incidentes |
| `/registrar-incidente` | `RegistrarIncidente` | Formulario de nuevo incidente |

---

## 👨‍💻 Proyecto académico

Desarrollado para la asignatura de **Ingeniería de Software** — IU Digital.
