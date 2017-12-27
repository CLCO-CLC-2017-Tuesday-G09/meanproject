import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  profiles;
  searchmess;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  getprofile(){
    this.authService.profile().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.profiles=data.users;
      }
    });
    console.log(this.profiles);
  };
  ngOnInit() {
    this.getprofile();
  }

}
