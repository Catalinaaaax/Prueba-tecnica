# Motion Analitycs - CRUD de Concesionarios

Aplicación web para la gestión (Crear, Leer, Actualizar, Eliminar) de registros de concesionarios. Desarrollada con React y Vite, enfocada en una interfaz de usuario intuitiva y operaciones eficientes con una API backend.

## Características Principales

*   **Operaciones CRUD completas:** Permite crear, visualizar, editar y eliminar concesionarios.
*   **Interfaz Reactiva:** Construida con React para una experiencia de usuario fluida.
*   **Formulario Dinámico:** Un único formulario para crear y editar registros.
*   **Tabla Interactiva:** Visualización clara de los datos con opciones de edición y eliminación por fila.
*   **Modal de Confirmación:** Para acciones destructivas como la eliminación.
*   **Estilado Moderno:** Uso de CSS para una apariencia agradable y animaciones sutiles.

## Stack Tecnológico

*   **Frontend:**
    *   React
    *   Vite
    *   JavaScript (ES6+)
    *   CSS3
*   **Backend (Asumido):**
    *   API REST (ej. Node.js/Express, Python/Django/Flask, etc.)

## Requisitos Previos

*   Node.js (v18.x o superior recomendado)
*   npm (v9.x o superior) o yarn

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd prueba-fullstack/FRONT 
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o
    # yarn install
    ```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo:
```bash
npm run dev
# o
# yarn dev
```
Esto abrirá la aplicación en `http://localhost:5173` (o el puerto que Vite asigne).

Para construir la aplicación para producción:
```bash
npm run build
# o
# yarn build
```
Los archivos optimizados se generarán en la carpeta `dist/`.

## Estructura del Proyecto

```
FRONT/
├── public/               # Archivos estáticos públicos (ej. favicons)
├── src/
│   ├── assets/           # Imágenes, SVGs, fuentes, etc.
│   ├── components/       # Componentes reutilizables de React (CrudTable, FormCard, IconButton, ConfirmationModal)
│   ├── pages/            # Componentes que representan páginas/vistas principales (CrudPage)
│   ├── App.jsx           # Componente raíz de la aplicación (si se usa para enrutamiento o layouts globales)
│   ├── main.jsx          # Punto de entrada de la aplicación React
│   └── index.css         # Estilos globales y específicos de componentes/páginas
├── .eslintrc.cjs         # Configuración de ESLint
├── .gitignore            # Archivos y carpetas ignorados por Git
├── index.html            # Plantilla HTML principal
├── package.json          # Metadatos del proyecto y dependencias
└── vite.config.js        # Configuración de Vite
```

## Variables de Entorno

La aplicación se conecta a una API backend. La URL base de la API está definida en `src/pages/Crud.jsx` como:
`const API_URL = 'https://prueba-tecnica-msk5.onrender.com';`



---

