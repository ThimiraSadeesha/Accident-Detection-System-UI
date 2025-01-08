import {computed, Injectable, signal} from '@angular/core';

export type NotificationType = 'success' | 'error' | 'alert' | 'confirm';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timeout?: number;
  isLeaving: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSignal = signal<Notification[]>([]);
  public notification = computed(() => this.notificationsSignal());
  private defaultTimeout = 5000;
  private timeouts: Map<string, number> = new Map();

  set(notification: Omit<Notification, 'id' | 'isLeaving'>): string {
    const id = this.generateId();
    const fullNotification: Notification = {
      ...notification,
      id,
      isLeaving: false
    };

    this.notificationsSignal.update(notifications => [fullNotification, ...notifications]);

    if (notification.timeout !== 0) {
      const timeoutId = window.setTimeout(() => {
        this.startLeaveAnimation(id);
      }, notification.timeout || this.defaultTimeout);

      this.timeouts.set(id, timeoutId);
    }

    return id;
  }

  startLeaveAnimation(id: string) {
    this.notificationsSignal.update(notifications =>
      notifications.map(notification =>
        notification.id === id ? { ...notification, isLeaving: true } : notification
      )
    );

    setTimeout(() => {
      this.clearNotification(id);
    }, 100);
  }

  clearNotification(id: string) {
    this.notificationsSignal.update(notifications =>
      notifications.filter(notification => notification.id !== id)
    );

    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
