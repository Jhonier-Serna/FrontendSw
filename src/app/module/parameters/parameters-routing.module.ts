import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { EditEventComponent } from './event/edit-event/edit-event.component';
import { DeleteEventComponent } from './event/delete-event/delete-event.component';
import { ListEventComponent } from './event/list-event/list-event.component';

const routes: Routes = [
  { path: 'create-client', component: CreateClientComponent },
  { path: 'edit-client', component: EditClientComponent },
  { path: 'delete-client', component: DeleteClientComponent },
  { path: 'list-client', component: ListClientComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'delete-event', component: DeleteEventComponent },
  { path: 'list-event', component: ListEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
