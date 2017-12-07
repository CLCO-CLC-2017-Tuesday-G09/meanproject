import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderpost
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  // Function to get all blogs from the database
  GetListOrder() {
    // Function to GET all blogs from database
    this.authService.listorder().subscribe(data => {
      this.orderpost = data.orders; // Assign array to use in HTML
      console.log(data);
    });
  }
  ngOnInit() {
    this.GetListOrder();
  }

}
