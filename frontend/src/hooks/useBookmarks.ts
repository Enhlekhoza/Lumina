import { useState, useEffect } from 'react';

// Define the shape of a bookmarked item
export interface Bookmark {
  slug: string;
  title: string;
  summary: string;
}

// Custom hook to manage bookmarks in localStorage
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem('lumina-bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
    }
  }, []);

  // Function to add a bookmark
  const addBookmark = (item: Bookmark) => {
    const updatedBookmarks = [...bookmarks, item];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('lumina-bookmarks', JSON.stringify(updatedBookmarks));
  };

  // Function to remove a bookmark
  const removeBookmark = (slug: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.slug !== slug);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('lumina-bookmarks', JSON.stringify(updatedBookmarks));
  };

  // Function to check if an item is bookmarked
  const isBookmarked = (slug: string) => {
    return bookmarks.some(bookmark => bookmark.slug === slug);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
};
