import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Reference, ReferenceId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { RouterEvent, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ReferenceService } from './service';
import { StatementService } from 'src/app/statements/statement/service';

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
    private fb: FormBuilder,
    public svc: ReferenceService,
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

  select(item: ReferenceId) {
    if (this.svc.selectedId() === item.id) {
      this.svc.selection = null;
      this.router.navigate(['.'], { relativeTo: this.route }).catch(err => console.log(err));
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
    this.svc.add(this.addForm.get('text').value, v => {
      this.router.navigate(['../..', 'edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
      this.stmSvc.selectedRef = v;
    });
  }

  editReference(item: ReferenceId) {
    this.select(item);
    this.router.navigate(['..', 'reference', 'edit', item.id], { relativeTo: this.route })
  }
}
