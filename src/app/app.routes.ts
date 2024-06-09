import { Routes } from '@angular/router';
import { CreateEventComponent } from './module/parameters/event/create-event/create-event.component';

export const routes: Routes = [
  //   {
  //     path: 'home',
  //     component: ,
  //   },
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
  //   {
  //     path: "**",
  //     component: PageNotFoundComponent,
  //   }
];
