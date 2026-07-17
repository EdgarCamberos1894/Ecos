# Ecos - Backend

## Tecnologias

[![Tecnologias](https://skillicons.dev/icons?i=java,spring,maven,postgres,docker)](https://skillicons.dev)

## Requisitos previos

- Java 17
- Maven o Maven Wrapper
- PostgreSQL, si se ejecuta sin Docker
- Docker y Docker Compose, si se usa la configuracion containerizada

## Variables de entorno

Tomar como referencia el archivo `.env.example`.

Variables principales:

- `POSTGRES_URL`
- `POSTGRES_DB`
- `POSTGRES_USERNAME`
- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `JWT_ISSUER`
- `JWT_EXPIRE`
- `JWT_REFRESH_EXPIRE`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_APIKEY`
- `RESEND_EMAIL`
- `APP_FRONTEND_URL`
- `CORS_ALLOWED`

`RESEND_EMAIL` debe usar un remitente o dominio previamente verificado en Resend. Las claves reales se configuran como variables de entorno del proveedor de despliegue y no se versionan.

## Ejecutar con Docker

```bash
cd backend
docker-compose up --build
```

## Ejecutar localmente

```bash
cd backend
./mvnw spring-boot:run
```

En Windows:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

## Verificaciones

Compilar y ejecutar pruebas unitarias:

```bash
./mvnw test
```

Ejecutar tambien pruebas de integracion:

```bash
./mvnw verify
```

En Windows, usar `.\mvnw.cmd` en lugar de `./mvnw`.
