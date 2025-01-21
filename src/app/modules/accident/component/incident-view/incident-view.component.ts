import {Component, effect, inject, signal} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LoadingService, NotificationService, PaginationComponent} from "../../../../core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {FireService} from "../../../fire/service/fire.service";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {AccidentService} from "../../service/accident.service";
import {StatusBadgeComponent} from "../../../shared/components/status-batch/status-batch.component";

@Component({
    selector: 'app-incident-view',
    imports: [
        FaIconComponent,
        PaginationComponent,
        ReactiveFormsModule,
        TitleCasePipe,
        FormsModule,
        DatePipe,
        StatusBadgeComponent
    ],
    templateUrl: './incident-view.component.html',
    standalone: true,
    styleUrl: './incident-view.component.scss'
})
export class IncidentViewComponent {

    notification = inject(NotificationService);
    loading = inject(LoadingService);
    accidentService = inject(AccidentService);
    totalItems = signal(0);
    pageNumber = signal(1);
    itemsPerPage = signal(10);
    fireId = signal(0)
    createModal = signal(false)
    updateModal = signal(false)


    searchParams = {
        user_name: '',
        nic: '',
        contact_number: '',
        city: '',
        district: '',
        province: '',
        vehicle_number: '',
        device_id: '',
        severity: '',
        incident_status: '',
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
            const pagination = this.accidentService.stat()
            if (pagination) {
                this.itemsPerPage.set(pagination.itemsPerPage)
                this.pageNumber.set(pagination.pageNumber)
                this.totalItems.set(pagination.totalItems)
            }
        });
        effect(() => {
            const test = this.accidentService.all()

        });
    }

    fetchPolice() {
        this.accidentService.find(this.searchParams).subscribe(
        )
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
            ...this.searchParams,
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
            this.accidentService.getById(String(policeId)).subscribe()
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
        // this.loading.set(true);
        // if (this.fireId() > 0) {
        //     this.accidentService.update(this.fireId(), this.fireDTO).subscribe(
        //         {
        //             next: (response) => {
        //                 this.notification.set({
        //                     type: 'success',
        //                     message: `Failed to update this Fire Station successfully`
        //                 });
        //                 this.fetchPolice();
        //                 this.loading.set(false);
        //
        //             },
        //             error: (err: any) => {
        //                 this.notification.set({type: 'error', message: `Failed to Update Fire Station`});
        //                 console.error(err);
        //                 this.loading.set(false);
        //             }
        //         }
        //     )
        // } else {
        //     this.fireService.create(this.fireDTO).subscribe({
        //         next: (response) => {
        //             this.notification.set({type: 'success', message: `New Fire Station saved successfully`});
        //             // this.fetchPolice();
        //             this.loading.set(false);
        //         },
        //         error: (err: any) => {
        //             this.notification.set({type: 'error', message: `Failed to Add Fire Station`});
        //             console.error(err);
        //             this.loading.set(false);
        //         }
        //     })
        //
        // }


    }


    protected readonly faXmark = faXmark;
}
