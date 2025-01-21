import {Component, effect, inject, signal} from '@angular/core';
import {PoliceService} from "../../police/service/police.service";
import {LoadingService, NotificationService, PaginationComponent} from "../../../core";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, TitleCasePipe} from "@angular/common";
import {HospitalService} from "../service/hospital.service";

@Component({
  selector: 'app-hospital-view',
  imports: [
    FaIconComponent,
    PaginationComponent,
    ReactiveFormsModule,
    TitleCasePipe,
    FormsModule,
    NgIf
  ],
  templateUrl: './hospital-view.component.html',
  standalone: true,
  styleUrl: './hospital-view.component.scss'
})
export class HospitalViewComponent {
  hospitalService = inject(HospitalService)
  notification = inject(NotificationService);
  loading = inject(LoadingService);
  totalItems = signal(0);
  pageNumber = signal(1);
  itemsPerPage = signal(10);
  hospitalId = signal(0)
  createModal = signal(false)
  updateModal = signal(false)

  searchParams = {
    code: '',
    name: '',
    items_per_page: 10,
    page_number: 1,
  }

  hospitalDTO = {
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
      const pagination = this.hospitalService.stat()
      if (pagination) {
        this.itemsPerPage.set(pagination.itemsPerPage)
        this.pageNumber.set(pagination.pageNumber)
        this.totalItems.set(pagination.totalItems)
      }
    });
    effect(() => {
      const police = this.hospitalService.active()
      if (police) {
        this.hospitalDTO.id = police.hospitalId
        this.hospitalDTO.code = police.hospitalCode
        this.hospitalDTO.name = police.hospitalName
        this.hospitalDTO.contactNumber = police.contactNumber
        this.hospitalDTO.city = police.city
        this.hospitalDTO.district = police.district
        this.hospitalDTO.province = police.province
        this.hospitalDTO.areaCovered = police.coverdArea
      }
    });
  }

  fetchPolice() {
    this.hospitalService.find(this.searchParams).subscribe()
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
    this.hospitalId.set(policeId);
    if (policeId > 0) {
      this.updateModal.set(true);
      this.hospitalService.getById(String(policeId)).subscribe()

    }

  }

  closeModal() {
    this.createModal.set(false);
    this.hospitalId.set(0);
    this.hospitalDTO = {
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
    if (this.hospitalId() > 0) {
      this.hospitalService.update(this.hospitalId(), this.hospitalDTO).subscribe(
          {
            next: (response) => {
              this.notification.set({
                type: 'success',
                message: `Failed to update this Hospital successfully`
              });
              this.fetchPolice();
              this.loading.set(false);

            },
            error: (err: any) => {
              this.notification.set({type: 'error', message: `Failed to Update Hospital`});
              console.error(err);
              this.loading.set(false);
            }
          }
      )
    } else {
      this.hospitalService.create(this.hospitalDTO).subscribe({
        next: (response) => {
          this.notification.set({type: 'success', message: `New Hospital saved successfully`});
          // this.fetchPolice();
          this.loading.set(false);
        },
        error: (err: any) => {
          this.notification.set({type: 'error', message: `Failed to Add Hospital`});
          console.error(err);
          this.loading.set(false);
        }
      })

    }


  }

  protected readonly faXmark = faXmark;

}
