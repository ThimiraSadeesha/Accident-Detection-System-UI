import {Routes} from '@angular/router';
import {
    DashboardViewComponent,
    FireViewComponent, IncidentViewComponent, InsuranceViewComponent,
    PoliceViewComponent, ReportDownoadComponent,
    VehiclesViewComponent
} from "./modules";
import {HospitalViewComponent} from "./modules/hospital";
import {LoginComponent} from "./core/components/login/login.component";


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,

    },
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
        component: IncidentViewComponent,

    }, {
        path: 'fire',
        component: FireViewComponent,

    }, {
        path: 'hospital',
        component: HospitalViewComponent,
    },{
        path: 'reports',
        component: ReportDownoadComponent,
    },

];
