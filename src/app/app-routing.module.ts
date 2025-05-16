import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Initial Page
  { path: 'profile', component: ProfileComponent }, // Profile Page
  {path: "login", component: LoginComponent}, // Login Page
  { path: "dashboard", component: DashboardComponent },
  { path: 'project-description/:userId', component: ProjectDescriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }