import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  message: string;
  loading: boolean;
  product: any;
  messageClass: string;
  currentUrl: { [key: string]: any; };
  idproduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.AuthService.getSingleProduct(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Blog not found.'; // Set error message
      } else {
        this.message = 'Blog not found.'; // Set error message
        this.idproduct = data.product._id; // Save blog object for use in HTML
        this.product = data.product; // Save blog object for use in HTML
       console.log(this.product)
      }
    });
  }

}
