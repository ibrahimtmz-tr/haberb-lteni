import { StServiceService } from './../services/stService.service';
import { Resim } from './../models/resim';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resim',
  templateUrl: './resim.component.html',
  styleUrls: ['./resim.component.css']
})
export class ResimComponent implements OnInit {
  resimler: Resim[];
  files: FileList;
  constructor(
    public stServis: StServiceService
  ) { }

  ngOnInit() {
    this.ResimListele();
  }
  ResimListele() {
    this.stServis.ResimListele().snapshotChanges().subscribe(data => {
      this.resimler = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.resimler.push(y as Resim);
      });
    });
  }
  ResimSec(e) {
    this.files = e.target.files;
  }
  ResimYukle() {
    var resim = new Resim();
    resim.file = this.files[0];
    this.stServis.ResimYükleStorage(resim).subscribe(
      p => {
        console.log("Dosya Yüklendi");
      }, err => {
        console.log("Dosya Yüklenmesi Başarısız");
      }
    );
  }
  resimSil(resim: Resim) {
    this.stServis.ResimSil(resim);
  }
}
