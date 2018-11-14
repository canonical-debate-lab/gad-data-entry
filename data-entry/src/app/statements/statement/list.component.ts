import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Statement, StatementId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatementService } from './statement.service';

@Component({
  selector: 'app-statement-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StatementListComponent implements OnInit {

  private statementCollection: AngularFirestoreCollection<Statement>;
  statementList: Observable<StatementId[]>;

  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private svc: StatementService,
  ) {
    this.statementCollection = db.collection<Statement>('statements', ref => ref.orderBy('text'));
    this.statementList = this.statementCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Statement;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;

        return { id, docRef, ...data };
      }))
    );
  }

  search = '';
  add = '';

  ngOnInit() {
    this.addForm = this.fb.group({
      text: ['', [Validators.required]],
    })
  }

  select(item: StatementId) {
    if (this.svc.selectedId() === item.id) {
      this.svc.selection = null;
      return
    }
    this.svc.selection = item;
    console.log(item);
  }



  addStatement() {
    if (!this.addForm.valid) { return; }
    var stm: Statement = {
      text: this.addForm.get('text').value,
      desc: '',
      contexts: [],
      created_at: Date.now().toString(),
      created_by: '',
      ref: null,
      updated_at: Date.now().toString(),
      updated_by: '',
    };

    this.statementCollection.add(stm).then(v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });
  }
}
