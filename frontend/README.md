# Ecos - Frontend

## 🛠 Tecnologías

[![Tecnologías](https://skillicons.dev/icons?i=react,ts,tailwind,vite,eslint,prettier)](https://skillicons.dev)

### 📚 Librerías principales

* React Router DOM
* Axios
* React Hook Form
* Zod
* TanStack Query
* Vitest
* Testing Library

## 📌 Instrucciones para ejecutar localmente

### ⚙️ Requisitos previos

* Node.js
* npm

### ▶️ Pasos para ejecutar

1. Clonar el repositorio:

```bash
git clone https://github.com/Cecilia-Suarez/Ecos
```

2. Ingresar al proyecto y luego a la carpeta de frontend:

```bash
cd <NOMBRE_DEL_PROYECTO>
cd frontend
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

5. Configurar las variables de entorno necesarias:
   Puedes tomar como referencia el archivo `.env.example`.

## 📂 Estructura del Proyecto

El proyecto sigue la arquitectura **Screaming Architecture**. A continuación se detalla la estructura actual dentro de la carpeta `src/`:

```text
src/
├── app/
│   └── layout/
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── ui/
├── artist/
│   └── components/
├── assets/
│   └── fonts/
├── auth/
│   ├── components/
│   │   └── ui/
│   ├── context/
│   └── hooks/
├── event/
│   ├── components/
│   │   ├── step/
│   │   └── ui/
│   ├── type/
│   └── validation/
├── explorer/
│   └── components/
├── home/
│   └── components/
│       └── ui/
├── profile/
│   ├── components/
│   │   └── forms/
│   │       ├── components/
│   │       ├── schemas/
│   │       └── ui/
│   ├── fan/
│   │   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── musician/
│   │   └── components/
│   └── utils/
│       └── handlers/
├── routes/
│   └── index.tsx
├── settings/
│   └── components/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── ui/
│   └── utils/
├── App.tsx
├── index.css
├── main.tsx
├── providers.tsx
├── setupTests.ts
└── vite-env.d.ts
```

## 🤝 Buenas prácticas para contribuir

### ⌨️ Comandos clave de Git

```bash
# Obtener los últimos cambios sin generar commits adicionales
git pull origin <rama> --rebase  

# Fusionar una rama sin generar commits adicionales
git merge --no-ff <rama>

# Sincronizar cambios con el repositorio remoto
git push origin <rama>  

# Crear una nueva rama y cambiar a ella
git switch -c <rama>  
```

### 📝 Mensajes de Commits

Es importante seguir una convención clara para los mensajes de commit. Usa la siguiente estructura:

```text
tipo_commit(frontend): Descripción breve y clara. #issue
```

### 🔄 Flujo de trabajo recomendado

1. Crear una nueva rama basada en `frontend`:

```bash
git switch -c <rama>
```

2. Realizar los cambios y hacer commit siguiendo la convención establecida.

3. Actualizar la rama con los últimos cambios de frontend antes de hacer push:

```bash
git pull origin frontend --rebase
```

4. Subir la rama al repositorio remoto:

```bash
git push origin <rama>
```

5. Crear una Pull Request en GitHub y solicitar revisión.

## 🌐 Deploy

* **Sitio en producción**: [Enlace al sitio en producción](https://ftg-ecos.netlify.app/)
