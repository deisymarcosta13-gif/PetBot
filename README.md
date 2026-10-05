# 🐾 PetBot

PetBot es una aplicación web full stack para gestionar el cuidado de mascotas. Cada usuario puede registrar sus mascotas, llevar el control de sus medicamentos y citas veterinarias, subir una foto de cada mascota y consultar dudas generales de cuidado a un asistente virtual basado en **Google Gemini 2.5 Flash**.

La interfaz combina un **chat guiado** para crear registros paso a paso, secciones de gestión con tarjetas editables y un **chat de IA** especializado en mascotas.

---

## ✨ Características

- **Registro e inicio de sesión** con contraseñas cifradas mediante bcrypt.
- **Autenticación con JWT** y rutas protegidas en el frontend.
- **Chat guiado:** menú conversacional (*Mascotas*, *Medicamentos*, *Citas*) para crear y consultar registros paso a paso.
- **Mascotas:** tarjetas con nombre, tipo, raza y foto; edición y eliminación. Al eliminar una mascota se eliminan también sus medicamentos y citas.
- **Fotos de mascotas:** subida con vista previa y visualización desde el backend.
- **Medicamentos:** nombre, dosis y frecuencia por mascota; listado, edición y eliminación.
- **Citas:** fecha, hora y motivo por mascota; validación de formato y bloqueo de fechas pasadas; edición con selector de fecha.
- **Asistente IA:** responde preguntas sobre cuidado de mascotas usando Gemini, orientado mediante instrucciones a temas de mascotas.
- **Aislamiento de datos:** cada usuario solo puede ver y modificar sus propios registros.

---

## 🛠️ Tecnologías

| Capa | Tecnologías |
|---|---|
| **Frontend** | React 19.2 · Vite 8 · Tailwind CSS 4 · React Router 7 · Axios · react-markdown · react-datepicker · react-hot-toast · lucide-react · pnpm |
| **Backend** | Python 3.14 · FastAPI · Uvicorn · SQLAlchemy 2 · python-jose (JWT) · Passlib + bcrypt · Requests · python-dotenv |
| **Base de datos** | PostgreSQL (driver psycopg2) |
| **IA** | Google Gemini 2.5 Flash vía API REST |

---

## 🏗️ Arquitectura

```text
┌────────────────────────┐   HTTP + JSON (Bearer JWT)   ┌──────────────────────────┐
│  Frontend              │ ───────────────────────────▶ │  Backend (FastAPI)       │
│  React + Vite (SPA)    │ ◀─────────────────────────── │  routes · schemas · core │
└────────────────────────┘                              └──────┬───────────┬───────┘
                                                    SQLAlchemy │           │ REST
                                                               ▼           ▼
                                                      ┌────────────┐ ┌──────────────┐
                                                      │ PostgreSQL │ │ Google Gemini│
                                                      └────────────┘ └──────────────┘
```

- **Frontend:** SPA con tres rutas (`/` login, `/register`, `/dashboard`). Un cliente Axios centralizado envía el JWT en cada petición. La URL del backend se configura con `VITE_API_URL`.
- **Backend:** API REST organizada en routers (`auth`, `pets`, `medications`, `appointments`, `chat`, `ia`), esquemas Pydantic y modelos SQLAlchemy.
- **Base de datos:** las tablas `users`, `pets`, `medications` y `appointments` se crean automáticamente al iniciar el backend (`Base.metadata.create_all()`).
- **Imágenes:** se guardan en `backend/uploads/pets/` y se sirven como archivos estáticos en `/uploads`.
- **IA:** el backend actúa como intermediario con Gemini; la API key nunca llega al navegador.

---

## 📁 Estructura del proyecto

```text
PetBot/
├── backend/
│   ├── app/
│   │   ├── ai/            # Integración con Gemini
│   │   ├── chatbot/       # Menús del chat guiado
│   │   ├── config/        # Variables de entorno
│   │   ├── core/          # Hash de contraseñas y JWT
│   │   ├── database/      # Engine y sesión de SQLAlchemy
│   │   ├── dependencies/  # Usuario autenticado
│   │   ├── models/        # User, Pet, Medication, Appointment
│   │   ├── routes/        # Endpoints de la API
│   │   └── schemas/       # Validación con Pydantic
│   ├── main.py            # App FastAPI: CORS, estáticos y routers
│   ├── requirements.txt
│   ├── .python-version
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/           # Cliente Axios
│   │   ├── components/    # Chat, tarjetas, modales, secciones, layout
│   │   ├── pages/         # Login, Register, Dashboard
│   │   ├── routes/        # ProtectedRoute
│   │   └── services/      # Llamadas a la API por recurso
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.js
│   ├── vercel.json
│   └── .env.example
└── .gitignore
```

<details>
<summary><strong>📌 Endpoints principales</strong></summary>

La documentación interactiva de FastAPI está disponible en `/docs` con el backend en marcha.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión (devuelve JWT) |
| GET · POST · PUT · DELETE | `/pets/...` | Listar, crear, editar y eliminar mascotas |
| PUT | `/pets/update_pet_image/{id}/image` | Subir foto de mascota |
| GET · POST · PUT · DELETE | `/medications/...` | Gestión de medicamentos |
| GET · POST · PUT · DELETE | `/appointments/...` | Gestión de citas |
| POST | `/chat/message` | Menús del chat guiado |
| POST | `/ia/ask` | Pregunta al asistente IA |
| GET | `/` | Estado de la API |

Todos los endpoints, salvo `/`, `/auth/*` y `/uploads`, requieren `Authorization: Bearer <token>`.

