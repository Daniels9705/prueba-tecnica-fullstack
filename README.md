## Prueba Técnica para Desarrollador Fullstack Senior

## Como desplegar el proyecto localmente.
1. **Instalar dependencias**
   - `npm install` en la terminal

2. **setear usuario administrador**
   - En la ruta `prisma/seed.ts` debes setear el correo que usaras como administrador. 

2. **Configurar base de datos**
   - Crear una nueva base de datos en tu instalacion local de postgres y obtener las cedenciales.
   - Setea las credenciales en la variable de entorno `DATABASE_URL` del archivo `.env`
   - Migrar las tablas con el comando `npm prisma migrate dev --name init`
   - Cargar los seeder (usuario administrador) con el comando `npx prisma db seed`

3. **Configurar autenticación Auth0**
   - Crear un nuevo proyecto en auth0 y obtener las cedenciales.
   - setear las credenciales en las variables de entorno del archivo `.env`:
    `AUTH0_SECRET=''`
    `AUTH0_BASE_URL='http://localhost:3000'`
    `AUTH0_ISSUER_BASE_URL=''`
    `AUTH0_CLIENT_ID=''`
    `AUTH0_CLIENT_SECRET=''`

4. **Iniciar cliente**
   - `npm run dev` en la terminal


## Como desplegar el proyecto en vercel/supabase.
1. **Tener el proyecto en un respositorio de github**

2. **setear usuario administrador**

   - En la ruta `prisma/seed.ts` debes setear el correo que usaras como administrador. 

