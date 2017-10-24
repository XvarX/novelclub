import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})

export class TestComponent {
    title = 'test';
    error : any;

    private sUrl = "http://localhost:3000/cookieroute/session"
    constructor(private http: HttpClient) {}
    
    onTest() {
        console.log("test-click")
        return this.http.get(this.sUrl, {withCredentials:true})
                        .subscribe(res=>{
                            console.log(res)
                        });
    }
}