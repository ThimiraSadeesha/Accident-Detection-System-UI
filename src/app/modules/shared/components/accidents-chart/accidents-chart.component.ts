import { Component } from '@angular/core';
import {ChartData, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-accidents-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './accidents-chart.component.html',
  standalone: true,
  styleUrl: './accidents-chart.component.scss'
})
export class AccidentsChartComponent {

  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81],
        backgroundColor: '#42A5F5',
      },
    ],
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public chartType: 'bar' = 'bar';

}
