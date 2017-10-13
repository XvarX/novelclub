import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    title = 'login';

    private sUrl = "http://localhost:3000/login"
    constructor(private http: HttpClient) {}

    register(name: string, password: string):Promise<void> {
        const url = 'http://localhost:3000/login/register';
        console.log(name, password);
        const body = {name: name, password:password};
        return this.http.post(url, body)
                        .toPromise()
                        .then(res => {
                            console.log(res);
                        })
                        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}