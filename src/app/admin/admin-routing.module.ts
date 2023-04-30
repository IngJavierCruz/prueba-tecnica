import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormComponent } from './components/form/form.component';
import { DynamicFormResolver } from '@app/core/resolvers/dynamic-form.resolver';

const routes: Routes = [
  {
    path: 'forms',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: FormsComponent
      },
      {
        path: 'new',
        component: FormComponent
      },
      {
        path: ':id',
        component: FormComponent,
        resolve: { data: DynamicFormResolver}
      }
    ]
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
