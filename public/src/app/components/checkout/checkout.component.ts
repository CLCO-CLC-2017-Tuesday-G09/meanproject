import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  ordermessage;
  messageClass;
  cartpost;
  total
  constructor(
    private ProductService: AuthService,
  ) { }

  getCart() {
    console.log("test cart bag");
    this.ProductService.shoppingcart().subscribe(data => {
      if (data.success==false) {
        this.messageClass = 'alert alert-danger';
        this.ordermessage = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.ordermessage = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
        console.log(data);
      }
    });
  }
  
  ngOnInit() {
    this.getCart();
  }
}
