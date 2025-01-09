import {Routes} from '@angular/router';
import {
    AccidentViewComponent, DashboardViewComponent,
    FireViewComponent, InsuranceViewComponent,
    PoliceViewComponent,
    VehiclesViewComponent
} from "./modules";
import {HospitalViewComponent} from "./modules/hospital";


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },


    {
        path: 'home',
        component: DashboardViewComponent,

    }, {
        path: 'vehicle',
        component: VehiclesViewComponent,

    },
    {
        path: 'police',
        component: PoliceViewComponent,

    }, {
        path: 'accident',
        component: AccidentViewComponent,

    }, {
        path: 'fire',
        component: FireViewComponent,

    }, {
        path: 'hospital',
        component: HospitalViewComponent,
    },{
        path: 'insurance',
        component: InsuranceViewComponent,
    },

];
