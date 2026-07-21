# ECOS

Proyecto desarrollado como parte del programa Smart Projects de [Foo Talent Group](https://www.linkedin.com/company/footalentgroup).

<p align="center">
  <img
    src="./assets/ecos.png"
    alt="Foo Talent Group - Ecos"
  />
</p>

## Descripcion

**Ecos** es una plataforma digital para musicos independientes que quieren difundir su trabajo, gestionar su carrera artistica y monetizar sus creaciones de forma mas directa.

La aplicacion ofrece perfiles para musicos y fans, publicacion de canciones, eventos, favoritos, contacto y herramientas para construir una presencia artistica sin depender completamente de plataformas externas.

El producto fue concebido a partir de necesidades reales relevadas en entrevistas, priorizando autonomia, visibilidad y crecimiento sostenible para artistas independientes.

## Objetivo

Empoderar a musicos independientes con una herramienta accesible, efectiva y centrada en sus necesidades reales, que promueva su crecimiento profesional y les permita generar ingresos de manera directa y justa.

## Stack principal

- Frontend: React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Hook Form, Zod.
- Backend: Java 17, Spring Boot, Spring Security, JWT, JPA, PostgreSQL, Flyway, MapStruct.
- Infraestructura: Docker, Netlify, Render, Swagger/OpenAPI.

## Que demuestra este proyecto

- Autenticacion basada en JWT, control de roles y gestion segura de cuentas.
- Persistencia en PostgreSQL con migraciones versionadas mediante Flyway.
- Flujos reales para artistas y fans: musica, eventos, favoritos, contacto y carga de medios.
- Integracion de Cloudinary para archivos y Resend para correos de verificacion y recuperacion.
- Frontend responsive con React, TypeScript, formularios validados y cache de datos.

## Demo para portafolio

La base de datos incluye contenido inicial para que la plataforma pueda recorrerse desde el primer acceso. La demostracion recomendada es: explorar la landing, visitar un perfil de artista, reproducir una cancion, revisar eventos y entrar con los roles de fan y musico para mostrar sus flujos diferenciados.

El formulario de inicio de sesion permite cargar estas cuentas con un clic:

- Fan: `alice.johnson@example.com`
- Musico: `peter.donovan@example.com`
- Contrasena para ambas: `Demo123!`

Antes de desplegar, configura las variables de `backend/.env.example` y `frontend/.env.example` en el proveedor. En produccion, deja `JPA_SHOW_SQL=false` y usa una direccion remitente verificada en Resend.

## Documentacion

- [Documentacion Backend](/backend/README.md)
- [Documentacion Frontend](/frontend/README.md)

## Enlaces utiles

- [Sitio Web](https://ecos-rosy.vercel.app)
- [API Docs (Swagger)](https://ecos-ec.onrender.com/swagger-ui/index.html)

## Colaboradores

<p align="center" id="FrontEnd">
  <a href="https://github.com/Itnardoel">
    <img src="https://github.com/Itnardoel.png" width="80" alt="@Itnardoel" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/Cecilia-Suarez">
    <img src="https://github.com/Cecilia-Suarez.png" width="80" alt="@Cecilia-Suarez" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/GinoGallardo">
    <img src="https://github.com/GinoGallardo.png" width="80" alt="@GinoGallardo" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/cricritoia">
    <img src="https://github.com/cricritoia.png" width="80" alt="@cricritoia" style="border-radius: 50%;" />
  </a>
</p>

<p align="center" id="BackEnd">
  <a href="https://github.com/EdgarCamberos1894">
    <img src="https://github.com/EdgarCamberos1894.png" width="80" alt="@EdgarCamberos1894" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/AnahiBrocardo">
    <img src="https://github.com/AnahiBrocardo.png" width="80" alt="@AnahiBrocardo" style="border-radius: 50%;" />
  </a>
  <a href="https://github.com/ZairBulos">
    <img src="https://github.com/ZairBulos.png" width="80" alt="@ZairBulos" style="border-radius: 50%;" />
  </a>
</p>
