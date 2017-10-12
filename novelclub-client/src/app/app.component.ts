import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  results: Object;
  sUrl = "http://localhost:3000/test"

  constructor(private http: HttpClient) {}
  ngOnInit():void {
    this.http.get(this.sUrl)
             .subscribe(data => {
               
             });
              
  }
  testconnect():void {
    this.http.get(this.sUrl)
            .subscribe(data => {
              this.results = data;
              console.log(this.results["results"]);
    });
  }
}
