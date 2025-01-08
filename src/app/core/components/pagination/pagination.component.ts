import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  standalone: true,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
@Input() totalItems = 0;
@Input() itemsPerPage = 1;
@Output() pageChanged = new EventEmitter<number>();

  currentPage = 1;
  totalPages = 0;
  visiblePageNumbers: number[] = [];
  startItem = 1;
  endItem = 1;

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.currentPage = 1; // Reset to first page when data changes
      this.updatePagination();
      this.pageChanged.emit(this.currentPage); // Emit the change to page 1
    }
  }

  updatePagination() {
    this.calculateTotalPages();
    this.updateVisiblePageNumbers();
    this.updateItemRange();
  }

  calculateTotalPages() {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }

  updateVisiblePageNumbers() {
    const pageRange = 2; // Number of pages to show before and after the current page
    let start = Math.max(1, this.currentPage - pageRange);
    let end = Math.min(this.totalPages, this.currentPage + pageRange);

    // Adjust the range if we're at the start or end
    if (start === 1) {
      end = Math.min(this.totalPages, 5);
    }
    if (end === this.totalPages) {
      start = Math.max(1, this.totalPages - 4);
    }

    this.visiblePageNumbers = Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  updateItemRange() {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.pageChanged.emit(this.currentPage);
    }
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }
}
