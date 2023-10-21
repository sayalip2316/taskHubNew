import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddProjectComponent} from "./create-project/create-project.component";
import {TaskFormComponent} from "./task-form/task-form.component"
import {AdminRoleGuard} from "./admin-role.guard";
import {ProjectManagerRoleGuard} from "./project-manager-role.guard";
import {ProfileComponent} from "./profile/profile.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'not-authorized', component:NotAuthorizedComponent},
  {path:'', redirectTo:'/not-authorized',pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'create-project', component: AddProjectComponent,canActivate: [AdminRoleGuard] },
  {path:'task-form', component:TaskFormComponent, canActivate: [ProjectManagerRoleGuard]},
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
