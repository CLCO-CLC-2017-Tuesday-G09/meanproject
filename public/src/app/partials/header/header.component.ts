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
  searchmess;
  menupost;
  branchpost;
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
      searchname: ['', Validators.compose([
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
    console.log("test cart bag");
    this.authService.shoppingcart().subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;
        console.log(""+this.searchmess);
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
        console.log(data);
      }
    });
  }
  removeAllCart() {
    console.log("test remove all cart");
    this.authService.RemoveAllCart().subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;
        console.log(""+this.searchmess);
      } else {
        this.searchmess = data.message;
        this.getCart();
      }
    });
  }
  removeItemCart(idProduct){
    console.log("test remove item  cart");
    this.authService.removeItemCart(idProduct).subscribe(data => {
      if (data.success==false) {
        this.searchmess = data.message;
        console.log(""+this.searchmess);
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
      console.log(data.menus);
    });
  }
  //get list branch
  GetListBranch(idmenu:string) {
    console.log(idmenu);
    this.authService.GetListBranch(idmenu).subscribe(data => {
      this.branchpost = data.branches; // Assign array to use in HTML
      console.log(data.branches);
    });
  }
   //get list branch
   GetListCatalog(idbranch:string) {
    this.authService.GetListCatalog(idbranch).subscribe(data => {
      this.catalogposts = data.catalogs; // Assign array to use in HTML
    });
  }
  ngOnInit() {
    this.GetAllCatalog();
    this.GetListMenu();
  }

}
