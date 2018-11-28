import { Injectable } from "@angular/core";
import { ContextId, Context } from "./types";
import { DocumentReference, AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";


@Injectable()
export class ContextService {

  selection: ContextId;
  selectedRef: DocumentReference;

  // Persistence Layer
  private collection: AngularFirestoreCollection<Context>;
  list: Observable<ContextId[]>;

  contextDoc: AngularFirestoreDocument<Context>;
  context: Observable<ContextId>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.collection = db.collection<Context>('contexts', ref => ref.orderBy('name'));
    this.list = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Context;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;

        return { id, docRef, ...data };
      }))
    );
  }

  add(input: string, callback: Function) {
    var stm: Context = {
      name: input,
      desc: '',
      url: '',
      keywords: input.toLowerCase().split(' '),
      created_at: Date.now().toString(),
      created_by: '',
      updated_at: Date.now().toString(),
      updated_by: '',
    };

    this.collection.add(stm).then(v => callback);
  }

  select(id: string, callback: Function) {
    this.contextDoc = this.db.doc<Context>('contexts/' + id);
    console.log(this.contextDoc);
    this.context = this.contextDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Context;
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