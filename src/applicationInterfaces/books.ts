export interface Book {
  title: string;
  authors: string[];
  countryOfOrigin: string;
  id: string;
  publicDomain: boolean;
  description: string;
  googleApiLink: string;
  averageRating: number;
  ratingsCount: number;
  language: string;
  pageCount: number;
  publishYear: number;
  originalPublishYear: number | null;
  images: {
    thumbnail: string;
    medium: string;
    large: string;
  };
  categories: string[];
  level?: number;
  points?: number;
  isbn?: { isbn: string; publisher: string }[];
  arDataAvailable: boolean | null;
  loadingARData: boolean;
  previewLink: string;
}
