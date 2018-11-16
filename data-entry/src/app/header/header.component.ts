import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.handleStatus();
  }

  offline: boolean = false;
  handleStatus() {
    this.db.database.ref('.info/connected').on('value', snapshot => {
      if (snapshot.val() == false) {
        this.offline = true;
        return;
      } else {
        this.offline = false;
        return;
      }
    });
  }
}
