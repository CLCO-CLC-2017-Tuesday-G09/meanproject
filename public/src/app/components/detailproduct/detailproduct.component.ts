import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  messageClass;
  message;
  loading: boolean;
  product: any;
  currentUrl: { [key: string]: any; };
  idproduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private location: Location,
    private header: HeaderComponent
  ) { }
  AddToCart(idproduct) {
    this.AuthService.AddCart(idproduct).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        window.location.reload();
      }
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.AuthService.getSingleProduct(this.currentUrl.id).subscribe(data => {
        this.product = data.product; // Save blog object for use in HTML
    });
  }

}
