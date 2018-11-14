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
import { ReferenceService } from './reference.service';

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

  private referenceDoc: AngularFirestoreDocument<Reference>;
  reference: Observable<ReferenceId>;

  editForm: FormGroup;
  loading = false;
  success = false;

  source_types: SourceType[] = [
    { name: 'Example Type' },
  ];

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private svc: ReferenceService,
  ) {
  }


  private sub: Subscription;
  private routeSub: Subscription;
  ngOnInit() {
    this.editForm = this.fb.group({
      source: ['', [Validators.required]],
      source_type: ['', [Validators.required]],
      source_date: ['', [Validators.required]],
      source_parent: ['', [Validators.required]],
      source_saved: [false, []],
      authors: ['', []],
    })

    this.routeSub = this.route.params.subscribe(routeParams => {
      this.svc.selection = routeParams.id;
      console.log('route param:', routeParams.id);
    });

    this.sub = this.route.params.subscribe(params => {
      console.log(params['id']);
      this.referenceDoc = this.db.doc<Reference>('references/' + params['id']);
      console.log(this.referenceDoc);
      this.reference = this.referenceDoc.snapshotChanges().pipe(
        map(action => {
          const data = action.payload.data() as Reference;
          const id = action.payload.id;
          const docRef = action.payload.ref;
          console.log(data);
          this.updateForm({ id, docRef, ...data });

          return { id, docRef, ...data };
        })
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.routeSub.unsubscribe();
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
    this.referenceDoc.update(stm);
    this.openSnackBar('Updated', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, null, {
      duration: 400,
      horizontalPosition: 'left',
      panelClass: ['editSnackBar'],
      verticalPosition: 'bottom',
    });
  }
}
