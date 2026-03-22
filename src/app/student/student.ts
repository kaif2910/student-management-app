import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { HighlightDirective } from '../highlight';
import { KebabCasePipe } from '../kebab-case-pipe';
import { StudentService, Student } from './student.service';

interface Department {
  id: number;
  name: string;
  hod: string;
  icon: string;
  studentCount: number;
  color: string;
}

interface LanguageContent {
  title: string;
  subtitle: string;
  newAdmission: string;
  fullName: string;
  age: string;
  course: string;
  fees: string;
  register: string;
  dashboard: string;
  searchPlaceholder: string;
  active: string;
  inactive: string;
  deactivate: string;
  activate: string;
  noStudents: string;
  loading: string;
  navDashboard: string;
  navRegister: string;
  navDepartments: string;
  deptHod: string;
  deptStudents: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, KebabCasePipe],
  templateUrl: './student.html',
  styleUrl: './student.css',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.8) translateY(20px)' }),
          stagger('60ms', [
            animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, filter: 'blur(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, filter: 'blur(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, filter: 'blur(10px)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class StudentComponent implements OnInit {
  // FORM MODEL
  newStudent = {
    fullName: '',
    age: null,
    course: 'Web Development',
    fees: 0
  };

  // DATA
  allStudents: Student[] = [];
  filteredStudents: Student[] = [];
  
  departments: Department[] = [
    { id: 1, name: 'Computer Science', hod: 'Dr. Alan Turing', icon: '💻', studentCount: 120, color: '#6366f1' },
    { id: 2, name: 'Data Science', hod: 'Dr. Grace Hopper', icon: '📊', studentCount: 85, color: '#10b981' },
    { id: 3, name: 'Cloud Computing', hod: 'Dr. James Gosling', icon: '☁️', studentCount: 64, color: '#0ea5e9' },
    { id: 4, name: 'UI/UX Design', hod: 'Prof. Don Norman', icon: '🎨', studentCount: 42, color: '#ec4899' }
  ];

  // STATE
  isLoading = true;
  searchQuery = '';
  notificationMessage = '';
  isError = false;
  activeView: 'dashboard' | 'register' | 'departments' = 'dashboard';
  isSidebarOpen = true;

  // I18N
  availableLangs: ('en' | 'hi' | 'mr' | 'ta')[] = ['en', 'hi', 'mr', 'ta'];
  currentLang: 'en' | 'hi' | 'mr' | 'ta' = 'en';

  translations: Record<string, LanguageContent> = {
    en: {
      title: 'EduPortal',
      subtitle: 'Siws University System',
      newAdmission: 'Admission Portal',
      fullName: 'Full Name',
      age: 'Age',
      course: 'Course',
      fees: 'Fees (INR)',
      register: 'Complete Registration',
      dashboard: 'Student Directory',
      searchPlaceholder: 'Search name or course...',
      active: 'Active',
      inactive: 'Inactive',
      deactivate: 'Deactivate',
      activate: 'Activate',
      noStudents: 'Zero records found.',
      loading: 'Syncing with cloud...',
      navDashboard: 'Dashboard',
      navRegister: 'Admission',
      navDepartments: 'Faculties',
      deptHod: 'Head of Department',
      deptStudents: 'Enrolled Students'
    },
    hi: {
      title: 'EduPortal',
      subtitle: 'सिव्स विश्वविद्यालय प्रणाली',
      newAdmission: 'प्रवेश पोर्टल',
      fullName: 'पूरा नाम',
      age: 'आयु',
      course: 'कोर्स',
      fees: 'शुल्क (INR)',
      register: 'पंजीकरण पूरा करें',
      dashboard: 'छात्र निर्देशिका',
      searchPlaceholder: 'नाम या कोर्स से खोजें...',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      deactivate: 'निष्क्रिय करें',
      activate: 'सक्रिय करें',
      noStudents: 'कोई रिकॉर्ड नहीं मिला।',
      loading: 'क्लाउड के साथ सिंक हो रहा है...',
      navDashboard: 'डैशबोर्ड',
      navRegister: 'प्रवेश',
      navDepartments: 'संकाय',
      deptHod: 'विभाग के प्रमुख',
      deptStudents: 'नामांकित छात्र'
    },
    mr: {
      title: 'EduPortal',
      subtitle: 'सिव्स विद्यापीठ प्रणाली',
      newAdmission: 'प्रवेश पोर्टल',
      fullName: 'पूर्ण नाव',
      age: 'वय',
      course: 'कोर्स',
      fees: 'शुल्क (INR)',
      register: 'नोंदणी पूर्ण करा',
      dashboard: 'विद्यार्थी निर्देशिका',
      searchPlaceholder: 'नाव किंवा कोर्सनुसार शोधा...',
      active: 'सक्रिय',
      inactive: 'निष्क्रिय',
      deactivate: 'बंद करा',
      activate: 'सुरू करा',
      noStudents: 'रेकॉर्ड आढळले नाहीत.',
      loading: 'क्लाउडसह सिंक होत आहे...',
      navDashboard: 'डॅशबोर्ड',
      navRegister: 'प्रवेश',
      navDepartments: 'संकाय',
      deptHod: 'विभाग प्रमुख',
      deptStudents: 'नोंदणीकृत विद्यार्थी'
    },
    ta: {
      title: 'EduPortal',
      subtitle: 'சிவ்ஸ் பல்கலைக்கழக அமைப்பு',
      newAdmission: 'சேர்க்கை போர்டல்',
      fullName: 'முழு பெயர்',
      age: 'வயது',
      course: 'படிப்பு',
      fees: 'கட்டணம் (INR)',
      register: 'பதிவை முடிக்கவும்',
      dashboard: 'மாணவர் அடைவு',
      searchPlaceholder: 'பெயர் அல்லது படிப்பு மூலம் தேடுக...',
      active: 'செயலில்',
      inactive: 'செயலற்றது',
      deactivate: 'முடக்கு',
      activate: 'செயல்படுத்து',
      noStudents: 'பதிவுகள் எதுவும் இல்லை.',
      loading: 'கிளவுட் உடன் ஒத்திசைக்கிறது...',
      navDashboard: 'டாஷ்போர்டு',
      navRegister: 'சேர்க்கை',
      navDepartments: 'பீடங்கள்',
      deptHod: 'துறைத் தலைவர்',
      deptStudents: 'பதிவுசெய்யப்பட்ட மாணவர்கள்'
    }
  };

  get t() { return this.translations[this.currentLang]; }

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
    if (window.innerWidth < 1024) this.isSidebarOpen = false;
  }

  // APP LOGIC
  loadStudents() {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.allStudents = data;
        this.filterStudents();
        this.isLoading = false;
      },
      error: () => this.handleError('Sync failed. Please retry.')
    });
  }

  filterStudents() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredStudents = this.allStudents.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.course.toLowerCase().includes(query)
    );
  }

  enrollStudent() {
    if (!this.newStudent.fullName || !this.newStudent.age) {
      return this.handleError('Please fill required fields.');
    }
    this.isLoading = true;
    this.studentService.addStudent({
      name: this.newStudent.fullName,
      age: this.newStudent.age,
      course: this.newStudent.course,
      fees: this.newStudent.fees,
      isActive: true
    }).subscribe(() => {
      this.loadStudents();
      this.showNotification('✅ Successfully enrolled!');
      this.resetForm();
      this.setView('dashboard');
    });
  }

  toggleStatus(student: Student) {
    this.studentService.toggleStudentStatus(student.id).subscribe(() => {
      this.showNotification(`🔄 Updated: ${student.name}`);
      this.loadStudents();
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.showNotification('🗑️ Record removed');
      this.loadStudents();
    });
  }

  // UI ACTIONS
  setView(view: 'dashboard' | 'register' | 'departments') {
    this.activeView = view;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setLanguage(lang: 'en' | 'hi' | 'mr' | 'ta') {
    this.currentLang = lang;
  }

  private resetForm() {
    this.newStudent = { fullName: '', age: null, course: 'Web Development', fees: 0 };
  }

  private showNotification(msg: string) {
    this.notificationMessage = msg;
    this.isError = false;
    setTimeout(() => this.notificationMessage = '', 3000);
  }

  private handleError(msg: string) {
    this.notificationMessage = msg;
    this.isError = true;
    this.isLoading = false;
    setTimeout(() => this.notificationMessage = '', 3000);
  }

  getStudentInitial(name: string) {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}
