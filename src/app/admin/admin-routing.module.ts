import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'forms',
    component: AdminComponent,
  },
  {
    path: '',
    redirectTo: 'forms',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'forms'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
