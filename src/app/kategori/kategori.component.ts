import { Kategori } from './../models/kategori';
import { map } from 'rxjs/operators';
import { FireServiceService } from './../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler: Kategori[] = []
  constructor(
    public fbservis: FireServiceService,
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele() {
    this.fbservis.KategoriListe().snapshotChanges().pipe(
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
