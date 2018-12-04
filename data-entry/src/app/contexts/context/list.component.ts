import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Context, ContextId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { RouterEvent, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ContextService } from './context.service';

@Component({
  selector: 'app-context-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ContextListComponent implements OnInit {

  private contextCollection: AngularFirestoreCollection<Context>;
  contextList: Observable<ContextId[]>;

  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private svc: ContextService,
  ) {
    this.contextCollection = db.collection<Context>('data/prod/contexts', ref => ref.orderBy('name'));
    this.contextList = this.contextCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Context;
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

  select(item: ContextId) {
    if (this.svc.selectedId() === item.id) {
      this.svc.selection = null;
      this.router.navigate(['.'], { relativeTo: this.route }).catch(err => console.log(err));
      return
    }
    this.svc.selection = item;
    console.log(item);
    this.router.navigate(['edit', item.id], { relativeTo: this.route }).catch(err => console.log(err));
  }



  addContext() {
    if (!this.addForm.valid) { return; }
    var stm: Context = {
      name: this.addForm.get('text').value,
      desc: '',
      url: '',
      keywords: this.addForm.get('text').value.toLowerCase().split(' '),
      created_at: Date.now().toString(),
      created_by: '',
      updated_at: Date.now().toString(),
      updated_by: '',
    };

    this.contextCollection.add(stm).then(v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });

  }
}
