
# Catálogo de Libros - Next.js

Este proyecto es una aplicación web construida con Next.js y TypeScript que permite explorar, buscar y marcar como favoritos libros obtenidos de la API pública de Gutendex. Incluye paginación, modo oscuro, sistema de favoritos persistente y una vista dedicada para tus libros favoritos.

## Características principales

- **Catálogo de libros**: Consulta libros de la API de Gutendex.
- **Paginación**: Navega entre las páginas 1 a 5, con 10 libros por página.
- **Búsqueda**: Filtra libros por título o autor.
- **Favoritos**: Marca libros como favoritos y accede a una vista dedicada de favoritos (con paginación propia).
- **Persistencia**: Los favoritos se guardan en localStorage.
- **Modo oscuro/claro**: Alterna el esquema de colores de la interfaz.
- **Página de detalles**: (Opcional) Puedes implementar una página de detalles para cada libro.

## Estructura del proyecto

```
frontend-books/
├─ src/
│   ├─ app/
│   │   ├─ components/
│   │   │   └─ BooksList.tsx      # Componente principal de la lista de libros
│   │   ├─ book/
│   │   │   └─ [id]/
│   │   │       └─ page.tsx       # Página de detalles de cada libro (si existe)
│   │   ├─ layout.tsx             # Layout general de la app
│   │   └─ page.tsx               # Página principal que muestra BooksList
├─ public/                        # Archivos estáticos
├─ package.json                   # Dependencias y scripts
├─ tsconfig.json                  # Configuración de TypeScript y paths
├─ tailwind.config.js             # Configuración de Tailwind (si existe)
└─ ...otros archivos de config
```

## Instalación y uso

1. Clona el repositorio y entra en la carpeta del proyecto:
	```bash
	git clone <url-del-repo>
	cd frontend-books
	```
2. Instala las dependencias:
	```bash
	npm install
	```
3. Inicia el servidor de desarrollo:
	```bash
	npm run dev
	```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Detalles técnicos

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **API Gutendex**
- **localStorage** para favoritos

## Funcionalidad de favoritos
- Puedes marcar/desmarcar cualquier libro como favorito.
- El botón "Ver favoritos" muestra todos tus favoritos, sin importar la página donde los marcaste, con paginación propia (10 por página).
- Los favoritos se guardan en localStorage y se mantienen al recargar la página.

## Modo oscuro
- Usa el botón de la esquina superior para alternar entre modo claro y oscuro.

## Personalización y mejoras
- Puedes extender la app agregando una página de detalles para cada libro (`/book/[id]`).
- Puedes agregar tests con Jest o React Testing Library.

## Créditos
- Datos obtenidos de [Gutendex API](https://gutendex.com/)
- Proyecto realizado con Next.js, React y Tailwind CSS.

---

¡Disfruta explorando y gestionando tu biblioteca digital!
