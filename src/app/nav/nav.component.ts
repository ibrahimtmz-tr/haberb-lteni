import { Router } from '@angular/router';
import { FireServiceService } from './../services/fbservis.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public fbServis: FireServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  OturumKapat() {
    this.fbServis.OturumKapat().then(d => {
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    });
  }
}
