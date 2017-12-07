import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  orderpost;
  formsearch: FormGroup
  products;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { this.createForm(); }
  createForm() {
    this.formsearch = this.FormBuilder.group({
      checkorder: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
    });
  }
  // Function to get all blogs from the database
  GetListOrder() {
    // Function to GET all blogs from database
    this.authService.listorder().subscribe(data => {
      this.orderpost = data.orders; // Assign array to use in HTML
      console.log(this.orderpost);
    });
  }
  ngOnInit() {
    this.GetListOrder();
  }

}
