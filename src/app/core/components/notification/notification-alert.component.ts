import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-notification-alert',
    templateUrl: './notification-alert.component.html',
    imports: [NgClass],
    standalone: true,
    styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent {
  @Input() type!: 'success' | 'error' | 'alert' | 'confirm';
  @Input() message!: string;
  @Output() close = new EventEmitter<void>();
  @Input() isLeaving: boolean = false;

  closeNotification() {
    this.close.emit();
  }
}
