import { useMemo, useState } from "react";
import styles from "./App.module.css";
import { AddBookForm } from "./components/addBook/AddBookForm";
import { BookList } from "./components/bookList/BookList";
import type { Book, BookDictionary } from "./types/book";
import { getAvailableBooks } from "./types/book";

const initialBooks: BookDictionary = {
  "1": { id: "1", title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", available: true, status: "available" },
  "2": { id: "2", title: "L'Étranger", author: "Albert Camus", available: false, status: "borrowed" },
  "3": { id: "3", title: "Les Misérables", author: "Victor Hugo", available: true, status: "available" },
  "4": { id: "4", title: "Germinal", author: "Émile Zola", available: true, status: "available" },
};

export default function App() {
  const [books, setBooks] = useState<BookDictionary>(initialBooks);
  const [filter, setFilter] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);

  function addBook(title: string, author: string): void {
    const id = String(Date.now());
    const newBook: Book = { id, title, author, available: true, status: "available" };
    setBooks((prev) => ({ ...prev, [id]: newBook }));
  }

  function toggleStatus(id: string): void {
    setBooks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: prev[id].status === "available" ? "borrowed" : "available",
        available: !prev[id].available,
      },
    }));
  }

  // Exercice 8 — Filtre par titre + filtre disponibles
  const filteredBooks = useMemo<Book[]>(() => {
    let list = Object.values(books);
    if (showAvailableOnly) list = getAvailableBooks(books);
    if (filter.trim()) {
      list = list.filter((b) =>
        b.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return list;
  }, [books, filter, showAvailableOnly]);

  // Exercice 8 — Livre sélectionné
  const selectedBook: Book | null = selectedId ? books[selectedId] : null;


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📚 Bibliothèque</h1>
      <p className={styles.stats}>
        {Object.keys(books).length} livres au total — {getAvailableBooks(books).length} disponibles
      </p>

      <div className={styles.filterRow}>
        <input
          type="text"
          placeholder="Filtrer par titre..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterInput}
        />
        <button
          onClick={() => setShowAvailableOnly((v) => !v)}
          className={[
            styles.filterBtn,
            showAvailableOnly ? styles.filterBtnActive : ""
          ].join(" ")}
        >
          {showAvailableOnly ? "✓ Disponibles" : "Disponibles"}
        </button>
      </div>

      <AddBookForm onAdd={addBook} />

      <div
        className={[
          styles.grid,
          selectedBook ? styles.gridTwo : styles.gridOne,
        ].join(" ")}
      >
        <div className={styles.leftCol}>
          {/* Le filtre et le bouton sont déjà au-dessus, on retire ce doublon */}
          <BookList
            books={filteredBooks}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            onToggleStatus={toggleStatus}
          />
        </div>
        {selectedBook && (
          <div className={styles.detailCard}>
            <div className={styles.detailCardHeader}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Détails</h2>
              <button
                onClick={() => setSelectedId(null)}
                className={styles.closeBtn}
              >
                ×
              </button>
            </div>
            <p className={styles.bookTitle}>{selectedBook.title}</p>
            <p className={styles.bookAuthor}>{selectedBook.author}</p>
            <div className={styles.bookDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>ID</span>
                <span className={styles.detailValue}>{selectedBook.id}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Statut</span>
                <span
                  className={[
                    styles.status,
                    selectedBook.available ? styles.statusAvailable : styles.statusBorrowed,
                  ].join(" ")}
                >
                  {selectedBook.available ? "Disponible" : "Emprunté"}
                </span>
              </div>
            </div>
            <button
              className={[
                styles.toggleBtn,
                !selectedBook.available ? styles.toggleBtnBorrowed : ""
              ].join(" ")}
              onClick={() => toggleStatus(selectedBook.id)}
            >
              {selectedBook.available ? "Marquer comme emprunté" : "Marquer comme disponible"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