</details>

---

## ⚙️ Configuración

Cada parte incluye un archivo `.env.example`. Cópialo como `.env` y completa los valores. **Los archivos `.env` no se versionan.**

### Backend · `backend/.env`

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://usuario:contraseña@localhost:5432/petbot` |
| `SECRET_KEY` | Clave para firmar los JWT (en producción, larga y aleatoria) | `cambia-esta-clave` |
| `ALGORITHM` | Algoritmo de firma JWT | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Duración del token en minutos | `1440` |
| `GEMINI_API_KEY` | API key de Google Gemini | `tu-api-key-de-gemini` |
| `CORS_ORIGINS` | Orígenes permitidos, separados por comas | `http://localhost:5173,http://127.0.0.1:5173` |

> Para generar una `SECRET_KEY` segura: `python -c "import secrets; print(secrets.token_urlsafe(64))"`

### Frontend · `frontend/.env`

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL del backend, sin `/` final | `http://127.0.0.1:8000` |

---

## 💻 Instalación local

**Requisitos:**

- Python 3.14
- Node.js 20.19+ o 22.13+ o 24+ (derivado de las versiones actuales de las dependencias de Vite, React y ESLint)
- pnpm
- PostgreSQL
- Una API key de Google Gemini

```bash
git clone https://github.com/deisymarcosta13-gif/PetBot.git
cd PetBot
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
cp .env.example .env           # completa los valores
```

Crea una base de datos vacía en PostgreSQL, apunta `DATABASE_URL` a ella e inicia el servidor desde la carpeta `backend`:

```bash
uvicorn main:app --reload
```

API en `http://127.0.0.1:8000` · documentación en `http://127.0.0.1:8000/docs`. Las tablas se crean en el primer arranque.

### Frontend

En otra terminal:

```bash
cd frontend
pnpm install
cp .env.example .env           # VITE_API_URL=http://127.0.0.1:8000
pnpm dev
```

Aplicación en `http://localhost:5173`. Para generar el build de producción: `pnpm run build` (salida en `frontend/dist`).

---

## 🔐 Autenticación

- Al registrarse, la contraseña se almacena cifrada con **bcrypt** y el email se normaliza a minúsculas.
- El inicio de sesión devuelve un **JWT** firmado (HS256) con expiración configurable.
- El frontend guarda el token en `localStorage` (clave `token`) y Axios lo envía en la cabecera `Authorization: Bearer` de cada petición a la API.
- El backend realiza la validación real del token: una dependencia verifica la firma y la expiración y obtiene el usuario autenticado. Todas las consultas se filtran por ese usuario, de modo que nadie puede acceder a registros ajenos.
- La ruta `/dashboard` solo comprueba que exista un token guardado y, si no hay ninguno, redirige al login. No valida el token en el navegador.
- Al cerrar sesión, el token se elimina de `localStorage`.

---

## 🤖 Asistente IA

La sección **Chat IA** permite hacer preguntas en lenguaje natural a **Google Gemini 2.5 Flash**:

- El backend envía cada pregunta a la API REST de Gemini junto con un prompt que define a PetBot como asistente de cuidado de mascotas.
- El prompt le indica responder solo sobre mascotas (alimentación, cuidados, comportamiento, higiene, vacunas generales y síntomas comunes) y contestar con un mensaje fijo cuando el tema es otro.
- Ante síntomas, está instruido para explicar posibles causas generales sin dar diagnósticos y recomendar acudir al veterinario si el caso es serio o urgente.
- Estas reglas son instrucciones al modelo, no un filtro: orientan las respuestas, pero no las garantizan.
- Cada pregunta se procesa de forma independiente, sin historial de conversación, y las respuestas se muestran con formato Markdown.

---

## 🧪 Verificación

Durante la preparación para despliegue se realizaron estas comprobaciones manuales:

- Instalación limpia de dependencias del backend (`pip`) y del frontend (`pnpm install --frozen-lockfile`).
- Build de producción del frontend (`pnpm run build`).
- Arranque de FastAPI con Uvicorn.
- Conexión a PostgreSQL y creación automática de tablas.
- Registro, inicio de sesión, validación del JWT y rechazo de peticiones sin token.
- Operaciones CRUD de mascotas, medicamentos y citas, incluida la subida de imágenes.
- Configuración de CORS por variable de entorno.
- Integración con Gemini.

> El repositorio todavía no incluye pruebas automatizadas.

---

## 🚀 Despliegue

**Estado actual:** preparado para despliegue · **despliegue pendiente**.

| Componente | Plataforma prevista |
|---|---|
| Frontend | Vercel (`frontend/`, incluye `vercel.json` para el enrutado de la SPA) |
| Backend | Render (`backend/`, `uvicorn main:app --host 0.0.0.0 --port $PORT`) |
| Base de datos | PostgreSQL |

> **Nota:** las imágenes se guardan en el disco del servidor. En plataformas con almacenamiento efímero, como Render, pueden perderse tras reinicios o nuevos despliegues.

---

## 🔮 Próximas mejoras

- Despliegue productivo en Vercel y Render.
- Almacenamiento externo para las imágenes de mascotas.
- Validaciones adicionales en formularios y en la API.
- Manejo más avanzado de errores y de la expiración de sesión.
- Pruebas automatizadas.
- Optimización de carga (imágenes y tamaño del bundle).
- Mejoras de experiencia de usuario.

---

## 👩‍💻 Autora

**Mariana Acosta** — desarrolladora en formación.

GitHub: [@deisymarcosta13-gif](https://github.com/deisymarcosta13-gif)
