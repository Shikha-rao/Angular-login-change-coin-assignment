import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  response:any;
  constructor(private router: Router,private commonService:CommonService,private authService:AuthService) { }

  ngOnInit() {
    this.user();
  }
  user() {
    this.commonService.userProfile(
      {
        username: this.authService.loggedUser,
      }
    ).subscribe(res => {
      if (res) {
        this.response = res;
        // this.router.navigate(['/home']);
        console.log(res)

      }

    });
  }

}
