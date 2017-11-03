import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'novelclub-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    title = 'register';
    error : any;

    private sUrl = "http://localhost:3000/api/users"
    constructor(private http: Http,
                private router: Router) {}
    

    register(name: string, password: string):Promise<void> {
        const url = 'http://localhost:3000/api/user/register';
        console.log(name, password);
        const body = {username: name, password:password};
        return this.http.post(url,body,{withCredentials:true})
                        .toPromise()
                        .then(res => {
                            console.log(res["result"])
                            if (res["result"] == 0) {
                                console.log(res)
                                this.router.navigate(['dashboard']);
                            }
                        })
                        .catch(this.handleError);
    }

    testsession():Promise<void> {
        const url = 'http://localhost:3000/cookieroute/session';
        const body = {};
        let options = new RequestOptions({withCredentials:true});
        return this.http.post(url,body,options)
                        .toPromise()
                        .then(res => {
                            console.log(res);
                        })
                        .catch(this.handleError);
    }

    testsession2():Promise<void> {
        const url = 'http://localhost:3000/cookieroute/session2';
        return this.http.get(url,{withCredentials:true})
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