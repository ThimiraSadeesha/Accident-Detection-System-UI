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



    public doughnutChartData: ChartData<'doughnut'> = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [120, 150, 180],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    public doughnutChartOptions: ChartOptions = {
        responsive: true,
    };

    public chartType: 'doughnut' = 'doughnut';


    // public radarChartData: ChartData<'radar'> = {
    //     labels: ['Quality', 'Speed', 'Accuracy', 'Reliability'],
    //     datasets: [
    //         {
    //             label: 'Team A',
    //             data: [65, 75, 70, 80],
    //             borderColor: '#42A5F5',
    //             backgroundColor: 'rgba(66,165,245,0.4)',
    //         },
    //         {
    //             label: 'Team B',
    //             data: [54, 65, 60, 70],
    //             borderColor: '#FFA726',
    //             backgroundColor: 'rgba(255,167,38,0.4)',
    //         },
    //     ],
    // };
    //
    // public radarChartOptions: ChartOptions = {
    //     responsive: true,
    // };
    //
    // public chartType: 'radar' = 'radar';






    // public pieChartData: ChartData<'pie'> = {
    //     labels: ['Product A', 'Product B', 'Product C'],
    //     datasets: [
    //         {
    //             data: [300, 500, 100],
    //             backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
    //         },
    //     ],
    // };
    //
    // public pieChartOptions: ChartOptions = {
    //     responsive: true,
    // };
    //
    // public chartType: 'pie' = 'pie';

    // public barChartData: ChartData<'line'> = {
    //     labels: ['January', 'February', 'March', 'April'],
    //     datasets: [
    //         {
    //             label: 'Sales',
    //             data: [65, 59, 80, 81],
    //             backgroundColor: '#42A5F5',
    //         },
    //     ],
    // };
    //
    // public barChartOptions: ChartOptions = {
    //     responsive: true,
    // };
    //
    // public chartType: 'line' = 'line';
}