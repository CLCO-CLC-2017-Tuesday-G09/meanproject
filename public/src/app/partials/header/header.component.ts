import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formsearch: FormGroup
  catalogpost;
  catalogposts;
  productpost;
  cartpost;
  total;
  profiles;
  searchmess;
  menupost;
  branchpost;
  isLogin=false;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
    this.getCart();
   }

   createForm() {
    this.formsearch = this.FormBuilder.group({
      searchproduct: ['', Validators.compose([
        Validators.maxLength(50)
      ])]
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadSearchs() {
    this.GetAllCatalog(); // Add any new blogs to the page
    this.getCart();
  }
  //get list catalog
  GetAllCatalog() {
    this.authService.GetAllCatalog().subscribe(data => {
      this.catalogpost = data.catalogs; // Assign array to use in HTML

    });
  }
  AllProduct() {
    this.authService.getAllProducts().subscribe(data => {
        this.productpost = data.product;
    });
  }
  SearchProduct() {
    this.authService.SearchProduct(this.formsearch.get('searchname').value).subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.productpost = data.products;
      }
    });
  }
  SearchCatalog() {
    this.authService.SearchCatalog(this.formsearch.get('searchname').value).subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.catalogpost = data.catalogs;
      }
    });
  }
  getCart() {
    this.authService.shoppingcart().subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
      }
    });
  }
  removeAllCart() {
    this.authService.RemoveAllCart().subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.getCart();
      }
    });
  }
  removeItemCart(idProduct){
    this.authService.removeItemCart(idProduct).subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;

      } else {
        this.searchmess = data.message;
        this.getCart();
      }
    });
  }
  //
  reduceItemCart(idProduct){
    this.authService.reduceItemCart(idProduct).subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;

      } else {
        this.searchmess = data.message;
        this.getCart();
      }
    });
  }
    //
    increaseItemCart(idProduct){
      this.authService.increaseItemCart(idProduct).subscribe(data => {
        if (data.success==false) {
          this.searchmess = data.message;
        } else {
          this.searchmess = data.message;
          this.getCart();
        }
      });
    }
  // Function to get all blogs from the database
  GetListMenu() {
    // Function to GET all blogs from database
    this.authService.GetListMenu().subscribe(data => {
      this.menupost = data.menus; // Assign array to use in HTML

    });
  }
  //get list branch
  GetListBranch(idmenu:string) {

    this.authService.GetListBranch(idmenu).subscribe(data => {
      this.branchpost = data.branches; // Assign array to use in HTML

    });
  }
   //get list branch
   GetListCatalog(idbranch:string) {
    this.authService.GetListCatalog(idbranch).subscribe(data => {
      this.catalogposts = data.catalogs; // Assign array to use in HTML
    });
  }
  getprofile(){
    this.authService.profile().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.profiles=data.users;
        this.isLogin=true;
      }
    });
    console.log(this.profiles);
  };
  logout()
  {
    this.authService.logout().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.isLogin=false;
        window.location.reload();
      }
    });
  };
  ngOnInit() {
    this.AllProduct();
    this.GetAllCatalog();
    this.GetListMenu();
    this.getprofile();
  }

}
