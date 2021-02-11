import { Kategori } from './../models/kategori';
import { Router } from '@angular/router';
import { FireServiceService } from './../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategoriekle',
  templateUrl: './kategoriekle.component.html',
  styleUrls: ['./kategoriekle.component.css']
})
export class KategoriekleComponent implements OnInit {
  secKategori: Kategori = new Kategori();
  constructor(
    public fbservis: FireServiceService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  Kaydet() {
    this.fbservis.KategoriEkle(this.secKategori).then(d => {
      this.router.navigate(['/admin']);
    });
  }
}
