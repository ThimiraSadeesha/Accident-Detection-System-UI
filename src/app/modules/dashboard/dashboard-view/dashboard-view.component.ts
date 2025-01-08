import { Component } from '@angular/core';
import {TestChartComponent} from "../../shared/components/test-chart/test-chart.component";

@Component({
  selector: 'app-dashboard-view',
  imports: [
    TestChartComponent

  ],
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {

}
