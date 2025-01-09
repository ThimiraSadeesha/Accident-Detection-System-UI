import {Component, effect, inject, signal} from '@angular/core';
import {PoliceService} from "../service/police.service";
import {NgClass, TitleCasePipe} from "@angular/common";
import {PaginationComponent} from "../../../core";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-police-view',
    imports: [

        TitleCasePipe,
        PaginationComponent,
        FormsModule
    ],
    templateUrl: './police-view.component.html',
    standalone: true,
    styleUrl: './police-view.component.scss'
})
export class PoliceViewComponent {

    policeService = inject(PoliceService)
    totalItems = signal(0);
    pageNumber = signal(1);
    itemsPerPage = signal(10);

    searchParams = {
        code: '',
        name: '',
        items_per_page: 10,
        page_number: 1,
    }


    constructor() {
        effect(() => {
            this.policeService.all()
        });
        effect(() => {
            const pagination = this.policeService.stat()
            if (pagination) {
                this.itemsPerPage.set(pagination.itemsPerPage)
                this.pageNumber.set(pagination.pageNumber)
                this.totalItems.set(pagination.totalItems)
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
        this.fetchPolice();
    }

}
