import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';

@Component({
    selector: 'novelclub-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor(private http: Http) {}

    show: boolean = false;

    ngOnInit() {
        const url = 'http://localhost:3000/api/user/index';
        return this.http.get(url, {withCredentials:true})
                        .toPromise()
                        .then(res => {
                            console.log("进到这里了1")
                            console.log(res.json())
                            if (res.json()["code"] == 0) {
                                console.log("进到这里了")
                                this.show = true
                            }
                        })
    }

    upload(title: string, universe: string, context: string):Promise<void> {
        const url = 'http://localhost:3000/api/article/upload';
        const body = {title: title, universe:universe, context:context};
        console.log(body)
        return this.http.post(url,body,{withCredentials:true})
                        .toPromise()
                        .then(res => {
                            console.log(res.json()["code"])
                        })
    }
}