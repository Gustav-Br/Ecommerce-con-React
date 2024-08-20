# E-commerce-con-React

Este es un proyecto de e-commerce desarrollado con React que utiliza Firebase como base de datos para la gestión de productos y usuarios. La aplicación permite a los usuarios explorar productos, agregar, editar y eliminar favoritos, todo dentro de una experiencia moderna y dinámica.

## Características

- **Exploración de Productos:** Los usuarios pueden navegar a través de una lista de productos obtenidos de la API de MercadoLibre.
- **Favoritos:** Permite a los usuarios agregar y gestionar sus productos favoritos en Firebase.
- **Autenticación:** Integración con Firebase Authentication para gestionar el acceso de usuarios.

## Tecnologías Utilizadas

- **React:** Biblioteca principal para la construcción de la interfaz de usuario.
- **Firebase:** Utilizado para la autenticación de usuarios y la gestión de la base de datos Firestore.
- **React-Bootstrap:** Para el diseño y la creación de componentes UI responsivos.
- **React-Router-Dom:** Para la gestión de rutas y navegación en la aplicación.
- **dotenv:** Para la gestión de variables de entorno.

## Requisitos Previos

- Node.js
- npm o yarn

## Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/Gustav-Br/Ecommerce-con-React.git

2. **Instalar Dependencias**

   Navega al directorio del proyecto e instala las dependencias:

   ```bash
   cd Ecommerce-con-React
   npm install

3. **Configurar Variables de Entorno**

   Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Firebase:

   ```plaintext
   REACT_APP_API_KEY=your_firebase_api_key
   REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_PROJECT_ID=your_firebase_project_id
   REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_APP_ID=your_firebase_app_id

4. **Ejecutar la Aplicación**

   Inicia la aplicación en modo desarrollo:

   ```bash
   npm start

La aplicación estará disponible en http://localhost:3000.

## Contribuciones

   Las contribuciones son bienvenidas. Si deseas mejorar alguna funcionalidad o agregar nuevas características, no dudes en enviar un pull request.
   Gracias por tu interés en este proyecto.


