import { BookItem } from "../../components/bookItem/BookItem";
import type { Book } from "../../types/book";
import styles from "./BookList.module.css";

interface BookListProps {
  books: Book[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function BookList({
  books,
  selectedId,
  onSelect,
  onToggleStatus,
}: BookListProps) {
  if (books.length === 0) {
    return (
      <p className={styles.empty}>
        Aucun livre trouvé.
      </p>
    );
  }

  return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isSelected={book.id === selectedId}
          onSelect={onSelect}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
