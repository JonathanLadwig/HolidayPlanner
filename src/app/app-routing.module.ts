import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateNewActivityFormComponent } from './components/create-new-activity-form/create-new-activity-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditActivityFormComponent } from './components/edit-activity-form/edit-activity-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-activity', component: CreateNewActivityFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-activity', component: EditActivityFormComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'landing' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
