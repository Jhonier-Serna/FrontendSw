import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFaIdentificationComponent } from './two-fa-identification/two-fa-identification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { EventsTableComponent } from './events/events-table/events-table.component';
import { DeleteScheduleEventComponent } from '../../public/delete-schedule-event/delete-schedule-event.component';
import { ViewEventsComponent } from '../../public/view-events/view-events.component';

const routes: Routes = [
  {
    path: 'user-identification',
    component: UserIdentificationComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'two-fa-identification',
    component: TwoFaIdentificationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'eventsTable',
    component: EventsTableComponent,
  },
  {
    path: 'delete-schedule-event',
    component: DeleteScheduleEventComponent,
  },
  {
    path: 'view-events',
    component: ViewEventsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
