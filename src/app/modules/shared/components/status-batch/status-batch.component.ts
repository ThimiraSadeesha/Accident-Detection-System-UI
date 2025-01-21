import {Component, Input} from '@angular/core';
import {NgClass, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="px-2 py-1 rounded-md text-xs font-medium"
          [ngClass]="getStatusClass()">
      {{ getStatusText() | uppercase }}
    </span>
  `,
  standalone: true,
  imports: [
    NgClass,
    UpperCasePipe
  ],
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: any;

  getStatusText(): string {
    // If status is being used for stock checking
    if (this.status === null || this.status === undefined) {
      return 'NO STOCK';
    }

    if (Array.isArray(this.status) || typeof this.status === 'number') {
      return this.hasStock() ? 'IN STOCK' : 'NO STOCK';
    }
    return this.status;
  }

  hasStock(): boolean {
    if (this.status === null || this.status === undefined) {
      return false;
    }

    if (Array.isArray(this.status)) {
      return this.status.length > 0;
    }

    if (typeof this.status === 'number') {
      return this.status > 0;
    }

    return false;
  }

  getStatusClass(): { [key: string]: boolean } {
    // If status is being used for stock checking
    if (this.status === null || this.status === undefined ||
        Array.isArray(this.status) || typeof this.status === 'number') {
      return {
        'bg-green-100 text-green-700': this.hasStock(),
        'bg-red-100 text-red-700': !this.hasStock()
      };
    }

    const statusLower = this.status?.toLowerCase() || '';
    return {
      'bg-green-100 text-green-700': statusLower === 'active' || statusLower === 'completed'|| statusLower === 'open',
      'bg-yellow-100 text-yellow-700': statusLower === 'resolve',
      'bg-red-100 text-red-700': statusLower === 'pending' || statusLower === 'inactive'
    };
  }
}