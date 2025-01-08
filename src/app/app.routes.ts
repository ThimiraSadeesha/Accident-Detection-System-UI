import {Routes} from '@angular/router';
import {TestComponent, VehiclesViewComponent} from "./modules";



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shipments',
    pathMatch: 'full'
  },

  {
    path: 'shipments',
    component: VehiclesViewComponent,

  },

];
