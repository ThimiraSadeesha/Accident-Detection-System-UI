import {Component, effect, inject, signal} from '@angular/core';
import {PoliceService} from "../../police/service/police.service";
import {LoadingService, NotificationService, PaginationComponent} from "../../../core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, TitleCasePipe} from "@angular/common";
import {FireService} from "../service/fire.service";

@Component({
  selector: 'app-fire-view',
    imports: [
        FaIconComponent,
        PaginationComponent,
        ReactiveFormsModule,
        TitleCasePipe,
        FormsModule,
        NgIf
    ],
  templateUrl: './fire-view.component.html',
  standalone: true,
  styleUrl: './fire-view.component.scss'
})
export class FireViewComponent {
  fireService = inject(FireService)
  notification = inject(NotificationService);
  loading = inject(LoadingService);
  totalItems = signal(0);
  pageNumber = signal(1);
  itemsPerPage = signal(10);
  fireId = signal(0)
  createModal = signal(false)
  updateModal = signal(false)

  searchParams = {
    code: '',
    name: '',
    items_per_page: 10,
    page_number: 1,
  }

  fireDTO = {
    id: 0,
    code: '',
    name: '',
    contactNumber: '',
    city: '',
    district: '',
    province: '',
    areaCovered: '',
  }


  constructor() {
    effect(() => {
      const pagination = this.fireService.stat()
      if (pagination) {
        this.itemsPerPage.set(pagination.itemsPerPage)
        this.pageNumber.set(pagination.pageNumber)
        this.totalItems.set(pagination.totalItems)
      }
    });
    effect(() => {
      const police = this.fireService.active()
      if (police) {
        this.fireDTO.id = police.fireId
        this.fireDTO.code = police.firelCode
        this.fireDTO.name = police.fireName
        this.fireDTO.contactNumber = police.contactNumber
        this.fireDTO.city = police.city
        this.fireDTO.district = police.district
        this.fireDTO.province = police.province
        this.fireDTO.areaCovered = police.coverdArea
      }
    });
  }

  fetchPolice() {
    this.fireService.find(this.searchParams).subscribe()
  }


  public onPageChange(pageNumber: number): void {
    this.searchParams = {
      ...this.searchParams,
      page_number: Number(pageNumber)
    };
    this.fetchPolice();
  }

  clear() {
    this.searchParams = {
      code: '',
      name: '',
      items_per_page: 10,
      page_number: 1,
    }
    this.fetchPolice();
  }

  openUpdateModal(policeId: number) {
    this.createModal.set(true);
    this.fireId.set(policeId);
    if (policeId > 0) {
      this.updateModal.set(true);
      this.fireService.getById(String(policeId)).subscribe()

    }

  }

  closeModal() {
    this.createModal.set(false);
    this.updateModal.set(false);
    this.fireId.set(0);
    this.fireDTO = {
      id: 0,
      code: '',
      name: '',
      contactNumber: '',
      city: '',
      district: '',
      province: '',
      areaCovered: '',
    }

  }

  update() {
    this.loading.set(true);
    if (this.fireId() > 0) {
      this.fireService.update(this.fireId(), this.fireDTO).subscribe(
          {
            next: (response) => {
              this.notification.set({
                type: 'success',
                message: `Failed to update this Fire Station successfully`
              });
              this.fetchPolice();
              this.loading.set(false);

            },
            error: (err: any) => {
              this.notification.set({type: 'error', message: `Failed to Update Fire Station`});
              console.error(err);
              this.loading.set(false);
            }
          }
      )
    } else {
      this.fireService.create(this.fireDTO).subscribe({
        next: (response) => {
          this.notification.set({type: 'success', message: `New Fire Station saved successfully`});
          // this.fetchPolice();
          this.loading.set(false);
        },
        error: (err: any) => {
          this.notification.set({type: 'error', message: `Failed to Add Fire Station`});
          console.error(err);
          this.loading.set(false);
        }
      })

    }


  }

  protected readonly faXmark = faXmark;
}
