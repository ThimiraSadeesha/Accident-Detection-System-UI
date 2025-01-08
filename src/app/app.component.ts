import {Component, computed, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from "flowbite";
import {AppHeaderComponent, AuthService, LoadingService, NotificationService} from "./core";
import {DotAnimationComponent} from "./core/components/loading/dot-animation/dot-animation.component";
import {NotificationAlertComponent} from "./core/components/notification/notification-alert.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, DotAnimationComponent, NotificationAlertComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit ,OnDestroy {

  private route = inject(ActivatedRoute);

  private subscriptions: Subscription = new Subscription();
  isLoading = computed(() => this.loadingService.isLoading());
  showError: boolean = false;
  private querySub: Subscription | undefined;


  constructor(
    private router: Router,
    protected loadingService: LoadingService,
    public notificationService: NotificationService,

  ) {
    effect(() => {

    });
  }

  get notifications() {
    return this.notificationService.notification;
  }
  ngOnInit(): void {
    initFlowbite();

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
        }
      })
    );
  }



  ngOnDestroy(): void {
    if (this.querySub)
      this.querySub.unsubscribe();

    this.subscriptions.unsubscribe();
  }



}
