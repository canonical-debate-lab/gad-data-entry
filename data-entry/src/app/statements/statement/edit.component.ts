import { Component, OnInit } from '@angular/core';
import { Statement, StatementId, Context, ContextId } from './types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material';
import { StatementService } from './statement.service';

@Component({
  selector: 'app-statement-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class StatementEditComponent implements OnInit {

  private statementDoc: AngularFirestoreDocument<Statement>;
  statement: Observable<StatementId>;

  private contextCollection: AngularFirestoreCollection<Context>;
  contextList: Observable<ContextId[]>;
  contexts: ContextId[] = [];
  private ctxObservable: Observable<any>;
  private ctxSub: Subscription;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  editForm: FormGroup;
  loading = false;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public svc: StatementService,
  ) {
    // hmm it wont let me scroll away from way your cursor is XD
  }


  private sub: any;
  ngOnInit() {
    this.editForm = this.fb.group({
      text: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      ref: new FormControl({ value: '', disabled: true }, Validators.required),
      action: [false, []],
    })

    this.sub = this.route.params.subscribe(params => {
      this.statementDoc = this.db.doc<Statement>('statements/' + params['id']);
      console.log(this.statementDoc);
      this.statement = this.statementDoc.snapshotChanges().pipe(
        map(action => {
          const data = action.payload.data() as Statement;
          const id = action.payload.id;
          const docRef = action.payload.ref;
          console.log(data);
          this.svc.selection = { id, docRef, ...data };
          this.svc.selectedRef = data.ref;
          this.updateForm({ id, docRef, ...data });
          return { id, docRef, ...data };
        })
      );
    });

    this.ctxSub = this.statementDoc.valueChanges().pipe(
      switchMap(value => {
        this.contexts = [];
        return this.db.collection<Context>('contexts').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Context;
            const id = a.payload.doc.id;
            const docRef = a.payload.doc.ref;

            for (const ctx of value.contexts) {
              if (ctx.id === id) {
                this.pushUnique({ id, docRef, ...data });
                return { id, docRef, ...data };
              }
            }
          }))
        )
      }
      )
    ).subscribe();
  }

  pushUnique(ctx: ContextId) {
    for (const c of this.contexts) {
      if (ctx.id === c.id) {
        return;
      }
    }
    this.contexts.push(ctx);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.ctxSub.unsubscribe();
  }

  updateForm(from: StatementId) {
    this.editForm.patchValue(from);
    this.editForm.patchValue({ ref: from.ref.path });
  }

  saveStatement() {
    var stm: StatementId = this.editForm.value;
    stm.contexts = this.contexts.map(value => { console.log(value); return value.docRef; });
    stm.ref = this.svc.selectedRef;
    this.statementDoc.update(stm);
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

  selectReference() {
    this.router.navigate(['reference', 'select', this.svc.selectedRefId()], { relativeTo: this.route })
  }

  editReference() {
    this.router.navigate(['reference', 'edit', this.svc.selectedRef.id], { relativeTo: this.route })
  }

}
