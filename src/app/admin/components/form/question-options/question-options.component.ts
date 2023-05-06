import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// LIBS
import { Subscription } from 'rxjs/internal/Subscription';
// SERVICES
import { AlertService } from '@services/notification/alert.service';
import { DynamicFormControlService } from '@services/form-control/dynamic-form-control.service';
import { NgxSpinnerService } from 'ngx-spinner';
// MODELS
import { CatalogBase } from '@models/TypeControl';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.scss']
})
export class QuestionOptionsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      dynamicFormControlId: ['', Validators.required],
      id: ['', [Validators.required]],
      label: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
