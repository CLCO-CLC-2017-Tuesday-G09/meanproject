import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-adcatalog',
  templateUrl: './adcatalog.component.html',
  styleUrls: ['./adcatalog.component.css']
})
export class AdcatalogComponent implements OnInit {
  formcatalog:FormGroup
  currentUrl;
  messageClass;
  message;
  loadingCatalogs = false;
  catalogpost;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.createForm();
  }
  createForm() {
    this.formcatalog = this.FormBuilder.group({
      catalogName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])]
    })
  }

  onCreateCatalogsubmit() {
    const idbranch=this.currentUrl.idbranch;
    console.log(idbranch);
    const catalog = {
      catalogName: this.formcatalog.get('catalogName').value
    }
    this.authService.createCatalog(idbranch,catalog).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListCatalog();
      }
    });
  }
  onDeleteCatalogsubmit(id:string) {
    console.log(id);
    this.authService.deleteCatalog(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListCatalog();
      }
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadMenus() {
    this.loadingCatalogs = true; // Used to lock button
    this.GetListCatalog();
    setTimeout(() => {
      this.loadingCatalogs = false; // Release button lock after four seconds
    }, 4000);
  }
  GetListCatalog() {
    // Function to GET all blogs from database
    const idbranch = this.currentUrl.idbranch;
    console.log(idbranch)
    this.authService.GetListCatalog(idbranch).subscribe(data => {
      this.catalogpost = data.catalogs;
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.GetListCatalog();
  }

}
