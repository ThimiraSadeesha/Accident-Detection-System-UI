import {Component, effect, inject} from '@angular/core';
import {TestChartComponent} from "../../shared/components/test-chart/test-chart.component";
import {MapComponent} from "../../shared/components/map/map.component";
import {LoadingService} from "../../../core";
import {ChartService} from "../service/chart.service";
import {AccidentBarChartComponent} from "../../shared/components/accident-bar-chart/accident-bar-chart.component";
import {AccidentChartComponent} from "../../shared/components/accident-chart/accident-chart.component";
import {
    AccidentServirtyChartComponent
} from "../../shared/components/accident-servirty-chart/accident-servirty-chart.component";

@Component({
    selector: 'app-dashboard-view',
    imports: [
        AccidentBarChartComponent,
        AccidentChartComponent,
        AccidentServirtyChartComponent,

    ],
    templateUrl: './dashboard-view.component.html',
    standalone: true,
    styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {

    chartService = inject(ChartService)

    constructor() {
        effect(() => {

        });
    }
}
