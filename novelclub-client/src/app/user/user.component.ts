import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent {
    title = 'user';
    error : any;

    private sUrl = "http://localhost:3000/user"
    constructor(private http: HttpClient) {}

    onLogin():Promise<void> {
        console.log("click")
        const url = "http://localhost:3000/users/login";
        const body = {name:'user', password:'123456'}
        return this.http.post(url, body)
                        .toPromise()
                        .then(res => {
                            console.log(res);
                        });
    }
    onTest():Promise<void> {
        console.log("test-click")
        const url = "http://localhost:3000/users/gettest";
        return this.http.get(url)
                        .toPromise()
                        .then(res=>{
                            console.log(res)
                        });
    }
}