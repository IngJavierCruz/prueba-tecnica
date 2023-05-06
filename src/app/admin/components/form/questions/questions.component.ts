import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { TypeControlService } from '@services/form-control/type-control.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';
import { DynamicFormControl } from '@models/DynamicFormControl';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() dynamicFormId!: number;
  typesControls: CatalogBase[] = [];
  typesControlObject: any = {};
  dynamicFormControls: DynamicFormControl[] = [];
  indexActive = -1;
  @ViewChild(QuestionComponent) questionComponent!: QuestionComponent;

  constructor(
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private typeControlService: TypeControlService,
    private dynamicFormControlService: DynamicFormControlService,
  ) { }

  ngOnInit() {
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

  removeDynamicFormControl() {
    this.loadDynamicFormControls();
    this.indexActive = -1;
  }

  initEditDynamicFormControl(index: number) {
    if (!this.questionComponent?.validateChangesPending()) {
      this.indexActive = index;
    }
    this.scrollToCard();
  }

  initSaveDynamicFormControl() {
    if (!this.questionComponent?.validateChangesPending()) {
      this.saveDynamicFormControl();
    } else {
      this.scrollToCard();
    }
  }

  saveDynamicFormControl() {
    this.spinner.show();
    const data: DynamicFormControl = this.createNewFormControl();
    this.subscription.add(
      this.dynamicFormControlService.add(data).subscribe({
        next: (data: DynamicFormControl) => {
          this.dynamicFormControls.push(data);
          this.indexActive = this.dynamicFormControls.length - 1;
          this.scrollToCard();
        },
        error: (err: any) => console.log(err.message)
      }).add(() => this.spinner.hide()));
  }

  updateDynamicFormControl(item: DynamicFormControl) {
    this.dynamicFormControls[this.indexActive] = item;
  }

  existChangesQuestionActive() {
    return !!this.questionComponent?.validateChangesPending();
  }
}
