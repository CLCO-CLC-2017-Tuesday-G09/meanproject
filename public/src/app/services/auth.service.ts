import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }

  registerUser(user) {
    return this.http.post(this.domain + '/users/register', user).map(res => res.json());
  }

  loginUser(user) {
    return this.http.post(this.domain + '/users/login', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/users/checkUsername/' + username).map(res => res.json());
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/users/checkEmail/' + email).map(res => res.json());
  }

  //menu
  GetListMenu() {
    return this.http.get(this.domain + '/menus/listmenu').map(res => res.json());
  }
  GetOneMenu(id) {
    return this.http.get(this.domain + '/menus/findmenu/'+id).map(res => res.json());
  }
  createMenu(menu) {
    return this.http.post(this.domain + '/menus/createmenu', menu).map(res => res.json());
  }
  deleteMenu(id) {
    console.log(id);
    return this.http.delete(this.domain + '/menus/deletemenu/'+ id).map(res => res.json());
  }
  //branch
  GetListBranch(idmenu) {
    return this.http.get(this.domain + '/branchs/listbranch/'+idmenu).map(res => res.json());
  }
  createBranch(idmenu,branch) {
    return this.http.post(this.domain + '/branchs/addbranch/' +idmenu, branch).map(res => res.json());
  }
  deleteBranch(id) {
    console.log(id);
    return this.http.delete(this.domain + '/branchs/deletebranch/'+ id).map(res => res.json());
  }
  //catalog
  GetListCatalog(idbranch) {
    return this.http.get(this.domain + '/catalogs/listcatalog/'+idbranch).map(res => res.json());
  }
  createCatalog(idbranch,catalog) {
    return this.http.post(this.domain + '/catalogs/addCatalog/' +idbranch, catalog).map(res => res.json());
  }
  
  deleteCatalog(id) {
    console.log(id);
    return this.http.delete(this.domain + '/catalogs/deletecatalog/'+ id).map(res => res.json());
  }
}
