import { Component } from '@angular/core';
import { StudentComponent } from './student/student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentComponent],
  template: `
    <app-student></app-student>
  `
})
export class App {}
