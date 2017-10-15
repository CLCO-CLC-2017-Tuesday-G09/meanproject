import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class MenuService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http
  ) { }

  GetListMenu() {
    return this.http.get(this.domain + '/menus/listmenu').map(res => res.json());
  }
}
