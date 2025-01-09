import {Component, effect, inject, signal} from '@angular/core';
import {PoliceService} from "../service/police.service";
import {NgClass, TitleCasePipe} from "@angular/common";
import {LoadingService, NotificationService, PaginationComponent} from "../../../core";
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-police-view',
    imports: [

        TitleCasePipe,
        PaginationComponent,
        FormsModule,
        FaIconComponent
    ],
    templateUrl: './police-view.component.html',
    standalone: true,
    styleUrl: './police-view.component.scss'
})
export class PoliceViewComponent {

    policeService = inject(PoliceService)
    notification = inject(NotificationService);
    loading = inject(LoadingService);
    totalItems = signal(0);
    pageNumber = signal(1);
    itemsPerPage = signal(10);
    policeId = signal(0)
    createModal = signal(false)
    updateModal = signal(false)

    searchParams = {
        code: '',
        name: '',
        items_per_page: 10,
        page_number: 1,
    }

    policeDTO = {
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
            const pagination = this.policeService.stat()
            if (pagination) {
                this.itemsPerPage.set(pagination.itemsPerPage)
                this.pageNumber.set(pagination.pageNumber)
                this.totalItems.set(pagination.totalItems)
            }
        });
        effect(() => {
            const police = this.policeService.active()
            if (police) {
                this.policeDTO.id = police.policeId
                this.policeDTO.code = police.PoliceCode
                this.policeDTO.name = police.PoliceName
                this.policeDTO.contactNumber = police.contactNumber
                this.policeDTO.city = police.city
                this.policeDTO.district = police.district
                this.policeDTO.province = police.province
                this.policeDTO.areaCovered = police.areaCovered
            }
        });
    }

    fetchPolice() {
        this.policeService.find(this.searchParams).subscribe()
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
        this.updateModal.set(false);
        this.fetchPolice();
    }

    openUpdateModal(policeId: number) {
        this.createModal.set(true);
        this.updateModal.set(false);
        this.policeId.set(policeId);
        if (policeId > 0) {
            this.updateModal.set(true);
            this.policeService.getById(String(policeId)).subscribe()

        }

    }

    closeModal() {
        this.createModal.set(false);
        this.updateModal.set(false);
        this.policeId.set(0);
        this.policeDTO = {
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
        if (this.policeId() > 0) {
            this.policeService.update(this.policeId(), this.policeDTO).subscribe(
                {
                    next: (response) => {
                        this.notification.set({
                            type: 'success',
                            message: `Failed to update this Police Station successfully`
                        });
                        this.fetchPolice();
                        this.loading.set(false);
                        this.updateModal.set(false);

                    },
                    error: (err: any) => {
                        this.notification.set({type: 'error', message: `Failed to Update Police Station`});
                        console.error(err);
                        this.loading.set(false);
                    }
                }
            )
        } else {
            this.policeService.create(this.policeDTO).subscribe({
                next: (response) => {
                    this.notification.set({type: 'success', message: `New Police Station saved successfully`});
                    this.fetchPolice();
                    this.updateModal.set(false);
                    this.loading.set(false);
                },
                error: (err: any) => {
                    this.notification.set({type: 'error', message: `Failed to Add Police Station`});
                    console.error(err);
                    this.loading.set(false);
                }
            })

        }


    }

    protected readonly faXmark = faXmark;
}
