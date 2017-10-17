import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formsearch: FormGroup
  value = '';
  searchmess;
  productpos;
  cartpost;
  productpost
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
      ])]
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
    console.log(idproduct);
    this.authService.AddCart(idproduct).subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
      }
    });
  }
  onEnter(value: string) { this.value = value; }
  ngOnInit() {
  }

}
