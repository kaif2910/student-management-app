import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
  date: Date;
  fees: number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private initialStudents: Student[] = [
    { id: 1, name: 'Shaikh Kaif', age: 21, course: 'Web Development', date: new Date(), fees: 15000, isActive: true },
    { id: 2, name: 'Alice Smith', age: 23, course: 'Data Science', date: new Date(Date.now() - 86400000), fees: 25000, isActive: true },
    { id: 3, name: 'Bob Johnson', age: 22, course: 'Cloud Computing', date: new Date(Date.now() - 172800000), fees: 20000, isActive: false },
    { id: 4, name: 'Charlie Brown', age: 20, course: 'UI/UX Design', date: new Date(Date.now() - 259200000), fees: 18000, isActive: true }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.initialStudents);
  students$ = this.studentsSubject.asObservable();

  constructor() {}

  // READ: Fetch all students with simulated delay
  getStudents(): Observable<Student[]> {
    return this.students$.pipe(delay(10));
  }

  // CREATE: Add new student
  addStudent(studentData: Omit<Student, 'id' | 'date'>): Observable<Student> {
    const newStudent: Student = {
      ...studentData,
      id: Math.max(0, ...this.studentsSubject.value.map(s => s.id)) + 1,
      date: new Date()
    };
    
    const updatedList = [newStudent, ...this.studentsSubject.value];
    this.studentsSubject.next(updatedList);
    
    return of(newStudent).pipe(delay(10));
  }

  // UPDATE: Toggle status
  toggleStudentStatus(id: number): Observable<boolean> {
    const updatedList = this.studentsSubject.value.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    this.studentsSubject.next(updatedList);
    return of(true).pipe(delay(0));
  }

  // DELETE: Remove student (additional feature)
  deleteStudent(id: number): Observable<boolean> {
    const updatedList = this.studentsSubject.value.filter(s => s.id !== id);
    this.studentsSubject.next(updatedList);
    return of(true).pipe(delay(0));
  }
}
