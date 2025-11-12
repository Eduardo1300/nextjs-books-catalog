import { notFound } from "next/navigation";
import React from "react";

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  languages: string[];
  download_count: number;
  formats: Record<string, string>;
}

async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`https://gutendex.com/books/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  return (
    <section className="max-w-2xl mx-auto p-6 mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{book.title}</h1>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-blue-700 dark:text-yellow-300">Autor:</span> {book.authors?.[0]?.name || <span className="italic text-gray-400">Desconocido</span>}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-blue-700 dark:text-yellow-300">Idiomas:</span> {book.languages?.join(", ")}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-blue-700 dark:text-yellow-300">Temas:</span> {book.subjects?.slice(0, 5).join(", ") || 'N/A'}
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-blue-700 dark:text-yellow-300">Descargas:</span> {book.download_count}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(book.formats).filter(([k]) => k.includes('text/html') || k.includes('application/pdf')).map(([format, url]) => (
          <a
            key={format}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm"
          >
            Leer en {format.includes('pdf') ? 'PDF' : 'Web'}
          </a>
        ))}
      </div>
    </section>
  );
}
