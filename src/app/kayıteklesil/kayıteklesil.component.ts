import { FireServiceService } from './../services/fbservis.service';
import { Icerik } from './../models/content';
import { Sonuc } from './../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-kayıteklesil',
  templateUrl: './kayıteklesil.component.html',
  styleUrls: ['./kayıteklesil.component.css']
})
export class KayıteklesilComponent implements OnInit {
  haberler: any;
  kategoryler: any;
  secKayit: Icerik = new Icerik();

  sonuc: Sonuc = new Sonuc();
  haber: any;
  kategori: any;
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

  KayitSil(haber: Icerik) {
    this.fbservis.HaberSil(haber.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }
}


