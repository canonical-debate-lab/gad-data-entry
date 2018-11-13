import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reference, ReferenceId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';

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



  selection: any;
  search = '';
  add = '';

  ngOnInit() {
    this.addForm = this.fb.group({
      text: ['', [Validators.required]],
    })
  }

  select(item: ReferenceId) {
    if (this.selection === item.id) {
      this.selection = null;
      this.router.navigate(['/references'], { relativeTo: this.route }).catch(err => console.log(err));
      return
    }
    this.selection = item.id;
    console.log(item);
    this.router.navigate(['edit', item.id], { relativeTo: this.route }).catch(err => console.log(err));
  }



  addReference() {
    if (!this.addForm.valid) { return; }
    var stm: Reference = {
      source: this.addForm.get('text').value,
      source_type: { name: '' },
      source_date: new firebase.firestore.Timestamp(0, 0),
      source_parent: '',
      source_saved: false,
      authors: '',
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
