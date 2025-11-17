
# 📚 Catálogo de Libros - Next.js + TypeScript + Tailwind CSS

Aplicación web construida con **Next.js (App Router)** y **TypeScript** que permite explorar, buscar y marcar como favoritos libros obtenidos de la API pública de **Gutendex**.

Incluye paginación, modo oscuro (ahora activado por defecto), persistencia de datos en localStorage y una interfaz moderna, accesible y responsiva con **Tailwind CSS**.

Recientemente se han realizado mejoras visuales sutiles (espaciado, sombras, bordes y transiciones) y el modo oscuro es el predeterminado al iniciar la app.

---

## 🚀 Demo en producción
🔗 [Ver aplicación desplegada en Vercel](https://nextjs-books-catalog.vercel.app/)  
📂 [Repositorio en GitHub](https://github.com/Eduardo1300/nextjs-books-catalog)

---


## 🧠 Características principales

- **Catálogo de libros:** Consulta libros desde la API pública de Gutendex.
- **Paginación:** Navega entre las páginas 1 a 5, mostrando 10 libros por página.
- **Búsqueda:** Filtra libros por título o autor (buscador en tiempo real, filtrado en cliente).
- **Favoritos:** Marca libros como favoritos y accede a una vista dedicada con su propia paginación. Los favoritos se guardan en `localStorage` y se restauran automáticamente al recargar la página.
- **Persistencia:** Los favoritos se guardan en `localStorage` y permanecen tras recargar la página.
- **Modo oscuro/claro:** Alterna entre temas de color con un solo clic. El modo oscuro es el predeterminado.
- **Mejoras visuales:** Espaciado, bordes redondeados, sombras y transiciones suaves en los componentes.

---



## 🧩 Estructura del proyecto

```text
frontend-books/
├─ src/
│   ├─ app/
│   │   ├─ components/
│   │   │   ├─ BookItem.tsx
│   │   │   ├─ BooksList.tsx
│   │   │   ├─ EmptyState.tsx
│   │   │   ├─ Header.tsx
│   │   │   ├─ LoadingSkeleton.tsx
│   │   │   ├─ Pagination.tsx
│   │   │   └─ SearchBar.tsx
│   │   ├─ book/
│   │   │   └─ [id]/
│   │   │       └─ page.tsx       # Página de detalles de cada libro
│   │   ├─ globals.css            # Estilos globales (Tailwind)
│   │   ├─ layout.tsx             # Layout general de la app
│   │   └─ page.tsx               # Página principal que muestra BooksList
├─ public/                        # Archivos estáticos
├─ package.json                   # Dependencias y scripts
├─ tsconfig.json                  # Configuración de TypeScript
├─ tailwind.config.js             # Configuración de Tailwind CSS
└─ README.md                      # Documentación del proyecto
```

---


## ⚙️ Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Eduardo1300/nextjs-books-catalog.git
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
4. Abre el proyecto en tu navegador en:
   [http://localhost:3000](http://localhost:3000)



## 🧾 Tecnologías utilizadas

- **Next.js 14+** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Gutendex API**
- **localStorage** para persistencia de datos



## 🌙 Funcionalidades destacadas

### ⭐ Favoritos
- Marca y desmarca libros como favoritos.
- Visualiza tus favoritos en una vista separada, con paginación (10 por página).
- Los datos se guardan en localStorage para mantenerlos persistentes y se restauran automáticamente.
- El sistema de favoritos es reactivo y se sincroniza con la UI en tiempo real.

### 💡 Modo oscuro
- Cambia entre modo claro y oscuro mediante un botón en la UI.
- El modo oscuro es el predeterminado al iniciar la app.



## 🧱 Posibles mejoras futuras
- Página de detalles ampliada para cada libro (`/book/[id]`).
- Integración de un backend (NestJS, Express, etc.) para gestionar usuarios y listas.
- Implementación de pruebas unitarias con Jest o React Testing Library.
- Paginación dinámica basada en la API real.
- Mejoras de rendimiento: memoización, caché, virtual scroll, etc.
- Autenticación de usuarios y sincronización de favoritos en la nube.




## 🙌 Créditos
- **Datos:** Gutendex API
- **Framework:** Next.js
- **Diseño:** Tailwind CSS

---

📅 Proyecto desarrollado como parte de la Prueba Técnica - NXT Abogados (Parte 1)
👨‍💻 Autor: Christopher Eduardo Valdivia Baca
📍 Lima, Perú


