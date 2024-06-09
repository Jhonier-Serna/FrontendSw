import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIdentificationComponent } from './user-identification/user-identification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFaIdentificationComponent } from './two-fa-identification/two-fa-identification.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
