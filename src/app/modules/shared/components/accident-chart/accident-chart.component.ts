import {Component, effect, inject} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartService} from "../../../dashboard/service/chart.service";
import {IncidentChartDTO, MonthIncidentDTO} from "../../../dashboard/interface/chat.entity";

@Component({
  selector: 'app-accident-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './accident-chart.component.html',
  standalone: true,
  styleUrl: './accident-chart.component.scss'
})
export class AccidentChartComponent {

    chartService = inject(ChartService)
    chartDTOS: IncidentChartDTO[] = []

    constructor() {
        effect(() => {
            this.chartDTOS.pop();
            const details = this.chartService.active();
            if (details) {
                this.chartDTOS.push(details);
                const openIncidents = parseInt(details.openIncidents, 10);
                const closedIncidents = parseInt(details.closedIncidents, 10);
                const activeIncidents = parseInt(details.activeIncidents, 10);
                this.pieChartData = {
                    labels: ['Pending Incidents', 'In progress Incidents', 'Completed Incidents'],
                    datasets: [
                        {
                            data: [openIncidents, activeIncidents,closedIncidents],
                            backgroundColor: ['#42A5F5', '#FFA726','#66BB6A'],
                        },
                    ],
                };
            }
        });
    }

  public pieChartData: ChartData<'pie'> = {
      labels: ['Pending', 'In progress', 'Completed'],
      datasets: [
          {
              data: [],
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          },
      ],
  };

  public pieChartOptions: ChartOptions = {
      responsive: true,
  };

  public chartType: 'pie' = 'pie';


}
