[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/1Ag_KOUU)

# Plateful App

Aplicacion movil para descubrir, buscar y gestionar restaurantes. Desarrollada con React Native y Expo.

## Descripcion

Plateful es una aplicacion que permite a los usuarios:

- **Buscar restaurantes** por nombre o tipo de comida
- **Ver restaurantes cercanos** usando geolocalizacion
- **Consultar menus y cartas** de los restaurantes
- **Escribir y leer resenas** de restaurantes
- **Comentar en resenas** de otros usuarios
- **Gestionar restaurantes propios** (para propietarios)
- **Crear y editar platos** en las cartas de los restaurantes

## Tecnologias

- **Framework**: React Native con Expo SDK 52
- **Navegacion**: Expo Router (file-based routing)
- **Estilos**: NativeWind (TailwindCSS para React Native)
- **UI Components**: React Native Paper, React Native Elements
- **Estado**: React Context API
- **HTTP Client**: Axios
- **Mapas**: React Native Maps
- **Almacenamiento**: Expo Secure Store, AsyncStorage

## Estructura del Proyecto

```
Mobile-Plateful/
├── app/                    # Pantallas (file-based routing)
│   ├── (auth)/             # Pantallas de autenticacion (login, register)
│   ├── (tabs)/             # Navegacion principal con tabs
│   │   ├── home/           # Inicio y crear restaurante
│   │   ├── search_bar.tsx  # Busqueda de restaurantes
│   │   ├── restaurantes.tsx # Lista de restaurantes
│   │   └── settings/       # Configuracion del usuario
│   └── restaurante/        # Detalles, resenas y cartas de restaurantes
├── components/             # Componentes reutilizables
├── contexts/               # Contextos de React (AuthContext)
├── hooks/                  # Custom hooks
├── interfaces/             # Tipos e interfaces TypeScript
├── services/               # Servicios de API
│   ├── auth/               # Autenticacion (login, signup)
│   ├── restaurante/        # CRUD de restaurantes
│   ├── plato/              # CRUD de platos
│   ├── carta/              # Gestion de cartas/menus
│   ├── reseñas/            # Resenas de restaurantes
│   ├── comentarios/        # Comentarios en resenas
│   ├── busqueda/           # Busqueda por nombre/tipo
│   ├── maps/               # Ubicacion y restaurantes cercanos
│   └── user/               # Actualizacion de perfil
└── constants/              # Constantes y temas
```

## Instalacion

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app en tu dispositivo movil (opcional, para pruebas)

### Pasos

1. Clonar el repositorio:
```sh
git clone <repository-url>
cd Mobile-Plateful
```

2. Instalar dependencias:
```sh
npm install
```

3. Configurar la URL del backend en `services/api.ts`:
```typescript
const BACKEND_URL = "http://<tu-ip-local>:8080";
```

4. Iniciar el servidor de desarrollo:
```sh
npm start
```

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Ejecuta la app en un emulador/dispositivo Android |
| `npm run ios` | Ejecuta la app en un simulador/dispositivo iOS |
| `npm run web` | Ejecuta la app en el navegador web |

## Funcionalidades Principales

### Autenticacion
- Registro de usuarios (clientes y propietarios)
- Inicio de sesion con JWT
- Persistencia de sesion con Secure Store

### Restaurantes
- Listado de restaurantes propios (propietarios)
- Creacion y edicion de restaurantes
- Visualizacion de detalles del restaurante
- Busqueda por nombre y tipo de comida
- Restaurantes cercanos con geolocalizacion

### Menus y Platos
- Creacion de cartas/menus
- CRUD de platos (nombre, descripcion, precio, imagen)

### Resenas y Comentarios
- Crear resenas con calificacion (estrellas)
- Ver resenas de un restaurante
- Comentar en resenas

### Perfil de Usuario
- Actualizar nombre y telefono
- Cambiar foto de perfil

## Backend

Esta aplicacion se conecta a un backend REST API desarrollado con Spring Boot.

**Repositorio del Backend**: [https://github.com/Davidht77/Backend-Plateful](https://github.com/Davidht77/Backend-Plateful)

Asegurate de tener el servidor backend ejecutandose y actualiza la URL en `services/api.ts`.

## Documentacion

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
