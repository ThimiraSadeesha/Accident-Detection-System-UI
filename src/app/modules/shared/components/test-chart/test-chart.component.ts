import {Component} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartData, ChartOptions} from "chart.js";

@Component({
    selector: 'app-test-chart',
    imports: [
        BaseChartDirective
    ],
    templateUrl: './test-chart.component.html',
    standalone: true,
    styleUrl: './test-chart.component.scss'
})
export class TestChartComponent {
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