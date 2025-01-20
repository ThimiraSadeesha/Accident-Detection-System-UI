import {Component, effect, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DeviceService} from "../../shared/services/device.service";
import {EmployeeService} from "../../shared/services/employee.service";
import {ChartService} from "../../dashboard/service/chart.service";

@Component({
    selector: 'app-report-downoad',
    imports: [
        FormsModule,
    ],
    templateUrl: './report-downoad.component.html',
    standalone: true,
    styleUrl: './report-downoad.component.scss'
})
export class ReportDownoadComponent {


    deviceService = inject(DeviceService)
    employeeService = inject(EmployeeService)
    chartService = inject(ChartService)


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
        startDate: '',
        endDate: '',
    }

    constructor() {
        effect(() => {
            const device = this.deviceService.all()
            const user = this.employeeService.all()
        });
    }

    generateReport() {
        console.log(this.searchParams)
    }


}
