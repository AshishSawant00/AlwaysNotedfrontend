export class Page<T> {
    content: T[];          // The actual content of the page
    totalPages: number;     // Total number of pages
    totalElements: number;  // Total number of elements across all pages
    last: boolean;          // Whether this is the last page
    size: number;           // Number of elements on this page
    number: number;         // Current page number, 0-indexed
    numberOfElements: number;  // Number of elements on this page
  
    constructor() {
      this.content = [];
      this.totalPages = 0;
      this.totalElements = 0;
      this.last = true;
      this.size = 0;
      this.number = 0;
      this.numberOfElements = 0;
    }
  }
  