import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// COMPONENTS
import { QuestionsComponent } from './../questions/questions.component';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '@services/user/user.service';
import { AlertService } from '@services/notification/alert.service';
import { FormUserService } from '@services/form-control/form-user.service';
// MODELS
import { DynamicForm } from '@models/DynamicForm';
import { TYPE_USER } from '@constants/TypeUser';
import { User } from '@models/authentication/User';
import { FormUser } from '@models/FormUser';
import { STATUS_FORM_USER } from '@constants/Status';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;
  users: any[] = [];
  dynamicForm!: DynamicForm;
  @ViewChild(QuestionsComponent) questionsComponent!: QuestionsComponent;

  constructor(
    private fb: FormBuilder,
    private dynamicFormService: DynamicFormService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private formUserService: FormUserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.dynamicForm = this.route.snapshot.data['data'];
    const { name, description, id, status } = this.dynamicForm;
    this.form = this.fb.group({
      id: [id, [Validators.required]],
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
      status: [status, [Validators.required]],
    });
    this.formClosed() && this.form.disable({ emitEvent: false});
    this.onChangesForm();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formClosed() {
    return this.dynamicForm.status !== 'open';
  }

  loadUsers() {
    this.subscription.add(
      this.userService.getByType(TYPE_USER.client)
      .subscribe((users: User[]) => {
        this.users = users;
      })
    )
  }

  onChangesForm() {
    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(x => {
        this.updateDynamicForm();
      })
    )
  }

  addNewDynamicFormControl() {
    this.questionsComponent.saveDynamicFormControl();
  }

  saveChanges(event: Event) {
    event.preventDefault();
    const invalidQuestions = this.questionsComponent.invalidQuestions();
    if (invalidQuestions === 0) {
      if (this.questionsComponent.dynamicFormControls.length > 0) {
        if (this.form.valid) {
          if (this.users.length > 0) {
            this.sendDynamicForm();
          } else {
            this.alertService.showError('No existen usuarios que puedan responder el formulario');
          }
        } else {
          this.alertService.showError('Completa los campos del formulario');
        }
      } else {
        this.alertService.showError('Registra al menos una pregunta');
      }
    } else {
      this.alertService.showError(`Completa la(s) ${invalidQuestions} pregunta(s)`);
    }
  }

  updateDynamicForm() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormService.update(this.form.value).subscribe({
        next: (data: DynamicForm) => {
          this.dynamicForm = data;
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  sendDynamicForm() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormService.send(this.form.value).subscribe({
        next: (data: DynamicForm) => {
          this.alertService.showSmallSuccess('Registro marcado para responder');
          this.dynamicForm = data;
          this.form.disable({ emitEvent: false});
          this.questionsComponent.disabledForm();
          this.sendFormUsers();
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  sendFormUsers() {
    const forms: FormUser[] = this.users.map(x => ({
      userId: x.id,
      dynamicFormId: this.dynamicForm.id!,
      status: STATUS_FORM_USER.open
    }));
    this.subscription.add(
      this.formUserService.addRange(forms).subscribe({
        next: () => {
          this.alertService.showSmallSuccess(`Registro enviado a ${this.users.length} usuarios`);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}

