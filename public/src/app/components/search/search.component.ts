import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import {SidebarComponent} from '../../partials/sidebar/sidebar.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formsearch: FormGroup
  value = '';
  searchmess;
  cartpost;
  productpost
  catalogpost
  branchpost;
  Isbranch=false;
  Iscatalog=false;
  total;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
   }
  createForm() {
    this.formsearch = this.FormBuilder.group({
      searchname: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
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
  AddToCart(idproduct) {
    this.authService.AddCart(idproduct).subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.getCart();
        this.authService.editProduct(idproduct).subscribe(data => {
          // Check if PUT request was a success or not
          if (!data.success) {
            this.searchmess = data.message;
          } else {
            this.searchmess = data.message;
          }
        });
      }
    });
  }
  getCart() {
    this.authService.shoppingcart().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
      }
    });
  }
  onEnter(value: string) { 
    this.value = value; 
  }
  AllProduct() {
    this.authService.getAllProducts().subscribe(data => {
        this.productpost = data.product;
    });
  }
   //get list branch
   GetListBranch() {
    
        this.Isbranch =true;
        this.Iscatalog =false;
        this.authService.GetAllBranch().subscribe(data => {
          this.branchpost = data.branches; // Assign array to use in HTML
    
        });
      }
      //filter with branch
      FilterCatalog(idbranch) {
        this.authService.GetListCatalog(idbranch).subscribe(data => {
          this.catalogpost = data.catalogs;
        });
      }
       //filter with branch
       FilterProduct(idcatalog) {
        this.authService.getListProduct(idcatalog).subscribe(data => {
          console.log(data.products);
          this.productpost = data.products;
        });
      }
         //get list branch
   GetListCatalog() {
    this.Iscatalog =true;
    this.authService.GetAllCatalog().subscribe(data => {
      this.catalogpost = data.catalogs; // Assign array to use in HTML

    });
  }
    //filter with size
    FilterSize(size) {
      this.authService.filterSize(size).subscribe(data => {
        this.catalogpost = data.catalogs;
        this.branchpost = data.branches;
        this.productpost = data.products;
      });
    }
       //filter with size
       FilterColor(color) {
        this.authService.filterColor(color).subscribe(data => {
          this.catalogpost = data.catalogs;
          this.branchpost = data.branches;
          this.productpost = data.products;
        });
      }
  ngOnInit() {
    this.AllProduct();
    this.GetListBranch(); // Get all blogs on component load
    this.GetListCatalog();
  }


}
