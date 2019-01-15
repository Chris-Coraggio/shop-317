import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from '../product';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
  }

}
