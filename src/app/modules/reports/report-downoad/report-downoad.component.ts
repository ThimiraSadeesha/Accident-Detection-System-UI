import {Component, effect, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DeviceService} from "../../shared/services/device.service";
import {EmployeeService} from "../../shared/services/employee.service";
import {ChartService} from "../../dashboard/service/chart.service";
import {SRI_LANKA_REGIONS} from "../interface/sri-lanka-regions";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {LoadingService} from "../../../core";
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";



@Component({
    selector: 'app-report-downoad',
    imports: [
        FormsModule,
        NgForOf,
        NgClass,
        FaIconComponent,
    ],
    templateUrl: './report-downoad.component.html',
    standalone: true,
    styleUrl: './report-downoad.component.scss'
})
export class ReportDownoadComponent {


    deviceService = inject(DeviceService)
    employeeService = inject(EmployeeService)
    chartService = inject(ChartService)
    loading = inject(LoadingService)


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
        this.loading.set(true);
        this.searchParams = {
            ...this.searchParams,
            district: this.selectedDistrict,
            province: this.selectedProvince,
        }
        this.chartService.reportGenerate(this.searchParams, true).subscribe(
            {
                next: (response) => {
                    console.log(response)
                    this.exportToExcel(response.data)
                    this.loading.set(false);

                }, error: (err: any) => {

                    console.error(err);
                    this.loading.set(false);
                }
            }
        )
    }

    isError(): boolean {
        return !this.searchParams.startDate || !this.searchParams.endDate;
    }


    exportToExcel(data: any[]): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = {
            Sheets: {data: worksheet},
            SheetNames: ['data']
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        const date = new Date().toISOString().split('T')[0];
        const fileName = `Incident_Report_${date}.xlsx`;
        this.saveAsExcelFile(excelBuffer, fileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const blob = new Blob([buffer], {
            type: 'application/octet-stream'
        });

        saveAs(blob, `${fileName}.xlsx`);
    }


    regions = SRI_LANKA_REGIONS;
    selectedProvince = '';
    selectedDistrict = '';
    districts: string[] = [];


    onProvinceChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        const province = select.value;
        this.selectedProvince = province;
        this.selectedDistrict = '';
        const region = this.regions.find(r => r.province === province);
        this.districts = region ? region.districts : [];
    }


    protected readonly faDownload = faDownload;
}
