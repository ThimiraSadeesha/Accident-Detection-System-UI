import {Component, computed, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from "flowbite";
import {AppHeaderComponent, LoadingService, NotificationService} from "./core";
import {DotAnimationComponent} from "./core/components/loading/dot-animation/dot-animation.component";
import {NotificationAlertComponent} from "./core/components/notification/notification-alert.component";
import {filter, Subscription} from "rxjs";
import {LoginComponent} from "./core/components/login/login.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppHeaderComponent, DotAnimationComponent, NotificationAlertComponent],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();
    isLoading = computed(() => this.loadingService.isLoading());
    private querySub: Subscription | undefined;
    isLoginPage: boolean = false;


    constructor(
        private router: Router,
        protected loadingService: LoadingService,
        public notificationService: NotificationService,
    ) {
    }

    get notifications() {
        return this.notificationService.notification;
    }

    ngOnInit(): void {
        initFlowbite();

        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.isLoginPage = event.urlAfterRedirects.includes('/login');
        });
    }

    ngOnDestroy(): void {
        if (this.querySub) {
            this.querySub.unsubscribe();
        }
        this.subscriptions.unsubscribe();
    }
}