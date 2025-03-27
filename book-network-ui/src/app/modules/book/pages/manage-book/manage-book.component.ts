import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services/book.service';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };

  constructor(private bookService: BookService, private router: Router) {}

  onFileSelector(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);
    if (this.selectedBookCover) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService
      .saveBook({ body: this.bookRequest })
      .subscribe({
        next: (bookId) => {
          if (this.selectedBookCover) {
            const formData = new FormData();
            formData.append('file', this.selectedBookCover);
            console.log('FormData:', formData); // Aggiungi questo log
            this.bookService
              .uploadBookCoverPicture({
                'book-id': bookId,
                body: formData,
              })
              .subscribe({
                next: () => {
                  this.router.navigate(['/books/my-books']);
                },
                error: (err) => {
                  this.errorMsg = [
                    'Failed to upload cover image. Book details were saved.',
                  ];
                  console.error(err);
                },
              });
          } else {
            this.router.navigate(['/books/my-books']);
          }
        },
        error: (err) => {
          this.errorMsg = err.error?.validationErrors || [
            'Failed to save book details.',
          ];
        },
      });
  }
}