2. **Configurar base de datos**

   - Crear un nuevo proyecto en [Supabase](https://supabase.com/) y obtener las credenciales `URI` con Display connection pooler en `mode:Session`.
   - Setea las credenciales en la variable de entorno `DATABASE_URL` del archivo `.env`
   - Migrar las tablas con el comando `npm prisma migrate dev --name init`
   - Cargar los seeder (usuario administrador) con el comando `npx prisma db seed`

3. **Configurar autenticación Auth0**

   - Crear un nuevo proyecto en [Auth0](https://auth0.com/) y obtener las cedenciales.
    

4. **Desplegar**

   - Crear el nuevo proyecto en vercel y seleccionar el repositorio con el proyecto.
   - seleccionar `Next.js` como framework preset
   - setear una por una las variables de entorno:
    `DATABASE_URL`
    `AUTH0_SECRET`
    `AUTH0_BASE_URL`
    `AUTH0_ISSUER_BASE_URL`
    `AUTH0_CLIENT_ID`
    `AUTH0_CLIENT_SECRET`
   - *Desplegar*

5. **Cofiguración final**
    - Editar la variable de entorno `AUTH0_BASE_URL` en vercel y cambia su valor al nuevo dominio de tu proyecto en vercel
    - Editar las variables `Allowed Callbacks URL's` y `Allowed Logout URL's`  en el proyecto de [Auth0](https://auth0.com/)



### Introducción

El objetivo de esta prueba técnica es evaluar tus habilidades en el desarrollo de una aplicación fullstack. Deberás implementar un sistema de gestión de ingresos y egresos, la gestión de usuarios y la generación de reportes. El proyecto cuenta con [wireframes](<https://www.figma.com/design/2PINjveveJJ9ZAAwxwNoRK/Wireframes-(Copy)?node-id=0-1&t=6q0Q0id8YnjH9fJt-1>) que pueden servir de guía para el candidato. Sin embargo, el diseño de la interfaz de usuario es libre.

### Requisitos del Proyecto

#### Funcionalidades Principales

1. **Roles y Permisos**

   - **Roles:**
     - **Usuario:** Solo puede acceder a la gestión de movimientos.
     - **Administrador:** Puede ver los reportes, editar usuarios y agregar movimientos.

2. **Home**

   - Página de inicio con un menú principal que permite la navegación a tres secciones:
     - Sistema de gestión de ingresos y gastos (disponible para todos los roles)
     - Gestión de usuarios (solo para administradores)
     - Reportes (solo para administradores)

3. **Sistema de Gestión de Ingresos y Gastos**

   - **Vista de Ingresos y Egresos**
     - Implementar una tabla que muestre los ingresos y egresos registrados con las siguientes columnas:
       - Concepto
       - Monto
       - Fecha
       - Usuario
     - Botón "Nuevo" para agregar un nuevo ingreso o egreso (solo para administradores).
   - **Formulario de Nuevo Ingreso/Egreso**
     - Formulario con los campos:
       - Monto
       - Concepto
       - Fecha
     - Botón para guardar el nuevo movimiento.

4. **Gestión de Usuarios** (solo para administradores)

   - **Vista de Usuarios**
     - Tabla que muestre la lista de usuarios con las siguientes columnas:
       - Nombre
       - Correo
       - Teléfono
       - Acciones (editar usuario)
   - **Formulario de Edición de Usuario**
     - Formulario con los campos:
       - Nombre
       - Rol
     - Botón para guardar los cambios.

5. **Reportes** (solo para administradores)
   - Mostrar un gráfico de movimientos financieros.
   - Mostrar el saldo actual.
   - Botón para descargar el reporte en formato CSV.

### Requisitos Técnicos

- **Tecnologías y Herramientas:**
  - **Frontend:**
    - Next.js utilizando `pages` router.
    - TypeScript.
    - Tailwind CSS.
    - Shadcn para componentes de la interfaz de usuario.
    - GraphQL con Apollo Client para queries y mutaciones.
  - **Backend:**
    - API GraphQL con Apollo Server implementada en una ruta de API de Next.js.
    - Base de datos de Postgres en Supabase.
  - **Protección de Datos:** 
    - Implementar control de acceso basado en roles (RBAC) para asegurar que solo los usuarios autorizados puedan acceder a ciertas funcionalidades y datos.
    - Proteger el backend para que rechace conexiones no autenticadas.
  - **Autenticación:**
    - Utilizar [Authjs](https://authjs.dev/) con [Auth0](https://auth0.com/) como proveedor y [Prisma](https://prisma.io) como adaptador para la autenticación por sesiones de base de datos.
  - **Pruebas unitarias**
    - El candidato debe agregar al menos 3 pruebas unitarias donde considere necesario.
  - **Despliegue:**
    - Desplegar el proyecto en Vercel.

### Entregables

1. **Código Fuente:**

   - Repositorio en GitHub con el código fuente del proyecto.
   - Incluir un archivo README con instrucciones claras sobre cómo ejecutar el proyecto localmente y cómo desplegarlo en Vercel.

2. **Despliegue:**
   - Proyecto desplegado en Vercel con la URL proporcionada.

### Criterios de Evaluación

- **Funcionalidad:**

  - Cumplimiento de todos los requisitos funcionales.
  - Correcta implementación del CRUD para ingresos, egresos y usuarios.
  - Generación y descarga de reportes en formato CSV.

- **Calidad del Código:**

  - Calidad y claridad del código.
  - Uso adecuado de las mejores prácticas de desarrollo.
  - Estructura del proyecto.

- **Diseño y UX:**

  - Usabilidad de la interfaz.
  - Implementación de un diseño atractivo.

- **Pruebas y Documentación:**

  - Cobertura de pruebas unitarias.
  - Calidad de los comentarios dentro del proyecto.

- **Seguridad:**

  - Implementación efectiva de control de acceso basado en roles (RBAC).
  - Protección adecuada de los datos sensibles.

- **Notas**:
  - El aplicativo no debe contener diseño responsivo.
  - El candidato puede utilizar el código cargado en este repositorio. Sin embargo, esta no es una condición necesaria y el candidato puede iniciar el proyecto de 0 si lo desea.
  - El candidato puede cambiar las versiones de las librerías si lo considera necesario.
  - El candidato debe compartir el acceso al repositorio de GitHub al correo dsaldarriaga@prevalentware.com
