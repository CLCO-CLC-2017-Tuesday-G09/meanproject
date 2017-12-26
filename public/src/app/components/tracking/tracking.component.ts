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
  orderstatus=false;
  messageClass;
  message;
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
  GetListOrder(idorder) {
    console.log(idorder);
    let resulf=[];
    this.authService.getDetailOrder(idorder).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.orderstatus=false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.orderstatus=true;
        this.orderpost = data.orders;
        for(let key in data.products)
        {
          resulf.push({value: data.products[key]});
        }
        this.products = resulf;
      }
    });
  }
  ngOnInit() {
  }

}
