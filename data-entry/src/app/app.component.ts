import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-entry';
  links = [
    { title: "References", path: ["/references"] },
    { title: "Statements", path: ["/statements"] },
    { title: "Contexts", path: ["/contexts"] },
  ];
  activeLink = this.links[0];
  background = '';

  constructor(
    public router: Router,
  ) { }
}
