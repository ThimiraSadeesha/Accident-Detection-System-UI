import {Component} from '@angular/core';
import {faAddressBook, faBoxes, faChartBar, faHistory, faMoneyBill, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../../../core";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-report-downoad',
    imports: [

        FormsModule,
        FaIconComponent,


    ],
    templateUrl: './report-downoad.component.html',
    standalone: true,
    styleUrl: './report-downoad.component.scss'
})
export class ReportDownoadComponent {


    protected readonly faChartBar = faChartBar;
    protected readonly faBoxes = faUsers;
    protected readonly faUsers = faAddressBook;
    protected readonly faMoneyBill = faHistory;
}
