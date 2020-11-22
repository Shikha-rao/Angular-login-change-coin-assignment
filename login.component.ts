import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PasswordStrengthValidator } from 'src/app/password-strength.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['',[Validators.required,PasswordStrengthValidator]
       ]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
    .subscribe(success => {
      if (success) {
        this.authService.loginSucessFlag = success;
        this.router.navigate(['/change-box']);
        alert("Login successful");
      }
      else{
        this.authService.loginSucessFlag = success;
        this.router.navigate(['/home']);
         alert("Please enter valid username and password");
      }
    });
  }
  omitSpecialChar(event){
    var k;
    k= event.charCode;
    return ((k>64 && k<91) || (k>96 && k<123)|| k ==8 || k==32||(k>=48 && k<=57));
  }
}
