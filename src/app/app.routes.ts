import {Routes} from '@angular/router';
import {
    DashboardViewComponent,
    FireViewComponent, IncidentViewComponent, InsuranceViewComponent,
    PoliceViewComponent, ReportDownoadComponent,
    VehiclesViewComponent
} from "./modules";
import {HospitalViewComponent} from "./modules/hospital";
import {LoginComponent} from "./core/components/login/login.component";
import {AuthGuard} from "./core";
import {authGuard} from "./core/guards/auth.guard";


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [authGuard],
        component: DashboardViewComponent,

    }, {
        path: 'vehicle',
        canActivate: [authGuard],
        component: VehiclesViewComponent,

    },
    {
        path: 'police',
        canActivate: [authGuard],
        component: PoliceViewComponent,

    }, {
        path: 'accident',
        canActivate: [authGuard],
        component: IncidentViewComponent,

    }, {
        path: 'fire',
        canActivate: [authGuard],
        component: FireViewComponent,

    }, {
        path: 'hospital',
        canActivate: [authGuard],
        component: HospitalViewComponent,
    },{
        path: 'reports',
        canActivate: [authGuard],
        component: ReportDownoadComponent,
    },

];
