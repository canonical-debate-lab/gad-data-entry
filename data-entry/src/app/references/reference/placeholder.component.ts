import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from './reference.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reference-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class ReferencePlaceholderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private svc: ReferenceService,
  ) { }

  sub: Subscription;

  ngOnInit() {
    this.sub = this.route.params.subscribe(routeParams => {
      this.svc.selection = routeParams.id;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
