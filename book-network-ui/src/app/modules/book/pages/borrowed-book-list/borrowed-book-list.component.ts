import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  BorrowedBookResponse,
  FeedbackRequest,
  PageResponseBorrowedBookResponse,
} from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { FormsModule, NgModel } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss',
})
export class BorrowedBookListComponent implements OnInit {
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  selectedBook: BorrowedBookResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {
    bookId: 0,
    comment: '',
    note: 0,
  };

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (resp) => {
          this.borrowedBooks = resp;
        },
      });
  }

  returnBorrowedBoook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.borrowedBooks.totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === (this.borrowedBooks.totalPages as number) - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService
      .returnBorrowBook({
        'book-id': this.selectedBook?.id as number,
      })
      .subscribe({
        next: () => {
          if (withFeedback) {
            this.giveFeedback();
          }
          this.selectedBook = undefined;
          this.findAllBorrowedBooks();
        },
      });
  }

  giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest,
    }).subscribe({
      next: () => {

      }
    })
  }
}
