import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from '../product';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config.js';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {}

  ngOnInit() {
    console.log(this.data);
  }

  quantity: String = "1";
  quantityNumberCopy = 1;
  checkoutUrl: String;

  incrementQuantity(){
    this.quantityNumberCopy++;
    this.quantity = this.quantityNumberCopy.toString();
  }

  decrementQuantity(){
    if(this.quantityNumberCopy > 0){
      this.quantityNumberCopy--;
      this.quantity = this.quantityNumberCopy.toString();
    }
  }

  addToCart(){
    var product = this.data.product;
    var validityString = config["validity-string"];
    var body = {
      quantity: this.quantity,
      cost: parseFloat(product.price) * 100,
      product_name: product.name
    };
    var headers = {

    };
    this.http.post('http://localhost:3000/buy', body, {
      headers: headers,
      responseType: "text"
    })
    .subscribe(data => {
      console.log("Request sent. Data: " + data.toString());
      console.log(data);
      var dataString = data.toString();
      if(dataString.startsWith(validityString)){
        dataString = dataString.substring(dataString.indexOf(validityString) + validityString.length);
        console.log(dataString);
        this.checkoutUrl = dataString;
      }
    });
  }

}
