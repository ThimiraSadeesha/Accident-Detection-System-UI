import {Component, effect, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
import { NgClass, NgIf } from "@angular/common";
import {filter, interval, switchMap} from "rxjs";
import { AuthService } from "../../services";
import { ModalService } from "../../../modules/shared/services/modal.service";
import { FormsModule } from "@angular/forms";
import {ChartService} from "../../../modules/dashboard/service/chart.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-header',
  imports: [

    FormsModule,
    NgClass,
  ],
    templateUrl: './app-header.component.html',
    standalone: true,
    styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {
  activeButton = '';
  activeButtonLabel: string = '';
  authService = inject(AuthService);
  modal = inject(ModalService);
  private chartService = inject(ChartService);
  notification = inject(NotificationService);
  poNumber = signal('');

  buttons = [
    { label: 'Home', endpoint: 'home', key: 'shipments' },
    { label: 'Accidents', endpoint: 'accident', key: 'accident' },
    // { label: 'Vehicles', endpoint: 'vehicle', key: 'vehicle' },
    { label: 'Hospitals', endpoint: 'hospital', key: 'hospital' },
    { label: 'Police', endpoint: 'police', key: 'police' },
    { label: 'Fire', endpoint: 'fire', key: 'fire' },
    { label: 'Reports', endpoint: 'reports', key: 'reports' },
  ];

  constructor(private router: Router, private route: ActivatedRoute)
  {
    effect(() => {
      this.triggerRequestEveryFiveSeconds()
    });
  }

  ngOnInit() {
    this.setActiveButton();
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveButton();
    });
  }

  triggerRequestEveryFiveSeconds() {
    interval(12000)
        .pipe(
            switchMap(() => this.chartService.getNotification(true))
        )
        .subscribe({
          next: (data) => {
            this.notification.set({
              type: 'confirm',
              message: `New Accident Found!`
            });
          },
          error: (err) => {
            console.error('Error:', err);
          }
        });
  }


  downloadPO() {
    if (this.poNumber()) {
      this.modal.$$selectedPONumber.set(this.poNumber());
      this.modal.$$POFetchModal.set(true);
    }
    this.poNumber.set('');
  }

  shipmentCreate() {
    this.modal.$$ShipmentCreateModal.set(true);
  }

  setActiveButton() {
    const currentRoute = this.router.url.split('/')[1];
    this.activeButton = currentRoute || '';
  }

  navigate(endpoint: string) {
    this.router.navigate([endpoint]);
    this.buttons = this.buttons.map(button => {
      if (button.endpoint === endpoint) {
        this.activeButtonLabel = button.label;
      }
      return button;
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}