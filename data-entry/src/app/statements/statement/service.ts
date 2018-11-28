import { Injectable } from "@angular/core";
import { StatementId, Statement } from "./types";
import { DocumentReference, AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class StatementService {

  selection: StatementId;
  selectedRef: DocumentReference;

  // Persistence Layer
  private collection: AngularFirestoreCollection<Statement>;
  list: Observable<StatementId[]>;

  statementDoc: AngularFirestoreDocument<Statement>;
  statement: Observable<StatementId>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.collection = db.collection<Statement>('statements', ref => ref.orderBy('text'));
    this.list = this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Statement;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;

        return { id, docRef, ...data };
      }))
    );
  }

  add(input: string, callback: Function, ref?: DocumentReference) {
    var stm: Statement = {
      text: input,
      action: false,
      originalText: 'string',
      modified: false,
      statement_type: { name: '' },
      desc: '',
      contexts: [],
      created_at: Date.now().toString(),
      created_by: '',
      ref: ref || null,
      updated_at: Date.now().toString(),
      updated_by: '',
    };

    this.collection.add(stm).then(v => callback);
  }

  select(id: string, callback: Function) {
    this.statementDoc = this.db.doc<Statement>('statements/' + id);
    console.log(this.statementDoc);
    this.statement = this.statementDoc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Statement;
        const id = action.payload.id;
        const docRef = action.payload.ref;
        console.log(data);
        this.selection = { id, docRef, ...data };
        this.selectedRef = data.ref;
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
