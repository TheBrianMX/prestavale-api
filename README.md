# Prestavale API – Prueba Técnica

API desarrollada en NestJS con Prisma y PostgreSQL.

## Requisitos
- Node.js v18 o superior
- PostgreSQL
- npm

## Instrucciones para ejecutar el proyecto

1. Clonar el repositorio
git clone <url-del-repositorio>
cd prestavale-api/backend

2. Instalar dependencias
npm install

3. Crear archivo .env
DATABASE_URL="postgresql://usuario:password@localhost:5432/prestavale"

4. Ejecutar migraciones y generar Prisma Client
npx prisma migrate dev
npx prisma generate

5. Levantar Servidor
npm run start:dev

La API quedará disponible en:
http://localhost:3000
