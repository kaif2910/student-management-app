import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../highlight';
import { KebabCasePipe } from '../kebab-case-pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, KebabCasePipe],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentComponent {
  // Model for the admission form
  newStudent = {
    fullName: '',
    age: null,
    course: 'Web Development',
    fees: 0
  };

  // List of registered students
  enrolledStudents = [
    { name: 'Rupesh', age: 21, date: new Date(), fees: 15000, isActive: true },
    { name: 'Salman', age: 22, date: new Date(), fees: 12500, isActive: true },
    { name: 'Alvia', age: 19, date: new Date(), fees: 10000, isActive: false }
  ];

  isFormSubmitted = false;

  enrollStudent() {
    if (this.newStudent.fullName && this.newStudent.age) {
      this.enrolledStudents.push({
        name: this.newStudent.fullName,
        age: this.newStudent.age,
        date: new Date(),
        fees: this.newStudent.fees,
        isActive: true
      });
      // Reset form
      this.newStudent = { fullName: '', age: null, course: 'Web Development', fees: 0 };
      this.isFormSubmitted = true;
      setTimeout(() => this.isFormSubmitted = false, 3000);
    }
  }

  toggleStatus(student: any) {
    student.isActive = !student.isActive;
  }
}
