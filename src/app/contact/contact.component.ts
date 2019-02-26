import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
@Injectable()
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() { 
  }

  name: string;
  email: string;
  message: string;

  contact(){ 
    console.log("Contacting");
    const allInfo = {
      name: this.name,
      email: this.email,
      message: this.message
    }

    this.http.post(config[config.mode].server + 'contact', allInfo, {
      headers: {

      },
      responseType: "text"
    })
    .subscribe(data => {
      console.log(data);
      alert("Email sent successfully!");
    });
  }

}
