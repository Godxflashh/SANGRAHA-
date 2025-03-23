import { create } from 'zustand';

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  category: string;
  description: string;
}

interface BookStore {
  books: Book[];
  setBooks: (books: Book[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));