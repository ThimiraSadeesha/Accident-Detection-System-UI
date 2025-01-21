import {Component, effect, inject, signal} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LoadingService, NotificationService, PaginationComponent} from "../../../../core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {FireService} from "../../../fire/service/fire.service";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {AccidentService} from "../../service/accident.service";
import {StatusBadgeComponent} from "../../../shared/components/status-batch/status-batch.component";
import {MapComponent} from "../../../shared/components/map/map.component";

@Component({
    selector: 'app-incident-view',
    imports: [
        FaIconComponent,
        PaginationComponent,
        ReactiveFormsModule,
        TitleCasePipe,
        FormsModule,
        DatePipe,
        StatusBadgeComponent,
        MapComponent
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


}
