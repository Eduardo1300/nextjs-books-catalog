# 📚 Catálogo de Libros - Next.js + TypeScript + Tailwind CSS

Este proyecto es una aplicación web construida con **Next.js (App Router)** y **TypeScript** que permite explorar, buscar y marcar como favoritos libros obtenidos de la API pública de **Gutendex**.  
Incluye paginación, modo oscuro, persistencia de datos en localStorage y una interfaz moderna y accesible con **Tailwind CSS**.

---

## 🚀 Demo en producción
🔗 [Ver aplicación desplegada en Vercel](https://tu-enlace-de-vercel.vercel.app)  
📂 [Repositorio en GitHub](https://github.com/tuusuario/frontend-books)

---

## 🧠 Características principales

- **Catálogo de libros:** Consulta libros desde la API pública de Gutendex.
- **Paginación:** Navega entre las páginas 1 a 5, mostrando 10 libros por página.
- **Búsqueda:** Filtra libros por título o autor (buscador en tiempo real).
- **Favoritos:** Marca libros como favoritos y accede a una vista dedicada con su propia paginación.
- **Persistencia:** Los favoritos se guardan en `localStorage` y permanecen tras recargar la página.
- **Modo oscuro/claro:** Alterna entre temas de color con un solo clic.
- **Diseño responsivo:** Interfaz adaptable a cualquier dispositivo.

---


## 🧩 Estructura del proyecto

```text
frontend-books/
├─ src/
│   ├─ app/
│   │   ├─ components/
│   │   │   └─ BooksList.tsx      # Componente principal de la lista de libros
│   │   ├─ book/
│   │   │   └─ [id]/
│   │   │       └─ page.tsx       # Página de detalles de cada libro (opcional)
│   │   ├─ layout.tsx             # Layout general de la app
│   │   └─ page.tsx               # Página principal que muestra BooksList
├─ public/                        # Archivos estáticos
├─ package.json                   # Dependencias y scripts
├─ tsconfig.json                  # Configuración de TypeScript
├─ tailwind.config.js             # Configuración de Tailwind CSS
└─ README.md                      # Documentación del proyecto
```

---

bash
bash

## ⚙️ Instalación y ejecución local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/frontend-books.git
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
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Gutendex API**
- **localStorage** para persistencia de datos


## 🌙 Funcionalidades destacadas

### ⭐ Favoritos
- Marca y desmarca libros como favoritos.
- Visualiza tus favoritos en una vista separada, con paginación.
- Los datos se guardan en localStorage para mantenerlos persistentes.

### 💡 Modo oscuro
- Cambia entre modo claro y oscuro mediante un botón en la UI.
- La preferencia se conserva entre sesiones.


## 🧱 Posibles mejoras futuras
- Página de detalles ampliada para cada libro (`/book/[id]`).
- Integración de un backend (NestJS o Express) para gestionar usuarios y listas.
- Implementación de pruebas unitarias con Jest o React Testing Library.
- Paginación dinámica basada en la API real.

yaml

## 🙌 Créditos
- **Datos:** Gutendex API
- **Framework:** Next.js
- **Diseño:** Tailwind CSS

---

📅 Proyecto desarrollado como parte de la Prueba Técnica - NXT Abogados (Parte 1)
👨‍💻 Autor: Christopher Eduardo Valdivia Baca
📍 Lima, Perú

---

✅ Con esta versión tu proyecto se ve **listo para evaluación profesional**.  
Solo reemplaza los enlaces de **Vercel** y **GitHub** antes de subirlo.

---

✅ Con esta versión tu proyecto se ve **listo para evaluación profesional**.  
Solo reemplaza los enlaces de **Vercel** y **GitHub** antes de subirlo.  

¿Quieres que te ayude a escribir el correo final para enviarlo a *Sebastián Acosta* con todo correctamente r