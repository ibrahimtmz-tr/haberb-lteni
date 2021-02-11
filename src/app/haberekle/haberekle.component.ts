import { map } from 'rxjs/operators';
import { Kategori } from './../models/kategori';
import { FireServiceService } from './../services/fbservis.service';
import { Router } from '@angular/router';
import { Icerik } from './../models/content';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-haberekle',
  templateUrl: './haberekle.component.html',
  styleUrls: ['./haberekle.component.css']
})
export class HaberekleComponent implements OnInit {
  secIcerik: Icerik = new Icerik();
  kategoriler: Kategori[] = [];
  constructor(
    public fbServis: FireServiceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  Kaydet() {
    this.fbServis.HaberEkle(this.secIcerik).then(d => {
      this.router.navigate(['/admin']);
    });
  }
  KategoriListele() {
    this.fbServis.KategoriListe().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
      this.kategoriler = data;
    });
  }
}
