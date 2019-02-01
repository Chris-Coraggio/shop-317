import { Component, OnInit, Injectable } from '@angular/core';
import { config } from '../config.js';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service.js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
@Injectable()
export class CartComponent implements OnInit {

  checkoutURL: String;

  constructor(private http: HttpClient, private db: AngularFirestore, private auth: AuthService) { }

  ngOnInit() {
  }

  generateCheckoutURL(){

    var validityString = config["validity-string"];

    this.db.doc(`carts/${this.auth.getUID()}`).get()
    .subscribe(docSnap => {
      this.http.post(config[config.mode].server + 'buy', docSnap.data(), {
        headers: {
  
        },
        responseType: "text"
      })
      .subscribe(data => {
        console.log("Request sent. Data: " + data.toString());
        console.log(data);
        var dataString = data.toString();
        if(dataString.startsWith(validityString)){
          dataString = dataString.substring(dataString.indexOf(validityString) + validityString.length);
          console.log(dataString);
          this.checkoutURL = dataString;
        }
      });
    })



    
    
  }

}
