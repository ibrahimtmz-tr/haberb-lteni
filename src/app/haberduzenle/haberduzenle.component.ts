import { Icerik } from './../models/content';
import { Sonuc } from './../models/sonuc';
import { FireServiceService } from './../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-haberduzenle',
  templateUrl: './haberduzenle.component.html',
  styleUrls: ['./haberduzenle.component.css']
})
export class HaberduzenleComponent implements OnInit {
  haberler: any;
  kategoryler: any;
  secKayit: Icerik = new Icerik();

  sonuc: Sonuc = new Sonuc();
  haber: any;
  kategori: any;
  ekleduzenle: boolean = false;
  constructor(
    public fbservis: FireServiceService
  ) { }

  ngOnInit() {
    this.HaberListele();
    this.secKayit.key = null;
  }
  HaberListele() {
    this.fbservis.HaberListe().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
      this.haberler = data;
    });
  }
  HaberSec(h: Icerik) {
    Object.assign(this.secKayit, h);
  }
  Kaydet() {
    var tarih = new Date();
    if (this.secKayit.key == null) {
      this.fbservis.HaberDuzenle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    } else {
      this.fbservis.HaberDuzenle(this.secKayit).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }
}
