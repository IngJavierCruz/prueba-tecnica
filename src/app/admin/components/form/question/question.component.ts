import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// LIBS
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { TypeControlOptionService } from '@services/form-control/type-control-option.service';
import { TypeControlOption } from '@models/TypeControlOption';
import { take } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() data!: DynamicFormControl;
  @Input() typesControls: CatalogBase[] = [];
  @Input() typesControlObject: any = {};
  @Output() remove = new EventEmitter<DynamicFormControl>();
  @Output() create = new EventEmitter();
  @Output() changes = new EventEmitter<DynamicFormControl>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private dynamicFormControlService: DynamicFormControlService,
    private typeControlOptionService: TypeControlOptionService,

  ) { }

  ngOnInit() {
    this.createForm();
    this.onChangesTypeControl();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    const { id, label, typeControl, dynamicFormId } = this.data;
    this.form = this.fb.group({
      dynamicFormId: [dynamicFormId, Validators.required],
      id: [id, [Validators.required]],
      label: [label, [Validators.required]],
      typeControl: [typeControl, Validators.required],
      options: this.fb.array([])
    });


  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get typeControlId() {
    return this.form.controls['typeControl']?.value as number || null;
  }

  get isTypeControlList() {
    return [3, 4, 5].includes(this.typeControlId as any);
  }

  get changesPending() {
    const formControlActive = this.form.value as DynamicFormControl;
    return !isEqual(this.data, formControlActive);
  }

  delete() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.delete(this.data.id!).subscribe({
        next: () => {
          this.alertService.showSmallSuccess('Registro eliminado correctamente');
          this.remove.emit()
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  validateForm() {
    this.form.markAsDirty();
    this.form.markAllAsTouched();
    this.alertService.showError('Completa los campos del formulario');
  }

  validateChangesPending() {
    let changesPendient = true;
    if (this.form.valid) {
      if (!this.changesPending) {
        changesPendient = false;
      } else {
        this.alertService.showError('Tienes cambios sin guardar');
      }
    } else {
      this.validateForm();
    }
    return changesPendient;
  }

  saveChanges($event: Event) {
    $event.preventDefault();
    if (this.form.valid) {
      this.update();
    } else {
      this.alertService.showError('Completa los campos del formulario');
    }
  }

  update() {
    this.spinner.show();
    this.subscription.add(
      this.dynamicFormControlService.update(this.form.value).subscribe({
        next: (data: DynamicFormControl) => {
          this.alertService.showSmallSuccess('Registro actualizado correctamente');
          this.form.setValue(data);
          this.changes.emit(data);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  addNew() {
    this.create.emit();
  }

  loadTypeControlOptions() {
    const { typesControlsOptions } = this.data;
    (typesControlsOptions || []).forEach(x => {
      const formOption = this.createFormTypeControlOption(x);
      this.options.push(formOption);
    });
  }

  deleteAllTypeControlOptions() {
    const typesControlsOptions = (this.options.value as TypeControlOption[]);
    this.options.clear();
    (typesControlsOptions || []).forEach(x => {
      if (x.id) {
        this.deleteOptionComplete(x);
        const formOption = this.createFormTypeControlOption(x);
        this.options.push(formOption);
      }
    });
  }

  // loadTypeControlOptions() {
  //   this.spinner.show();
  //   this.subscription.add(
  //     this.typeControlOptionService.getByParentId(this.data.id!).subscribe({
  //       next: (data: TypeControlOption[]) => {
  //         data.forEach(x => {
  //           const newFormOption = this.addNewFormOption(x);
  //           this.options.push(newFormOption);
  //         });
  //       },
  //       error: (err: any) => console.log(err.message)
  //     }).add(() => this.spinner.hide()));
  // }

  onChangesTypeControl() {
    this.subscription.add(
      this.form.controls['typeControl'].valueChanges.subscribe(x => {
        if (this.isTypeControlList) {
          this.options.clear();
          this.loadTypeControlOptions();
          if (this.options.length === 0) {
            const [optionForm, option] = this.createDefaultOption();
            this.options.push(optionForm);
            this.addOption(option as TypeControlOption, 0);
          }
          const [optionFormDefault] = this.createDefaultOption();
          this.options.push(optionFormDefault);
        } else {
          this.deleteAllTypeControlOptions();
        }
      }));
  }

  createDefaultOption() {
    const option: TypeControlOption = this.createTypeControlOption();
    const optionForm = this.createFormTypeControlOption(option);
    return [optionForm, option];
  }

  createFormTypeControlOption(item: TypeControlOption) {
    return this.fb.group({
      dynamicFormControlId: [item.dynamicFormControlId, Validators.required],
      id: [item.id, [Validators.required]],
      label: [item.label, [Validators.required]],
      typeControlId: [item.typeControlId, Validators.required],
    });
  }

  createTypeControlOption(): TypeControlOption {
    return {
      dynamicFormControlId: this.data.id!,
      typeControlId: this.typeControlId!,
      label: 'Opción ' + (this.options.length + 1),
    };
  }

  addOption(data: TypeControlOption, index: number) {
    this.spinner.show();
    this.subscription.add(
      this.typeControlOptionService.add(data).subscribe({
        next: (data: TypeControlOption) => {
          const newFormOption = this.createFormTypeControlOption(data);
          this.options.setControl(index, newFormOption);
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  deleteOption(item: TypeControlOption, index: number, $event: Event) {
    $event.stopPropagation();
    this.spinner.show();
    this.subscription.add(
      this.typeControlOptionService.delete(item.id!).subscribe({
        next: () => {
          this.options.removeAt(index);
          const countOptions = this.options.length;
          if (countOptions === 1) {
            this.options.removeAt(0);
            const [formOption] = this.createDefaultOption();
            this.options.push(formOption);
          } else {
            this.options.removeAt(countOptions-1);
            const [formOption] = this.createDefaultOption();
            this.options.setControl(countOptions-1, formOption)
          }
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  deleteOptionComplete(item: TypeControlOption) {
    this.spinner.show();
    this.subscription.add(
      this.typeControlOptionService.delete(item.id!).subscribe({
        next: () => {
          
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  addNewOptionDefault(index: number) {
    const option = this.options.at(index).value as TypeControlOption;
    if (this.options.length === index + 1) {
      const [optionForm] = this.createDefaultOption();
      this.options.push(optionForm);
    }
    if (!option.id) {
      this.addOption(option, index);
    }
  }


}
