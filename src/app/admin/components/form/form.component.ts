import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// COMPONENTS
import { QuestionsComponent } from './questions/questions.component';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlertService } from '@services/notification/alert.service';
// MODELS
import { DynamicForm } from '@models/DynamicForm';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  dynamicForm!: DynamicForm;
  @ViewChild(QuestionsComponent) questionsComponent!: QuestionsComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dynamicFormService: DynamicFormService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.dynamicForm = this.route.snapshot.data['data'];
    const { name, description, id } = this.dynamicForm;

    this.form = this.fb.group({
      id: [id, [Validators.required]],
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveDynamicFormControl() {
    this.questionsComponent.saveDynamicFormControl();
  }

  saveChanges(event: Event) {
    event.preventDefault();
    const changesPending = this.questionsComponent.validateChangesPending();
    if (!changesPending) {
      if (this.form.valid) {
        this.updateDynamicForm();
      } else {
        this.alertService.showError('Completa los campos del formulario');
      }
    }
  }

  updateDynamicForm() {
    this.spinner.show();
    const data: DynamicForm = {
      ...this.form.value,
    }
    this.subscription.add(
      this.dynamicFormService.update(data).subscribe({
        next: (data: DynamicForm) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.form.reset(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}
