import type { BookDetails, GoogleBookVolume } from '../types/book';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export async function searchBooks(query: string) {
  try {
    // Option 1: With API key
    const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=10${GOOGLE_BOOKS_API_KEY ? `&key=${GOOGLE_BOOKS_API_KEY}` : ''}`;
    
    // Option 2: Without API key (public access has limitations but works)
    // const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&maxResults=10`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Books API error:', errorData);
      throw new Error(`API error: ${errorData?.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export async function getBookById(id: string) {
  try {
    // Option 1: With API key
    const url = `${GOOGLE_BOOKS_API_URL}/${id}${GOOGLE_BOOKS_API_KEY ? `?key=${GOOGLE_BOOKS_API_KEY}` : ''}`;
    
    // Option 2: Without API key
    // const url = `${GOOGLE_BOOKS_API_URL}/${id}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Books API error:', errorData);
      throw new Error(`API error: ${errorData?.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
}

export function transformGoogleBookToBookDetails(volume: GoogleBookVolume): BookDetails {
  return {
    id: volume.id,
    title: volume.volumeInfo.title,
    author: volume.volumeInfo.authors?.[0] || 'Unknown Author',
    description: volume.volumeInfo.description || 'No description available.',
    publishedYear: volume.volumeInfo.publishedDate?.split('-')[0] || 'Unknown',
    coverUrl: volume.volumeInfo.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
    rating: volume.volumeInfo.averageRating || 0,
    ratingsCount: volume.volumeInfo.ratingsCount || 0,
    categories: volume.volumeInfo.categories || [],
    buyLink: volume.saleInfo?.buyLink || volume.volumeInfo.infoLink || '',
  };
}