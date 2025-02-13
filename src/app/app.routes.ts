import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { PersonalGrievanceComponent } from './student/personal-grievance/personal-grievance.component';
import { AnonymousGrievanceComponent } from './student/anonymous-grievance/anonymous-grievance.component';
import { FacultyDashboardComponent } from './faculty/faculty-dashboard/faculty-dashboard.component';
import { FacultyGrievancesComponent } from './faculty/faculty-grievances/faculty-grievances.component';
import { SuperAdminDashboardComponent } from './super-admin/super-admin-dashboard/super-admin-dashboard.component';
import { ManageGrievancesComponent } from './super-admin/manage-grievances/manage-grievances.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  
  // Student Dashboard Routes
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    children: [
      { path: 'personal-grievance', component: PersonalGrievanceComponent },
      { path: 'anonymous-grievance', component: AnonymousGrievanceComponent },
    ]
  },

  // Faculty Dashboard Route
  { path: 'faculty-dashboard', component: FacultyDashboardComponent },

  // Super Admin Dashboard Routes
  {
    path: 'super-admin-dashboard',
    component: SuperAdminDashboardComponent,
    children: [
      { path: 'manage-grievances', component: ManageGrievancesComponent },
    ]
  },

  // Wildcard Route (Handles unknown paths)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
