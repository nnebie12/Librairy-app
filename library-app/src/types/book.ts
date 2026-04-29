export interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
    status: "available" | "borrowed";
}

export type BookDictionary = Record<string, Book>;

export function getAvailableBooks(books: BookDictionary): Book[] {
  return Object.values(books).filter((book) => book.available);
}
