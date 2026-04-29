import { useState } from "react";
import styles from "./AddBookForm.module.css";

interface AddBookFormProps {
  onAdd: (title: string, author: string) => void;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onAdd(title.trim(), author.trim());
    setTitle("");
    setAuthor("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Ajouter un livre</h3>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Auteur"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Ajouter
      </button>
    </form>
  );
}
