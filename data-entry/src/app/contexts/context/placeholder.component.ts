import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from './context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-context-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class ContextPlaceholderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private svc: ContextService,
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
