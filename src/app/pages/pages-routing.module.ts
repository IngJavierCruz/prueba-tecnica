import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormUserResolver } from '@app/core/resolvers/form-user.resolver';
import { FormAnswerComponent } from '@shared/components/form/form-answer.component';

const routes: Routes = [
  {
    path: 'forms',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: FormsComponent
      },
      {
        path: ':id',
        component: FormAnswerComponent,
        resolve: { data: FormUserResolver},
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
