# Student Management App - Angular Project Documentation

## 1. Aim of the Project
The goal of this project is to build a beginner-friendly Angular application that consolidates fundamental Angular concepts into a single "Student Management" interface. It demonstrates how to handle data, manipulate the DOM, and transform values using Angular's core features.

### Topics Covered:
- **Data Binding:** Interpolation, Property Binding, Event Binding, and Two-way Data Binding (`[(ngModel)]`).
- **Directives:**
  - **Structural:** `*ngIf` (conditional rendering) and `*ngFor` (listing data).
  - **Attribute:** Custom `HighlightDirective` using `ElementRef` and `HostListener`.
- **Pipes:**
  - **Built-in:** `uppercase`, `date`, `currency`.
  - **Custom:** `KebabCasePipe` for string transformation.
- **Components:** Modular structure with a dedicated `StudentComponent`.

---

## 2. Steps to Build the Project

### Step 1: Initialize the Project
Create a new Angular project using the CLI with standalone components and basic styling.

### Step 2: Generate Core Elements
Generate the main component, the custom directive, and the custom pipe using Angular CLI commands.

### Step 3: Implement Custom Logic
- **Highlight Directive:** Add logic to change background color on mouse hover.
- **Kebab Case Pipe:** Implement a transformation that converts strings to lowercase and replaces spaces with hyphens.
- **Student Component:** Create a data model for students and implement methods for interaction.

### Step 4: Design the UI
Use HTML and CSS to create a clean, card-based interface that displays the different Angular concepts clearly.

---

## 3. Important Commands

| Task | Command |
| :--- | :--- |
| **Install Angular CLI** | `npm install -g @angular/cli` |
| **Create New Project** | `ng new student-management-app --standalone` |
| **Generate Component** | `ng generate component student` |
| **Generate Directive** | `ng generate directive highlight` |
| **Generate Pipe** | `ng generate pipe kebab-case` |
| **Run the Project** | `ng serve` |

---

## 4. Key Code Snippets

### A. Data Binding (Student Component)
```typescript
// student.ts
studentName: string = 'John Doe';
isActive: boolean = true;

toggleStatus() {
  this.isActive = !this.isActive;
}
```

### B. Custom Directive (Highlight)
```typescript
// highlight.ts
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight('');
}
```

### C. Custom Pipe (Kebab Case)
```typescript
// kebab-case-pipe.ts
transform(value: string): string {
  return value.replace(/\s+/g, '-').toLowerCase();
}
```

### D. Template Usage (HTML)
```html
<!-- Structural Directive & Pipe -->
<li *ngFor="let s of students" appHighlight>
  {{ s.name | kebabCase }} - {{ s.fees | currency:'INR' }}
</li>
```

---

## 5. How to Run
1. Open terminal in the project folder.
2. Run `npm install` to install dependencies.
3. Run `ng serve` to start the development server.
4. Navigate to `http://localhost:4200/` in your browser.
