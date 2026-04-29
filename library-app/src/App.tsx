import { useMemo, useState } from "react";
import styles from "./App.module.css";
import { AddBookForm } from "./components/addBook/AddBookForm";
import { BookList } from "./components/bookList/BookList";
import type { Book, BookDictionary } from "./types/book";
import { getAvailableBooks } from "./types/book";


export default function App() {
  // Exercice 5 — State pour stocker les livres (dictionnaire)
  const [books, setBooks] = useState<BookDictionary>({});
  const [filter, setFilter] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);

  function addBook(title: string, author: string): void {
    const id = String(Date.now());
    const newBook: Book = { id, title, author, available: true };
    setBooks((prev) => ({ ...prev, [id]: newBook }));
  }

  const filteredBooks = useMemo(() => {
    let list = Object.values(books);
    if (filter.trim()) {
      list = list.filter((book) =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (showAvailableOnly) {
      list = list.filter((book) => book.available);
    }
    return list;
  }, [books, filter, showAvailableOnly]);

  const selectedBook = selectedId ? books[selectedId] : null;

  function toggleStatus(id: string) {
    setBooks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        available: !prev[id].available,
      },
    }));
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📚 Bibliothèque</h1>
      <p className={styles.stats}>
        {Object.keys(books).length} livres au total — {getAvailableBooks(books).length} disponibles
      </p>

      <AddBookForm onAdd={addBook} />

      <div
        className={[
          styles.grid,
          selectedBook ? styles.gridTwo : styles.gridOne,
        ].join(" ")}
      >
        <div className={styles.leftCol}>
          <input
            type="text"
            placeholder="Filtrer par titre ou auteur..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={() => setShowAvailableOnly((v) => !v)}
            />
            Afficher seulement les livres disponibles
          </label>
          <BookList
            books={filteredBooks}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            onToggleStatus={toggleStatus}
          />
        </div>
        {selectedBook && (
          <div>
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
              className={styles.toggleBtn}
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
