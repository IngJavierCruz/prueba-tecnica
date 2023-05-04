import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// COMPONENTS
import { QuestionsComponent } from './../questions/questions.component';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlertService } from '@services/notification/alert.service';
// MODELS
import { DynamicForm } from '@models/DynamicForm';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  dynamicForm!: DynamicForm;
  @ViewChild(QuestionsComponent) questionsComponent!: QuestionsComponent;

  constructor(
    private fb: FormBuilder,
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

  addNewDynamicFormControl() {
    this.questionsComponent.initSaveDynamicFormControl();
  }

  saveChanges(event: Event) {
    event.preventDefault();
    const changesPending = this.questionsComponent.existChangesQuestionActive();
    if (!changesPending) {
      if (this.form.valid) {
        this.updateDynamicForm();
      } else {
        this.alertService.showError('Completa los campos del formulario');
      }
    } else {
      this.questionsComponent.scrollToCard();
    }
  }

  updateDynamicForm() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormService.update(this.form.value).subscribe({
        next: (data: DynamicForm) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.form.reset(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}

