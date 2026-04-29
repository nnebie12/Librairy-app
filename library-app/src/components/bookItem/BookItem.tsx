
import type { Book } from "../../types/book";
import styles from "./BookItem.module.css";

interface BookItemProps {
  book: Book;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function BookItem({
  book,
  isSelected,
  onSelect,
  onToggleStatus,
}: BookItemProps) {
  return (
    <div
      onClick={() => onSelect(book.id)}
      className={[
        styles.bookItem,
        isSelected ? styles.selected : styles.unselected
      ].join(" ")}
    >
      <div>
        <p className={styles.title}>{book.title}</p>
        <p className={styles.author}>{book.author}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStatus(book.id);
        }}
        className={[
          styles.statusBtn,
          book.available ? styles.available : styles.borrowed
        ].join(" ")}
      >
        {book.available ? "Disponible" : "Emprunté"}
      </button>
    </div>
  );
}
