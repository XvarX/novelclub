import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'novelclub-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor(private http: HttpClient) {}

    ngOnInit() {
        const url = 'http://localhost:3000/api/user/index';
        return this.http.get(url, {withCredentials:true})
                        .toPromise()
                        .then(res => {
                            console.log(res);
                        })
    }
}