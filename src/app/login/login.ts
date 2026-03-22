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
    if (this.username === 'kaif@siws73.edu' && this.password === '12345') {
      this.loginSuccess.emit();
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
