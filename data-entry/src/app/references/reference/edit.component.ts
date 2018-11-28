import { Component, OnInit } from '@angular/core';
import { Reference, ReferenceId, SourceType } from './types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import * as moment from 'moment';
import * as firebase from 'firebase';
import { ReferenceService } from './service';
import { Statement } from 'src/app/statements/statement/types';
import { AdminService } from 'src/app/login/service';
import { StatementService } from 'src/app/statements/statement/service';

@Component({
  selector: 'app-reference-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class ReferenceEditComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  success = false;

  source_types: SourceType[] = [
    { name: 'Scholarly Paper' },
    { name: 'News Article' },
    { name: 'Blog' },
    { name: 'Website' },
    { name: 'Tweet' },
    { name: 'Facebook Post' },
    { name: 'Debate Website Post' },
    { name: 'Other' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public svc: ReferenceService,
    private stmSvc: StatementService,
    public admin: AdminService,
  ) {
  }


  private sub: Subscription;
  ngOnInit() {
    this.editForm = this.fb.group({
      source: ['', [Validators.required]],
      source_type: ['', [Validators.required]],
      source_date: ['', [Validators.required]],
      source_parent: ['', [Validators.required]],
      source_saved: [false, []],
      authors: ['', []],
      desc: ['', []],
      details: ['', []],
    })

    this.sub = this.route.params.subscribe(params => {
      this.svc.select(params['id'], (v) => {
        this.updateForm(v);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateForm(from: ReferenceId) {
    this.editForm.patchValue(from);
    this.editForm.patchValue({ source_date: moment.unix(from.source_date.seconds).toISOString() });
    this.source_types.forEach(t => {
      if (from.source_type.name == t.name) {
        this.editForm.get('source_type').setValue(t);
      }
    });
  }

  saveReference() {
    var stm: ReferenceId = this.editForm.value;
    stm.source_date = new firebase.firestore.Timestamp(moment(this.editForm.get('source_date').value).unix(), 0);
    this.svc.referenceDoc.update(stm).then(_ => this.openSnackBar('Updated', '')).catch(err => this.openSnackBar('permission denied', ''));
  }

  newStatement() {
    if (!this.editForm.valid) { return; }
    if (this.svc.selectedId() == '') { return; }
    this.stmSvc.add('', v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    }, this.svc.selection.docRef);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, null, {
      duration: 400,
      horizontalPosition: 'left',
      panelClass: ['editSnackBar'],
      verticalPosition: 'bottom',
    });
  }

  deleteItem() {
    this.svc.referenceDoc.delete().then(_ => {
      this.openSnackBar('Deleted', '');
      this.router.navigate(['../..'], { relativeTo: this.route }).catch(err => console.log(err));
    }).catch(err => this.openSnackBar('permission denied', ''));
  }
}
