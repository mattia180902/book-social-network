import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent implements OnInit {
  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined

  @Input() set book(value: BookResponse) {
    this._book = value;
  }

  get book(): BookResponse {
    return this._book;
  }

  get bookCover(): string | undefined {
    return this._bookCover;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input() set manage(value: boolean) {
    this._manage = value;
  }

  ngOnInit(): void {
    if (this.book.cover) {
      this._bookCover = 'data:image/jpg;base64,' + this._book.cover;
    } else {
      this.getRandomLoremPicsumImage();
    }
  }

  getRandomLoremPicsumImage(): void {
    const width = 1900;
    const height = 800;
    const randomId = Math.floor(Math.random() * 1000); // Genera un ID casuale

    this._bookCover = `https://picsum.photos/${width}/${height}?random=${randomId}`;
  }

  @Output() private share: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> =
    new EventEmitter<BookResponse>();

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }
  onBorrow() {
    this.borrow.emit(this._book);
  }
  onShowDetails() {
    this.details.emit(this._book);
  }
  onArchive() {
    this.archive.emit(this._book);
  }
  onShare() {
    this.share.emit(this._book);
  }
  onEdit() {
    this.edit.emit(this._book);
  }
}
