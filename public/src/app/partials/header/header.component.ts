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
  productpost;
  cartpost;
  total;
  searchmess;
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
    this.GetListCatalog(); // Add any new blogs to the page
    this.getCart();
  }
  //get list catalog
  GetListCatalog() {
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
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
        console.log(data);
      }
    });
  }
  ngOnInit() {
    this.GetListCatalog();
    this.getCart();
  }

}
