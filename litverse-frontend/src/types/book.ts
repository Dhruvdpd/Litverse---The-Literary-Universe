// types/book.ts

export interface BookDetails {
    id: string;
    title: string;
    author: string;
    description: string;
    publishedYear: string;
    coverUrl: string;
    rating: number;
    ratingsCount: number;
    categories: string[];
    buyLink?: string;
  }
  
  export interface GoogleBookVolume {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      publishedDate?: string;
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
      averageRating?: number;
      ratingsCount?: number;
      categories?: string[];
      infoLink?: string; // 👈 Add this
    };
    saleInfo?: {
      buyLink?: string; // 👈 Add this
    };
  }