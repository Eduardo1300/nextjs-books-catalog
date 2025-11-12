"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Definimos los tipos (TypeScript)
interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
}

// Componente principal

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavView, setShowFavView] = useState(false);
  const [favBooks, setFavBooks] = useState<Book[]>([]);
  const [favPage, setFavPage] = useState(1);
  const favsPerPage = 10;
  // Cargar favoritos de localStorage al montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = localStorage.getItem('favorites');
      if (favs) setFavorites(JSON.parse(favs));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Llamada al API para libros normales
  useEffect(() => {
    if (showFavView) return;
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Limitar a 10 libros por página
        const res = await fetch(`https://gutendex.com/books/?page=${page}&page_size=10`);
        if (!res.ok) throw new Error('Error al obtener los libros');
        const data = await res.json();
        setBooks(data.results);
        setTotalPages(5); // Limitar a 5 páginas
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, showFavView]);

  // Llamada a la API para libros favoritos (solo cuando showFavView)
  useEffect(() => {
    if (!showFavView) return;
    const fetchFavBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener solo los favoritos de la página actual
        const start = (favPage - 1) * favsPerPage;
        const end = start + favsPerPage;
        const idsToFetch = favorites.slice(start, end);
        const promises = idsToFetch.map(id => fetch(`https://gutendex.com/books/${id}`).then(r => r.ok ? r.json() : null));
        const results = await Promise.all(promises);
        setFavBooks(results.filter(Boolean));
      } catch (err: any) {
        setError('Error al cargar favoritos');
      } finally {
        setLoading(false);
      }
    };
    fetchFavBooks();
  }, [favorites, favPage, showFavView]);

  // Manejo de estados
  if (!showFavView && (page < 1 || page > 5)) return (
    <div className={`flex flex-col items-center justify-center h-64 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <p className={`text-center text-lg font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>Página fuera de rango. Solo hay páginas del 1 al 5.</p>
    </div>
  );
  if (loading) return (
    <div className={`flex flex-col items-center justify-center h-64 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <span className={`animate-spin rounded-full h-10 w-10 border-b-2 ${darkMode ? 'border-yellow-400' : 'border-blue-500'} mb-4`}></span>
      <p className={`text-center text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Cargando libros...</p>
    </div>
  );
  if (error) return <p className={`text-center mt-8 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>{error}</p>;

  // Mostrar lista
  // Filtrado por búsqueda
  let filteredBooks: Book[] = [];
  if (showFavView) {
    filteredBooks = favBooks.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.authors[0]?.name || '').toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.authors[0]?.name || '').toLowerCase().includes(search.toLowerCase())
    );
    // Limitar la visualización a solo 10 libros
    filteredBooks = filteredBooks.slice(0, 10);
  }

  return (
    <section className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-lg mt-8 border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Encabezado y botón de modo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Catálogo de Libros</h1>
        <div className="flex gap-2 items-center">
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold shadow transition border ${darkMode ? 'bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200'}`}
            onClick={() => setDarkMode((m) => !m)}
            aria-label="Alternar modo oscuro/claro"
          >
            {darkMode ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                Modo claro
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71" /></svg>
                Modo oscuro
              </>
            )}
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold shadow transition border ${showFavView ? (darkMode ? 'bg-yellow-400 text-gray-900 border-yellow-500' : 'bg-yellow-200 text-yellow-900 border-yellow-400') : (darkMode ? 'bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200')}`}
            onClick={() => {
              setShowFavView(f => !f);
              setFavPage(1);
            }}
            aria-label="Ver todos los favoritos"
          >
            <svg className="w-5 h-5" fill={showFavView ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a3.375 3.375 0 015.04 3.789l-.804 1.63 1.8.262a3.375 3.375 0 011.87 5.757l-1.3 1.27.307 1.79a3.375 3.375 0 01-4.898 3.557l-1.61-.847-1.61.847a3.375 3.375 0 01-4.898-3.557l.307-1.79-1.3-1.27a3.375 3.375 0 011.87-5.757l1.8-.262-.804-1.63a3.375 3.375 0 015.04-3.789z" /></svg>
            {showFavView ? 'Todos los favoritos' : 'Ver favoritos'}
          </button>
        </div>
      </div>

  {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 text-gray-100 border-gray-600 focus:ring-yellow-400 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-400 focus:ring-blue-600 placeholder-gray-500'}`}
          aria-label="Buscar libros por título o autor"
        />
      </div>

      {/* Lista de libros */}
      {filteredBooks.length === 0 ? (
        <div className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <svg className="mx-auto mb-2 w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" />
          </svg>
          <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{showFavView ? 'No tienes libros favoritos en esta página.' : 'No se encontraron libros que coincidan con tu búsqueda.'}</p>
        </div>
      ) : (
        <>
          <ul>
            {filteredBooks.map((book) => {
              const isFav = favorites.includes(book.id);
              return (
                <li
                  key={book.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 py-3 px-2 border-b last:border-b-0 transition ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <span className={`inline-block font-mono text-xs font-bold rounded px-2 py-0.5 ${darkMode ? 'bg-gray-700 text-yellow-200' : 'bg-blue-100 text-blue-700'}`}>#{book.id}</span>
                  <span
                    className={`font-semibold text-base truncate flex-1 ${darkMode ? 'text-yellow-200' : 'text-blue-800'}`}
                    title={book.title}
                  >
                    {book.title}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-blue-700'} font-medium`}>{book.authors?.[0]?.name || <span className="italic text-gray-400">Desconocido</span>}</span>
                  <button
                    className={`ml-2 flex items-center px-2 py-1 rounded transition border text-xs font-semibold ${isFav ? (darkMode ? 'bg-yellow-400 text-gray-900 border-yellow-500' : 'bg-yellow-200 text-yellow-900 border-yellow-400') : (darkMode ? 'bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200')}`}
                    onClick={() => setFavorites(favs => isFav ? favs.filter(id => id !== book.id) : [...favs, book.id])}
                    aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <svg className="w-4 h-4 mr-1" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a3.375 3.375 0 015.04 3.789l-.804 1.63 1.8.262a3.375 3.375 0 011.87 5.757l-1.3 1.27.307 1.79a3.375 3.375 0 01-4.898 3.557l-1.61-.847-1.61.847a3.375 3.375 0 01-4.898-3.557l.307-1.79-1.3-1.27a3.375 3.375 0 011.87-5.757l1.8-.262-.804-1.63a3.375 3.375 0 015.04-3.789z" /></svg>
                    {isFav ? 'Favorito' : 'Favorito'}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Controles de paginación */}
          {showFavView ? (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                className={`px-3 py-1 rounded border font-semibold transition ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200'} disabled:opacity-50`}
                onClick={() => setFavPage((p) => Math.max(1, p - 1))}
                disabled={favPage === 1}
              >Anterior</button>
              <span className={`px-3 py-1 font-mono text-sm ${darkMode ? 'text-yellow-200' : 'text-blue-700'}`}>Página {favPage} de {Math.max(1, Math.ceil(favorites.length / favsPerPage))}</span>
              <button
                className={`px-3 py-1 rounded border font-semibold transition ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200'} disabled:opacity-50`}
                onClick={() => setFavPage((p) => Math.min(Math.ceil(favorites.length / favsPerPage), p + 1))}
                disabled={favPage === Math.ceil(favorites.length / favsPerPage) || favorites.length === 0}
              >Siguiente</button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                className={`px-3 py-1 rounded border font-semibold transition ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200'} disabled:opacity-50`}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >Anterior</button>
              <span className={`px-3 py-1 font-mono text-sm ${darkMode ? 'text-yellow-200' : 'text-blue-700'}`}>Página {page} de {totalPages}</span>
              <button
                className={`px-3 py-1 rounded border font-semibold transition ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-blue-700 border-gray-300 hover:bg-gray-200'} disabled:opacity-50`}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >Siguiente</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
