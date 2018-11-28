import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Context, ContextId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { RouterEvent, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ContextService } from './service';
import { StatementService } from 'src/app/statements/statement/service';

@Component({
  selector: 'app-context-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class ContextSelectionComponent implements OnInit {

  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public svc: ContextService,
    private stmSvc: StatementService,
  ) {
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

  select(item: ContextId) {
    if (this.svc.selectedId() === item.id) {
      return
    }
    this.svc.selection = item;
    console.log(item);
    this.stmSvc.selectedRef = this.svc.selection.docRef;
    this.router.navigate(['..', item.id], { relativeTo: this.route }).catch(err => console.log(err));
  }

  addContext() {
    if (!this.addForm.valid) { return; }
    this.svc.add(this.addForm.get('text').value, v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });
  }
}
