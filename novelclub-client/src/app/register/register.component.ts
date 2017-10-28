import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'novelclub-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    title = 'register';
    error : any;

    private sUrl = "http://localhost:3000/api/user"
    constructor(private http: HttpClient) {}

    register(name: string, password: string):Promise<void> {
        const url = 'http://localhost:3000/api/user/register';
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