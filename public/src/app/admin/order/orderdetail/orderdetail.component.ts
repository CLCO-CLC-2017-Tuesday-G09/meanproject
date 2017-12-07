import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  orderpost;
  currentUrl;
  messageClass;
  message;
  loadingOrders = false;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  GetListOrder() {
    // Function to GET all blogs from database
    const idorder = this.currentUrl.idorder;
    console.log(idorder)
    this.authService.getDetailOrder(idorder).subscribe(data => {
      this.orderpost = data.orders;
      console.log(this.orderpost.name);
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.GetListOrder();
  }

}
