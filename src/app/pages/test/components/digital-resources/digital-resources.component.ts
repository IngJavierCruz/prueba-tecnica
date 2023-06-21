import { Component, OnInit, Directive } from '@angular/core';
import { CONTENT_HEADER, TABS } from './digital-resources';
import { ContentHeader } from '../../models/ContentHeader';
import { NativeTabChangeEvent } from '@shared/modules/native/tabs/tab-group/tab-group';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FilterDigitalResource } from '../../models/FilterDigitalResource';

@Component({
  selector: 'app-digital-resources',
  templateUrl: './digital-resources.component.html',
  styleUrls: ['./digital-resources.component.scss']
})
export class DigitalResourcesComponent implements OnInit {
  subscription = new Subscription();
  header: ContentHeader = CONTENT_HEADER;
  tabs = TABS;
  form!: FormGroup;
  levels: any[] = [];
  grades: any[] = [];
  signatures: any[] = [];
  filters: FilterDigitalResource = {};

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loadLevels();
    this.watchChangesLevel();
    this.watchChangesGrade();
    this.watchChangesSignature();
  }

  get controls() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.fb.group({
      level: [null],
      grade: [{value: null, disabled: true}],
      signature: [{value: null, disabled: true}],
    });
  }

  loadLevels() {
    this.levels = [
      {id: 1, description: 'test level 1'},
      {id: 2, description: 'test level 2'},
      {id: 3, description: 'test level 3'},
    ];
  }

  loadGrades() {
    setTimeout(() => {
      this.grades = [
        { id: 1, description: 'test grades'},
        { id: 2, description: 'test grades'},
        { id: 3, description: 'test grades'},
        { id: 4, description: 'test grades'},
        { id: 5, description: 'test grades'},
        { id: 6, description: 'test grades'},
      ];
    }, 1000);

  }

  loadSignatures() {
    setTimeout(() => {
      this.signatures = [
        { id: 1, description: 'test signatures'},
        { id: 2, description: 'test signatures'},
        { id: 3, description: 'test signatures'},
        { id: 4, description: 'test signatures'},
        { id: 5, description: 'test signatures'},
        { id: 6, description: 'test signatures'},
        { id: 7, description: 'test signatures'},
        { id: 8, description: 'test signatures'},
      ];
    }, 1000);

  }

  watchChangesLevel() {
    this.subscription.add(this.controls['level'].valueChanges
      .subscribe(() => {
        this.handleChangeLevel();
    }));
  }

  handleChangeLevel() {
    this.grades = [];
    const level = coerceNumberProperty(this.controls['level'].value, null);
    this.controls['grade'].setValue(null, {emitEvent: false});
    if (level) {
      this.controls['grade'].enable({emitEvent: false});
      this.loadGrades();
    } else {
      this.controls['grade'].disable({emitEvent: false});
    }
    this.handleChangeGrade();
  }

  watchChangesGrade() {
    this.subscription.add(this.controls['grade'].valueChanges
      .subscribe(() => {
        this.handleChangeGrade();
    }));
  }

  handleChangeGrade() {
    this.signatures = [];
    const grade = coerceNumberProperty(this.controls['grade'].value, null);
    this.controls['signature'].setValue(null, {emitEvent: false});
    if (grade) {
      this.controls['signature'].enable({emitEvent: false});
      this.loadSignatures();
    } else {
      this.controls['signature'].disable({emitEvent: false});
    }
    this.handleChangesSignature();
  }

  watchChangesSignature() {
    this.subscription.add(this.controls['signature'].valueChanges
      .subscribe(() => {
        this.handleChangesSignature();
    }));
  }

  handleChangesSignature() {
    this.updateFilter();
  }


  updateFilter() {
    this.filters = this.form.getRawValue();
  }

  changeTab(tab: NativeTabChangeEvent) {
    console.log("change tab", tab);
  }

  search(value: string) {
    console.log('busqueda: ', value);
  }

  clearFilters() {
    this.controls['level'].setValue(null);
  }

}


