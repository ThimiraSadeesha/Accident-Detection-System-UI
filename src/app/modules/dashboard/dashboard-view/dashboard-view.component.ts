import { Component } from '@angular/core';
import {TestChartComponent} from "../../shared/components/test-chart/test-chart.component";
import {MapComponent} from "../../shared/components/map/map.component";

@Component({
  selector: 'app-dashboard-view',
  imports: [
    TestChartComponent,
    MapComponent

  ],
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {

}
