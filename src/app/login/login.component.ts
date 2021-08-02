import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: any;
  assets: any;
  address: string;

  constructor(public router: Router, public utilityService: UtilityService, public storage: Storage) { }

  ngOnInit() {
    this.assets = [];
    this.getAssets();
    const isComplete = localStorage.getItem('address');
    if (isComplete !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  filterAddress(form: NgForm) {
    if (this.address !== '' && this.assets.length > 0) {
      const search = this.assets.filter(item =>
          item.issuer.toLowerCase().includes(this.address.toLowerCase())
      );
      if (search.length > 0) {
        localStorage.setItem('address', this.address);
        this.router.navigate(['/home']);
      } else {
        this.error = 'No Match Found! Try Again.';
      }
    } else {
      this.error = 'Please Try Again.';
    }
  }

  getAssets() {
    this.utilityService.getAllAssets().subscribe((data: any) => {
      const assets = data.data.items;
      console.log('this is assets', assets);
      assets.forEach(element => {
        if (element.media.length > 0 && element.hasActiveAuction === true ) {
          if (element.category === 'artwork') {
            const image = element.media.filter(x => x.mediaKey ==='image')[0];
            const mp4 = element.media.filter(x => x.mediaKey ==='mp4')[0];
            // eslint-disable-next-line max-len
            this.assets.push({name: element.name, image, video: mp4, tokenId: element.tokenId, symbol: element.symbol, owner: element.owner, issuer: element.issuer, id: element.id, dateIssued: element.dateIssued});
          }
        }
      });
    }, err => {
      console.log(err.error.data.error);
      this.error = err.error.data.error;
    },
    () => {
      console.log('complete');
    });
  }

}
