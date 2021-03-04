export enum ISBNType {
  ISBN_10 = "ISBN_10",
  ISBN_13 = "ISBN_13",
}

interface IndustrialIdentifier {
  identifier: string;
  type: ISBNType;
}

interface VolumeInformation {
  allowAnonLogging: boolean;
  authors: string[];
  averageRating: number;
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: IndustrialIdentifier[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  previewLink: string;
  printType: string;
  publisher: string;
  publishedDate: string | number;
  ratingsCount: number;
  readingModes: {
    image: boolean;
    text: boolean;
  };
  title: string;
}

interface SaleInfo {
  buyLink: string;
  country: string;
  isEbook: boolean;
  saleability: string;
}

interface AccessInfo {
  accessViewStatus: string;
  country: string;
  embeddable: boolean;
  epub: {
    downloadLink: string;
    isAvailable: boolean;
  };
  pdf: {
    downloadLink: string;
    isAvailable: boolean;
  };
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
}

export interface GoogleSearchListItem {
  accessInfo: AccessInfo;
  etag: string;
  id: string;
  kind: string;
  saleInfo: SaleInfo;
  searchInfo: {
    textSnippet: string;
  };
  selfLink: string;
  volumeInfo: VolumeInformation;
}

export interface ApiResultGoogleSearchList {
  items: GoogleSearchListItem[];
  kind: string;
  totalItems: number;
}

interface ARISBN {
  publisher: string;
  isbn: string;
  yearPublished: number;
  pageCount: number;
}

export interface ARResult {
  points?: number;
  level?: number;
  interestLevel?: string;
  author?: string;
  title?: string;
  isbn?: ARISBN[];
  isExactMatch?: boolean;
  searchQuery?: string;
  error?: string;
}
