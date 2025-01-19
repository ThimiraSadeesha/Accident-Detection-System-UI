import {Component, effect, inject} from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {ChartService} from "../../../dashboard/service/chart.service";
import {IncidentChartDTO} from "../../../dashboard/interface/chat.entity";

@Component({
  selector: 'app-accident-servirty-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './accident-servirty-chart.component.html',
  standalone: true,
  styleUrl: './accident-servirty-chart.component.scss'
})
export class AccidentServirtyChartComponent {

  chartService = inject(ChartService)
  chartDTOS: IncidentChartDTO[] = []

  constructor() {
    effect(() => {
      this.chartDTOS.pop();
      const details = this.chartService.active();
      if (details) {
        this.chartDTOS.push(details);
        const high = parseInt(details.highIncidents, 10);
        const medium = parseInt(details.mediumIncidents, 10);
        const low = parseInt(details.lowIncidents, 10);
        this.doughnutChartData = {
          labels: ['High', 'Low', 'Medium'],
          datasets: [
            {
              data: [high, low,medium],
              backgroundColor: ['#ef0537', '#e3e86f', '#FF6384'],
            },
          ],
        };
      }
    });
  }



  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['High', 'Low', 'Medium'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#ef0537', '#e3e86f', '#FF6384'],
      },
    ],
  };

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };

  public chartType: 'doughnut' = 'doughnut';

}
