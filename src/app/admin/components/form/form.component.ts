import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { DynamicFormService } from '@services/form-control/dynamic-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeControlService } from '@services/form-control/type-control.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { AlertService } from '@services/notification/alert.service';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { DynamicForm } from '@models/DynamicForm';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dynamicForm!: FormGroup;
  dynamicFormControl!: FormGroup;
  dynamicFormActive!: DynamicForm;
  typesControls: CatalogBase[] = [];
  typesControlObject:any = {};
  forms: DynamicFormControl[] = [];
  indexActive = -1;
  @ViewChild('card') card!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private typeControlService: TypeControlService,
    private dynamicFormService: DynamicFormService,
    private alertService: AlertService,
    private dynamicFormControlService: DynamicFormControlService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    this.dynamicFormActive = this.route.snapshot.data['data'];
    const { name, description, id } = this.dynamicFormActive;

    this.dynamicForm = this.fb.group({
      id: [id, [Validators.required]],
      name: [name, [Validators.required]],
      description: [description, [Validators.required]],
    });

    this.dynamicFormControl = this.fb.group({
      id: [null, [Validators.required]],
      label: ["", [Validators.required]],
      typeControl: [null, Validators.required],
      dynamicFormId: [null, Validators.required]
    });

    this.loadTypesControls();
    this.loadDynamicFormControls();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollToCard() {
    setTimeout(() => {
      document.querySelector('#card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }

  get changesPending() {
    const formControlBackup = JSON.stringify(this.forms[this.indexActive]);
    const formControlActive = JSON.stringify(this.dynamicFormControl.value);
    return formControlBackup !== formControlActive && this.indexActive > -1;
  }

  loadTypesControls() {
    this.spinner.show();
    this.subscription.add(
      this.typeControlService.getAll().subscribe({
        next: (data: CatalogBase[]) => {
          this.typesControls = data;
          this.typesControlObject = data.reduce((acc, curr) =>
            ({
              ...acc,
              [curr.id]: curr,
            }), {});
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  loadDynamicFormControls() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.getByParentId(this.dynamicFormActive.id!).subscribe({
        next: (data: DynamicFormControl[]) => {
          this.forms = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  initEditDynamicFormControl(index: number) {
    if (!this.validateChangesPending()) {
      this.indexActive = index;
      this.dynamicFormControl.reset(this.forms[index]);
      this.scrollToCard();
    }
  }

  saveChangesDynamicFormControl($event: Event) {
    $event.preventDefault();
    if (this.dynamicFormControl.valid) {
      this.updateDynamicFormControl();
    } else {
      this.alertService.showError('Completa los campos del formulario');
    }
  }

  saveDynamicFormControl() {
    const changesPendient = this.validateChangesPending();
    if (!changesPendient) {
      this.spinner.show();
      const data: DynamicFormControl = this.createNewFormControl();
      this.subscription.add(
        this.dynamicFormControlService.add(data).subscribe({
          next: (data: DynamicFormControl) => {
            this.dynamicFormControl.reset(data);
            this.forms.push(data);
            this.indexActive = this.forms.length - 1;
            this.scrollToCard();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
    }
  }

  updateDynamicFormControl() {
    this.spinner.show();
    const data: DynamicFormControl = this.dynamicFormControl.value;
    this.subscription.add(
      this.dynamicFormControlService.update(data).subscribe({
        next: (data: DynamicFormControl) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.dynamicFormControl.setValue(data);
          this.forms[this.indexActive] = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  saveChanges(event: Event) {
    event.preventDefault();
    const changesPending = this.validateChangesPending();
    if (!changesPending) {
      if (this.dynamicForm.valid) {
        this.updateDynamicForm();
      } else {
        this.alertService.showError('Completa los campos del formulario');
      }
    }
  }

  validateChangesPending() {
    let changesPendient = true;
    if (this.indexActive > -1) {
      if (this.dynamicFormControl.valid) {
        if (!this.changesPending) {
          changesPendient = false;
        } else {
          this.alertService.showError('Tienes cambios sin guardar');
          this.scrollToCard();
        }
      } else {
        this.validateDynamicFormControl();
      }
    } else {
      changesPendient = false;
    }
    return changesPendient;
  }

  createNewFormControl() : DynamicFormControl {
    return {
      label: '',
      typeControl: 1,
      dynamicFormId: this.dynamicFormActive.id!
    };
  }

  removeDynamicFormControl(item: DynamicFormControl) {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.delete(item.id!).subscribe({
        next: () => {
          this.loadDynamicFormControls();
          this.indexActive = -1;
          this.alertService.showSmallSuccess('Registro eliminado correctamente');
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  validateDynamicFormControl() {
    this.scrollToCard();
    this.dynamicFormControl.markAsDirty();
    this.dynamicFormControl.markAllAsTouched();
    this.alertService.showError('Completa los campos del formulario');
  }

  updateDynamicForm() {
    this.spinner.show();
    const data: DynamicForm = {
      ...this.dynamicForm.value,
    }
    this.subscription.add(
      this.dynamicFormService.update(data).subscribe({
        next: (data: DynamicForm) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.dynamicForm.reset(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}
