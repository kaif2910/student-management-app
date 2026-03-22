import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student';
import { LoginComponent } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentComponent, LoginComponent],
  template: `
    <app-login *ngIf="!isLoggedIn" (loginSuccess)="isLoggedIn = true"></app-login>
    <app-student *ngIf="isLoggedIn"></app-student>
  `
})
export class App {
  isLoggedIn = false;
}
