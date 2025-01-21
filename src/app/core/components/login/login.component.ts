import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showError: boolean = false;
  private querySub: Subscription | undefined;

  constructor(
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private router: Router
  ) { }

  // Hardcoded credentials
  private readonly validUsername: string = 'admin';
  private readonly validPassword: string = 'admin';



  onSubmit() {
    // Check against the hardcoded credentials
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.router.navigate(['home']);
    } else {
      this.showError = true;
    }
  }
}
