import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listOfArtworks: any[];
  isDataAvail: boolean;
  searchResult: any;
  images: any;
  error: any;
  assets: any;

  constructor(public alertController: AlertController, public utilityService: UtilityService) { }

  ngOnInit() {
    this.assets = [];
    this.isDataAvail = false;
    this.getAssets();
  }

  async presentAlertMultipleButtons(tokenId, title) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove',
      // subHeader: 'Subtitle',
      message: 'Do you want to remove this art work?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        }, {
          text: 'Remove',
          handler: () => {
            console.log('Confirm Okay');
            // this.shareViaEmail(tokenId, title);
          }
        }
      ]
    });

    await alert.present();
  }

   public filterList(searchbar) {
        this.listOfArtworks = [];
        if (searchbar.detail.value !== '') {
            this.isDataAvail = true;
            const artworkSearch = this.assets.filter(item =>
            // tslint:disable-next-line:max-line-length
                 item.symbol.toLowerCase().includes(searchbar.detail.value.toLowerCase())
            );
            this.listOfArtworks.push(artworkSearch);
            this.searchResult = this.listOfArtworks[0];
        } else {
            this.isDataAvail = false;
        }
    }

    getAssets() {
      this.utilityService.getAllAssets().subscribe((data: any) => {
        const assets = data.data.items;
        assets.forEach(element => {
          // eslint-disable-next-line max-len
          // if (element.media.length > 0 && element.hasActiveAuction === true &&  element.issuer === '0x138eA87255926B6FA5F428079F5266A6693B8738' ) {
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
