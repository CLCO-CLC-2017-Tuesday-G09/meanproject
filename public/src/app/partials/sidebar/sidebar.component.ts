import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loadingMenus = false;
  meupost;
  branchpost;
  catalogpost;
  Isbranch=false;
  Iscatalog=false;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadSearchs() {
    this.loadingMenus = true; // Used to lock button
    this.GetListBranch();
    this.GetListCatalog(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingMenus = false; // Release button lock after four seconds
    }, 4000);
  }
  //get list branch
  GetListBranch() {

    this.Isbranch =true;
    this.Iscatalog =false;
    this.authService.GetAllBranch().subscribe(data => {
      this.branchpost = data.branches; // Assign array to use in HTML

    });
  }
   //get list branch
   GetListCatalog() {
    this.Iscatalog =true;
    this.authService.GetAllCatalog().subscribe(data => {
      this.catalogpost = data.catalogs; // Assign array to use in HTML

    });
  }
  ngOnInit() {
   this.GetListBranch(); // Get all blogs on component load
   this.GetListCatalog();
  }

}
