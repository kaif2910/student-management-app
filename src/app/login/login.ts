import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  @Output() loginSuccess = new EventEmitter<void>();

  onSubmit() {
    // For demonstration: Allow login with any non-empty input
    if (this.username && this.password) {
      this.loginSuccess.emit();
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
