import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from "lodash";
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { TypeControlService } from '@services/form-control/type-control.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() dynamicFormId!: number;
  form!: FormGroup;
  typesControls: CatalogBase[] = [];
  typesControlObject:any = {};
  data!: DynamicFormControl;
  dynamicFormControls: DynamicFormControl[] = [];
  indexActive = -1;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private typeControlService: TypeControlService,
    private dynamicFormControlService: DynamicFormControlService,

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      dynamicFormId: [this.dynamicFormId, Validators.required],
      id: [null, [Validators.required]],
      label: ["", [Validators.required]],
      typeControl: [null, Validators.required],
    });

    this.loadTypesControls();
    this.loadDynamicFormControls();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get changesPending() {
    const formControlBackup = this.dynamicFormControls[this.indexActive] as DynamicFormControl;
    const formControlActive = this.form.value as DynamicFormControl;
    return !isEqual(formControlBackup, formControlActive) && this.indexActive > -1;
  }

  scrollToCard() {
    setTimeout(() => {
      document.querySelector('#card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log("ejecutado");
    }, 200);
  }

  loadDynamicFormControls() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.getByParentId(this.dynamicFormId).subscribe({
        next: (data: DynamicFormControl[]) => {
          this.dynamicFormControls = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
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

  createNewFormControl() : DynamicFormControl {
    return {
      dynamicFormId: this.dynamicFormId,
      label: '',
      typeControl: 1,
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
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    this.alertService.showError('Completa los campos del formulario');
  }

  validateChangesPending() {
    let changesPendient = true;
    if (this.indexActive > -1) {
      if (this.form.valid) {
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

  initEditDynamicFormControl(index: number) {
    if (!this.validateChangesPending()) {
      this.indexActive = index;
      this.form.reset(this.dynamicFormControls[index]);
      this.scrollToCard();
    }
  }

  saveChangesDynamicFormControl($event: Event) {
    $event.preventDefault();
    if (this.form.valid) {
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
            this.form.reset(data);
            this.dynamicFormControls.push(data);
            this.indexActive = this.dynamicFormControls.length - 1;
            this.scrollToCard();
          },
          error: (err: any) => console.log(err.message)
        }).add(() => this.spinner.hide()));
    }
  }

  updateDynamicFormControl() {
    this.spinner.show();
    const data: DynamicFormControl = this.form.value;
    this.subscription.add(
      this.dynamicFormControlService.update(data).subscribe({
        next: (data: DynamicFormControl) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.form.setValue(data);
          this.dynamicFormControls[this.indexActive] = data;
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

}
