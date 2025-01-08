import {Routes} from '@angular/router';
import {TestComponent} from "./modules";



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shipments',
    pathMatch: 'full'
  },
  {
    path: 'purchase-orders',
    component: TestComponent,

  },

];
