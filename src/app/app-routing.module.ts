import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './tasks/list/list.component';
import { authGuard } from './auth/auth.guard';
import { UpsertComponent } from './tasks/upsert/upsert.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: ListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
