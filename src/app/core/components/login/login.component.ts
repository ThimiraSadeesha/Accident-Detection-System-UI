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



  onSubmit() {
    const userCredentials = {
      username: this.username,
      password: this.password,
    };

  }
  triggerError() {
    this.showError = false;
    setTimeout(() => this.showError = true, 0);
  }
  ngOnDestroy() {
    if (this.querySub)
      this.querySub.unsubscribe();
  }
}
