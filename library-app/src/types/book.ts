export interface Book {
  id: string;
  title: string;
  author: string;
}

export type BookDictionary = Record<string, Book>;
