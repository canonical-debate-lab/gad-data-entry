import { Injectable } from "@angular/core";
import { ReferenceId, Reference } from "./types";
import { DocumentReference, AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

import * as firebase from 'firebase';
import * as moment from 'moment';

@Injectable()
export class ReferenceService {

  selection: ReferenceId;
  selectedRef: DocumentReference;

  // Persistence Layer
  private collection: AngularFirestoreCollection<Reference>;
  list: Observable<ReferenceId[]>;

  referenceDoc: AngularFirestoreDocument<Reference>;
  reference: Observable<ReferenceId>;


  constructor(
    private db: AngularFirestore,
  ) {
    this.collection = db.collection<Reference>('references', ref => ref.orderBy('source'));
    this.list = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reference;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;

        return { id, docRef, ...data };
      }))
    );
  }

  add(input: string, callback: Function) {
    var stm: Reference = {
      source: input,
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

    this.collection.add(stm).then(v => callback);
  }

  select(id: string, callback: Function) {
    this.referenceDoc = this.db.doc<Reference>('references/' + id);
    console.log(this.referenceDoc);
    this.reference = this.referenceDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Reference;
        const id = action.payload.id;
        const docRef = action.payload.ref;
        console.log(data);
        this.selection = { id, docRef, ...data };
        callback({ id, docRef, ...data });

        return { id, docRef, ...data };
      })
    );
  }

  selectedId(): string {
    if (!this.selection) {
      return '';
    }
    return this.selection.id;
  }

  selectedRefId(): string {
    if (!this.selectedRef) {
      return '';
    }
    return this.selectedRef.id;
  }
}
