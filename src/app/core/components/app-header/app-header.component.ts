import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
import { NgClass, NgIf } from "@angular/common";
import { filter } from "rxjs";
import { AuthService } from "../../services";
import { ModalService } from "../../../modules/shared/services/modal.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-header',
    imports: [
        NgClass,
        FormsModule,
    ],
    templateUrl: './app-header.component.html',
    standalone: true,
    styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {
  activeButton = '';
  authService = inject(AuthService);
  modal = inject(ModalService);
  poNumber = signal('');

  buttons = [
    { label: 'Shipments', endpoint: 'shipments', key: 'shi' },
    { label: 'Purchase Orders', endpoint: 'purchase-orders', key: 'purchase-order' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setActiveButton();
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveButton();
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
  }

  logout() {

  }
}