import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services";
import {Subscription} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HospitalService} from "../../../modules/hospital/service/hospital.service";
import {ChartService} from "../../../modules/dashboard/service/chart.service";

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

  chartService = inject(ChartService)

  searchParams = {
    username: '',
    password: '',
  }

  password: string = '';
  showError: boolean = false;

  constructor(
      private router: Router
  ) { }

  onSubmit() {
    if (!this.searchParams.username || !this.searchParams.password) {
      this.showError = true;
      console.error('Username and password are required');
      return;
    }

    const credentials = {
      username: this.searchParams.username,
      password: this.searchParams.password,
    };

    this.chartService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('authData', JSON.stringify(response));

        this.router.navigate(['home']);
      },
      error: (err: any) => {
        console.error(err);
        this.showError = true;
      },
    });
  }





}
