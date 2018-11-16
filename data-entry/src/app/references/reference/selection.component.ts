import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Reference, ReferenceId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { RouterEvent, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ReferenceService } from './reference.service';
import { StatementService } from 'src/app/statements/statement/statement.service';

@Component({
  selector: 'app-reference-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class ReferenceSelectionComponent implements OnInit {

  private referenceCollection: AngularFirestoreCollection<Reference>;
  referenceList: Observable<ReferenceId[]>;

  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private svc: ReferenceService,
    private stmSvc: StatementService,
  ) {
    this.referenceCollection = db.collection<Reference>('references', ref => ref.orderBy('source'));
    this.referenceList = this.referenceCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reference;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;

        return { id, docRef, ...data };
      }))
    );
  }

  routeId: string;
  search = '';
  add = '';

  routeSub: Subscription;
  ngOnInit() {
    this.addForm = this.fb.group({
      text: ['', [Validators.required]],
    })

    this.routeSub = this.route.params.subscribe(routeParams => {
      this.routeId = routeParams.id;
      console.log('route param:', routeParams.id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  select(item: ReferenceId) {
    if (this.svc.selectedId() === item.id) {
      return
    }
    this.svc.selection = item;
    console.log(item);
    this.stmSvc.selectedRef = this.svc.selection.docRef;
    this.router.navigate(['..', item.id], { relativeTo: this.route }).catch(err => console.log(err));
  }



  addReference() {
    console.log('preparing new ref:', this.addForm.get('text').value);
    if (!this.addForm.valid) { return; }
    var stm: Reference = {
      source: this.addForm.get('text').value,
      source_type: { name: '' },
      source_date: new firebase.firestore.Timestamp(moment(moment.now()).unix(), 0),
      source_parent: '',
      source_saved: false,
      authors: '',
      desc: '',
      details: '',
      created_at: Date.now().toString(),
      created_by: '',
      updated_at: Date.now().toString(),
      updated_by: '',
    };
    console.log('adding ref:', stm);
    this.referenceCollection.add(stm).then(v => {
      this.router.navigate(['../..', 'edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
      this.stmSvc.selectedRef = v;
    });
  }

  editReference(item: ReferenceId) {
    this.select(item);
    this.router.navigate(['..', 'edit', item.id], { relativeTo: this.route })
  }
}
