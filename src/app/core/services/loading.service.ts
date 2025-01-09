import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal(false);
  private loadingTimer: ReturnType<typeof setTimeout> | null = null;

  set(loading: boolean, options: {
    delay?: number,
    immediate?: boolean
  } = {}) {
    const {
      delay = 300,
      immediate = false
    } = options;

    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }

    if (immediate || !loading) {
      this.isLoading.set(loading);
      return;
    }

    this.loadingTimer = setTimeout(() => {
      this.isLoading.set(true);
      this.loadingTimer = null;
    }, delay);
  }

  cancel() {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
      this.loadingTimer = null;
      this.isLoading.set(false);
    }
  }
}



// Proper usage of loading service - @tharuka
// NOTE: for initial data fetch use {immediate}

// Default behavior (300ms delay)
// this.loading.set(true);

// Bypass delay for specific operations
// this.loading.set(true, { immediate: true });

// Custom delay
// this.loading.set(true, { delay: 500 });

// Immediate with custom delay
// this.loading.set(true, {
//   delay: 500,
//   immediate: true
// });

// Hide loading
// this.loading.set(false);