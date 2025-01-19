import {Component, effect, inject} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartService} from "../../../dashboard/service/chart.service";
import {IncidentChartDTO, MonthIncidentDTO} from "../../../dashboard/interface/chat.entity";

@Component({
    selector: 'app-accident-bar-chart',
    imports: [
        BaseChartDirective
    ],
    templateUrl: './accident-bar-chart.component.html',
    standalone: true,
    styleUrl: './accident-bar-chart.component.scss'
})
export class AccidentBarChartComponent {

    chartService = inject(ChartService)
    chartDTOS: IncidentChartDTO[] = []
    mothsDTO: MonthIncidentDTO[] = []

    constructor() {
        effect(() => {
            this.chartDTOS.pop();
            this.mothsDTO.pop();
            const details = this.chartService.active();
            if (details) {
                this.chartDTOS.push(details);
                this.mothsDTO.push(...details.data);
                const incidentCounts = this.mothsDTO.map(detail => detail.incidentHistoryCount);
                this.barChartData = {
                    labels: this.mothsDTO.map(detail => detail.month),
                    datasets: [
                        {
                            label: 'Incidents',
                            data: incidentCounts,
                            backgroundColor: '#dd0e0e',
                        },
                    ],
                };
            }
        });
    }

    public barChartData: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Incidents',
                data: [],
                backgroundColor: '#dd0e0e',
            },
        ],
    };

    public barChartOptions: ChartOptions = {
        responsive: true,
    };

    public chartType: 'line' = 'line';
}
