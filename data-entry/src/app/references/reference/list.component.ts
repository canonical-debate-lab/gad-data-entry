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

@Component({
  selector: 'app-reference-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReferenceListComponent implements OnInit {

  private referenceCollection: AngularFirestoreCollection<Reference>;
  referenceList: Observable<ReferenceId[]>;

  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private svc: ReferenceService,
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

  search = '';
  add = '';

  routeSub: Subscription;
  ngOnInit() {
    this.addForm = this.fb.group({
      text: ['', [Validators.required]],
    })
  }

  ngOnDestroy(): void {
  }

  select(item: ReferenceId) {
    if (this.svc.selectedId() === item.id) {
      this.svc.selection = null;
      this.router.navigate(['.'], { relativeTo: this.route }).catch(err => console.log(err));
      return
    }
    this.svc.selection = item;
    console.log(item);
    this.router.navigate(['edit', item.id], { relativeTo: this.route }).catch(err => console.log(err));
  }



  addReference() {
    if (!this.addForm.valid) { return; }
    var stm: Reference = {
      source: this.addForm.get('text').value,
      source_type: { name: '' },
      source_date: new firebase.firestore.Timestamp(moment(moment.now()).unix(), 0),
      source_parent: '',
      source_saved: false,
      authors: '',
      title: '',
      desc: '',
      details: '',
      created_at: Date.now().toString(),
      created_by: '',
      updated_at: Date.now().toString(),
      updated_by: '',
    };

    this.referenceCollection.add(stm).then(v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });

  }
}
