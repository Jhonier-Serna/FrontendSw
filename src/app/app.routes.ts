import { Routes } from '@angular/router';
import { CreateEventComponent } from './module/parameters/event/create-event/create-event.component';
import { HomeComponent } from './public/home/home.component';
import { RouteNotFoundComponent } from './public/errors/route-not-found/route-not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent ,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./module/security/security.module').then((m) => m.SecurityModule),
  },
     {
      path: "**",
      component: RouteNotFoundComponent,
   }
];
