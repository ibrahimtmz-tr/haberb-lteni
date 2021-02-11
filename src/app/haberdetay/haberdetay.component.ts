import { map } from 'rxjs/operators';
import { FireServiceService } from './../services/fbservis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Icerik } from './../models/content';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-haberdetay',
  templateUrl: './haberdetay.component.html',
  styleUrls: ['./haberdetay.component.css']
})
export class HaberdetayComponent implements OnInit {
  key: string = "";
  secHaber: Icerik = new Icerik();
  urunler: Icerik[] = [];



  constructor(
    public route: ActivatedRoute,
    public fbservis: FireServiceService,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.UrunGetir();
      this.UrunleriListele();
    })
  }
  UrunleriListele() {
    this.fbservis.HaberListe().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
      this.urunler = data;
    });
  }
  UrunGetir() {
    this.fbservis.UrunByKey(this.key).snapshotChanges().subscribe(data => {
      const y = { ...data.payload.toJSON(), key: this.key };
      this.secHaber = (y as Icerik);
    });
  }
}