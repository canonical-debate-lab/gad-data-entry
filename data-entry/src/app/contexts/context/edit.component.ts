import { Component, OnInit } from '@angular/core';
import { Context, ContextId } from './types';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { ContextService } from './service';
import { AdminService } from 'src/app/login/service';

@Component({
  selector: 'app-context-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class ContextEditComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public svc: ContextService,
    public admin: AdminService,
  ) {
  }


  private sub: Subscription;
  ngOnInit() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      url: ['', [Validators.required]]
    })

    this.sub = this.route.params.subscribe(params => {
      this.svc.select(params['id'], (v) => {
        this.updateForm(v);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateForm(from: ContextId) {
    this.editForm.patchValue(from);
  }

  saveContext() {
    var stm: ContextId = this.editForm.value;
    stm.keywords = this.editForm.get('name').value.toLowerCase().split(' ')
    this.svc.contextDoc.update(stm).then(_ => this.openSnackBar('Updated', '')).catch(err => this.openSnackBar('permission denied', ''));
  }

  deleteItem() {
    this.svc.contextDoc.delete().then(_ => {
      this.openSnackBar('Deleted', '');
      this.router.navigate(['../..'], { relativeTo: this.route }).catch(err => console.log(err));
    }).catch(err => this.openSnackBar('permission denied', ''));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, null, {
      duration: 400,
      horizontalPosition: 'left',
      panelClass: ['editSnackBar'],
      verticalPosition: 'bottom',
    });
  }
}
