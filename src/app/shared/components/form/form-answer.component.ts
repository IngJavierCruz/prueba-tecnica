import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUser } from '@models/FormUser';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { FormAnswerService } from '@services/form-control/form-answer.service';
import { FormUserService } from '@services/form-control/form-user.service';
// MODELS
import { DynamicFormControl } from '@models/DynamicFormControl';
import { FormAnswer } from '@models/FormAnswer';
import { STATUS_FORM_USER } from '@constants/Status';
import { AuthenticationConfigurationService } from '../../../core/services/authentication/authentication-configuration.service';
import { TYPE_USER } from '@constants/TypeUser';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss']
})
export class FormAnswerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  formUser!: FormUser;
  controls: DynamicFormControl[] = [];
  form!: FormGroup;
  formAnswers: FormAnswer[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private formAnswerService: FormAnswerService,
    private formUserService: FormUserService,
    private router: Router,
    private authConfigService: AuthenticationConfigurationService,
    private dynamicFormControlService: DynamicFormControlService) { }

  ngOnInit() {
    this.formUser = this.activatedRoute.snapshot.data['data'] as FormUser;
    this.form = this.fb.group({
      id: [this.formUser.id!],
      options: this.fb.array([])
    });

    this.loadOptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get formsOptions(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get formCompleted() {
    return this.formUser.status === STATUS_FORM_USER.answered;
  }

  get isAdmin() {
    return this.authConfigService.typeUser === TYPE_USER.admin;
  }

  get formDisabled() {
    return this.formCompleted || this.isAdmin;
  }

  navigateBack() {
    if (this.isAdmin) {
      this.router.navigate(['/admin/forms', this.formUser.dynamicFormId]);
    } else {
      this.router.navigate(['/app/forms']);
    }
  }

  searchAnswers(id: number) : FormAnswer[] {
    return this.formAnswers.filter(x => x.dynamicFormControlId === id);
  }

  createForm() {
    this.controls.forEach((x) => {
      const answers = this.searchAnswers(x.id!) || [];
      const typeControlOptionIdAnswer = answers.map(x => x.typeControlOptionId);
      const typeControlOptionAnswer = answers.map(x => x.typeControlOption);
      let typeControlOptionId: any[] = [null];
      let typeControlOption: any[] = [null];
      if ([3, 5].includes(x.typeControl)) {
        typeControlOptionId = [typeControlOptionIdAnswer[0], Validators.required];
      }
      if (x.typeControl === 4) {
        typeControlOptionId = [typeControlOptionIdAnswer, Validators.required];
      }
      if ([1, 2, 6].includes(x.typeControl)) {
        typeControlOption = [typeControlOptionAnswer[0], Validators.required];
      }

      const form = this.fb.group({
        dynamicFormControlId: [x.id],
        typeControlOptionId,
        typeControlOption,
        formUserId: this.formUser.id
      });
      this.formsOptions.push(form);
    });
  }

  loadOptions() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.getByParentId(this.formUser.dynamicFormId!)
        .subscribe({
          next: (x: DynamicFormControl[]) => {
            this.controls = x;
            this.loadOptionsAnswers();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
  }

  loadOptionsAnswers() {
    this.spinner.show();
    this.subscription.add(
      this.formAnswerService.getByParentId(this.formUser.id!)
        .subscribe({
          next: (x: FormAnswer[]) => {
            this.formAnswers = x;
            this.createForm();
            this.formDisabled && this.form.disable();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
  }

  saveChanges() {
    if (this.form.valid) {
      this.sendForm();
    } else {
      this.alertService.showError('Completa todas las preguntas');
      this.form.markAsDirty();
      this.form.markAllAsTouched();
    }
  }

  createData() : FormAnswer[] {
    const data: FormAnswer[] = [];
    this.formsOptions.controls.forEach((x, index) => {
      const { typeControlOptionId } = x.value;
      const { typeControl } = this.controls[index];
      if (typeControl === 4) {
        (typeControlOptionId as number[]).forEach(y => {
          data.push({... x.value, typeControlOptionId: y })
        })
      } else {
        data.push({...x.value})
      }
    });
    return data;
  }

  sendForm() {
    const data: FormUser  = {
      id: this.formUser.id,
      dynamicFormId: this.formUser.dynamicFormId,
      userId: this.formUser.userId,
      status: STATUS_FORM_USER.answered,
    };

    this.subscription.add(
      this.formUserService.update(data).subscribe({
        next: (data: FormUser) => {
          this.formUser.status = data.status;
          this.form.disable();
          this.sendAswers();
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  sendAswers() {
    const data = this.createData();
    this.subscription.add(
      this.formAnswerService.addRange(data).subscribe({
        next: () => {
          this.alertService.showSmallSuccess('Respuestas guardadas existosamente')
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}
