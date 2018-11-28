import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Statement, StatementId } from './types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatementService } from './service';

@Component({
  selector: 'app-statement-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StatementListComponent implements OnInit {



  addForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public svc: StatementService,
  ) {

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
    this.svc.add(this.addForm.get('text').value, v => {
      this.router.navigate(['edit', v.id], { relativeTo: this.route }).catch(err => console.log(err));
    });
  }
}
