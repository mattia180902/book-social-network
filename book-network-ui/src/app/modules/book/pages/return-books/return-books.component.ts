import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageResponseBorrowedBookResponse } from '../../../../services/models/page-response-borrowed-book-response';
import { BorrowedBookResponse } from '../../../../services/models/borrowed-book-response';
import { BookService } from '../../../../services/services/book.service';

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss',
})
export class ReturnBooksComponent {
  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = '';
  level: string = 'success';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (resp) => {
          this.returnedBooks = resp;
        },
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  get isLastPage() {
    return this.page === (this.returnedBooks.totalPages as number) - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'Book is not yet returned';
      return;
    }
    this.bookService
      .approveReturnBorrowBook({
        'book-id': book.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book return approved';
          this.findAllReturnedBooks();
        },
      });
  }
}
