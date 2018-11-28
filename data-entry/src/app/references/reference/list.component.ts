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
    private fb: FormBuilder,
    public svc: ReferenceService,
  ) {
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
    this.svc.add(this.addForm.get('text').value, v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });
  }
}
