"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import BookItem from "./BookItem";
import LoadingSkeleton from "./LoadingSkeleton";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";

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
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavView, setShowFavView] = useState(false);
  const [favBooks, setFavBooks] = useState<Book[]>([]);
  const [favPage, setFavPage] = useState(1);
  const favsPerPage = 10;

  // Cargar favoritos de localStorage al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favs = localStorage.getItem("favorites");
      if (favs) setFavorites(JSON.parse(favs));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Llamada al API para libros normales
  useEffect(() => {
    if (showFavView) return;
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://gutendex.com/books/?page=${page}&page_size=10`
        );
        if (!res.ok) throw new Error("Error al obtener los libros");
        const data = await res.json();
        setBooks(data.results);
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
        const start = (favPage - 1) * favsPerPage;
        const end = start + favsPerPage;
        const idsToFetch = favorites.slice(start, end);
        const promises = idsToFetch.map((id) =>
          fetch(`https://gutendex.com/books/${id}`).then((r) =>
            r.ok ? r.json() : null
          )
        );
        const results = await Promise.all(promises);
        setFavBooks(results.filter(Boolean));
      } catch (err: any) {
        setError("Error al cargar favoritos");
      } finally {
        setLoading(false);
      }
    };
    fetchFavBooks();
  }, [favorites, favPage, showFavView]);

  // Manejo de estados
  if (!showFavView && (page < 1 || page > totalPages)) {
    return (
      <section
        className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-lg mt-8 border ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <p
          className={`text-center text-lg font-medium ${
            darkMode ? "text-red-300" : "text-red-600"
          }`}
        >
          Página fuera de rango. Solo hay páginas del 1 al {totalPages}.
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-lg mt-8 border ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <p
          className={`text-center text-lg font-medium ${
            darkMode ? "text-red-300" : "text-red-600"
          }`}
        >
          ❌ {error}
        </p>
      </section>
    );
  }

  // Filtrado por búsqueda
  let filteredBooks: Book[] = [];
  if (showFavView) {
    filteredBooks = favBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        (book.authors[0]?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  } else {
    filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        (book.authors[0]?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    filteredBooks = filteredBooks.slice(0, 10);
  }

  const totalFavPages = Math.max(1, Math.ceil(favorites.length / favsPerPage));

  return (
    <section
      className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-lg mt-8 border ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((m) => !m)}
        showFavView={showFavView}
        onToggleFavView={() => {
          setShowFavView((f) => !f);
          setFavPage(1);
          setSearch("");
        }}
        favoritesCount={favorites.length}
      />

      {/* Search Bar */}
      <SearchBar value={search} onChange={setSearch} darkMode={darkMode} />

      {/* Loading State */}
      {loading && <LoadingSkeleton darkMode={darkMode} count={10} />}

      {/* Content */}
      {!loading && filteredBooks.length === 0 ? (
        <EmptyState darkMode={darkMode} showFavView={showFavView} />
      ) : (
        !loading && (
          <>
            <ul>
              {filteredBooks.map((book) => {
                const isFav = favorites.includes(book.id);
                return (
                  <BookItem
                    key={book.id}
                    book={book}
                    darkMode={darkMode}
                    isFavorite={isFav}
                    onToggleFavorite={() =>
                      setFavorites((favs) =>
                        isFav
                          ? favs.filter((id) => id !== book.id)
                          : [...favs, book.id]
                      )
                    }
                  />
                );
              })}
            </ul>

            {/* Pagination */}
            {showFavView ? (
              <Pagination
                currentPage={favPage}
                totalPages={totalFavPages}
                darkMode={darkMode}
                onPreviousPage={() => setFavPage((p) => Math.max(1, p - 1))}
                onNextPage={() =>
                  setFavPage((p) => Math.min(totalFavPages, p + 1))
                }
                isLoading={loading}
              />
            ) : (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                darkMode={darkMode}
                onPreviousPage={() => setPage((p) => Math.max(1, p - 1))}
                onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
                isLoading={loading}
              />
            )}
          </>
        )
      )}
    </section>
  );
}
