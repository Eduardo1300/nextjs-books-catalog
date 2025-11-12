import BooksList from "@/app/components/BooksList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <BooksList />
    </main>
  );
}
