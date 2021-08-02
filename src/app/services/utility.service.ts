import { Injectable } from '@angular/core';
import { Observable, timer, of, Subject, from, ReplaySubject, BehaviorSubject} from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  niftyApiKey = 'U2FsdGVkX18k5itQROOzEotUtBOLK4apPBmljl1wphduEXLbXkP08TjP6EVNDq+QzEVSAVgWOD/WMCkV1WQZ9Uo/3JXBrjz2RVdgNQmZ5sU=';
  nifty = 'https://lb.xendbit.net/api/yasuke';
  constructor(public httpClient: HttpClient, public emailComposer: EmailComposer) { }


  getAllAssets() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', this.niftyApiKey);
    return this.httpClient.get(`${this.nifty}/list-tokens?page=1&limit=200`, {headers});
  }

  sendEmail(artworkName, tokenId) {
     this.emailComposer.isAvailable().then((available: boolean) => {
      if(available) {
        // Now we know we can send an email, calls hasClient and hasAccount
        // Not specifying an app will return true if at least one email client is configured
        const email = {
          to: 'support@niftyrow.com',
          cc: 'bolaji@xendbit.com',
          bcc: ['seguna@xendbit.com'],
          // attachments: [
          //   'file://img/logo.png',
          //   'res://icon.png',
          //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
          //   'file://README.pdf'
          // ],
          subject: 'ArtWork sold from gallery!',
          body: 'The Art Work ' + artworkName + ', With Token ID: ' + tokenId + ' has been sold, please delist from asset list.',
          isHtml: true
        };

        // Send a text message using default options
        return this.emailComposer.open(email);
      }
     });
  }

}
