import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FireServiceService } from './../services/fbservis.service';
import { Icerik } from './../models/content';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icerik',
  templateUrl: './icerik.component.html',
  styleUrls: ['./icerik.component.css']
})
export class IcerikComponent implements OnInit {
  adsoyad: string = "";
  uid: string = "";
  haberler: Icerik[] = [];
  constructor(
    public fbservis: FireServiceService,
    public Router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fbservis.HaberFiltrele(params["kategoriId"]).snapshotChanges().pipe(
        map((changes: any[]) =>
          changes.map((c: { payload: { key: any; val: () => any; }; }) =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe((data: any) => {
        this.haberler = data;
      });
    })
    var user = JSON.parse(localStorage.getItem("user") || '{}');
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.HaberleriListele();
  }
  HaberleriListele() {
    this.fbservis.HaberListe().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
      this.haberler = data;
    });
  }
}
