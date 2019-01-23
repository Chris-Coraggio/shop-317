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
      price: product.price,
      product_name: product.name
    };
    var headers = {

    };
    this.http.post('http://127.0.0.1:3000/ping', JSON.stringify(body), {
      headers: headers
    })
    .subscribe(data => {
      var dataString = data.toString();
      if(dataString.startsWith("IT WORKED :)")){
        dataString = dataString.substring(dataString.indexOf(validityString) + validityString.length + 1);
        console.log(dataString);
        this.checkoutUrl = dataString;
      }
    });
  }

}
