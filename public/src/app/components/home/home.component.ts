import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productpost
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  AllProduct() {
    console.log("test main product");
    this.authService.getAllProducts().subscribe(data => {
        this.productpost = data.product;
        console.log(data);
    });
  }
  ngOnInit() {
    this.AllProduct();
  }

}
