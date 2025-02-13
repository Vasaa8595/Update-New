import { Component, EventEmitter, inject, Input, Output, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PersonalGrievanceComponent } from '../personal-grievance/personal-grievance.component';
import { AnonymousGrievanceComponent } from '../anonymous-grievance/anonymous-grievance.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Student {
  name: string;
  profileImage: string;
  department: string;
  currentYear: number;
  status: string;
  currentSemester: number;
  academicYear: string;
  enrollmentStatus: string;
}

interface Query {
  id: number;
  title: string;
  status: string;
  submissionDate: Date;
  resolutionDate?: Date;
  adminRemarks?: string;
}

interface QueryStats {
  total: number;
  solved: number;
  pending: number;
  rejected: number;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    PersonalGrievanceComponent,
    AnonymousGrievanceComponent,
    
],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {

  student: Student = {
    name: "John Doe",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    department: "Computer Science",
    currentYear: 3,
    status: "Continuing",
    currentSemester: 5,
    academicYear: "2023-2024",
    enrollmentStatus: "Continuing"
  };

  opened = false;
  collapsed = false;
  screenWidth = window.innerWidth;

  auth: AuthService = inject(AuthService);
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  Name: string = this.loggedInUser?.name || '';
  profileimg: string = this.loggedInUser?.picture || '';
  Email: string = this.loggedInUser?.email || '';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @Input() userimg: string = '';
  @Input() name: string = '';

  activeComponent: string | null = 'student-dashboard'; // Default view

  constructor(private renderer: Renderer2) {}

  showComponent(component: string) {
    this.activeComponent = component;
  }

  
  
  queryStats: QueryStats = {
    total: 15,
    solved: 8,
    pending: 5,
    rejected: 2
  };

  queries: Query[] = [
    {
      id: 1,
      title: "Request for Course Change",
      status: "Solved",
      submissionDate: new Date("2024-01-15"),
      resolutionDate: new Date("2024-01-18"),
      adminRemarks: "Approved as per policy"
    },
    {
      id: 2,
      title: "Examination Fee Extension",
      status: "Pending",
      submissionDate: new Date("2024-01-20")
    },
    {
      id: 3,
      title: "Library Access Request",
      status: "Rejected",
      submissionDate: new Date("2024-01-10"),
      resolutionDate: new Date("2024-01-12"),
      adminRemarks: "Invalid request type"
    }
  ];

  filteredQueries: Query[] = [];
  displayedQueries: Query[] = [];
  searchQuery: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  
  ngOnInit(): void {
    this.addGlobalClickListener();
    this.extractStudentDetails(this.Email);
    // this.fetchQueryStats();
    this.filteredQueries = [...this.queries];
      this.updateDisplayedQueries();
  }
  
  filterQueries(): void {
    this.filteredQueries = this.queries.filter(query =>
      query.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.updateDisplayedQueries();
  }

  updateDisplayedQueries(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedQueries = this.filteredQueries.slice(startIndex, startIndex + this.itemsPerPage);
    this.totalPages = Math.ceil(this.filteredQueries.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedQueries();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedQueries();
    }
  }

  exportQueries(): void {
    const queryData = JSON.stringify(this.queries, null, 2);
    const blob = new Blob([queryData], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "query-history.json";
    link.click();
    window.URL.revokeObjectURL(url);
  }


  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  addGlobalClickListener() {
    this.renderer.listen('window', 'click', (event: Event) => {
      const dropdown = document.querySelector('.dropdown');
      const target = event.target as HTMLElement;
      if (dropdown && !dropdown.contains(target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  studentName: string = '';
  studentDepartment: string = '';
  studentYear: string = '';
  studentRollNumber: string = '';
  academicYear: string = '';
  queryCount: number = 0;
  processedQueries: number = 0;
  solvedQueries: number = 0;
  rejectedQueries: number = 0;


  extractStudentDetails(email: string) {
    if (!email) return;

    const emailParts = email.split('@')[0];
    const [name, roll] = emailParts.split('.');
    
    if (!name || !roll) return; // Validate format
    
    const departmentCode = roll.slice(0, 2);
    const admissionYear = parseInt(roll.slice(2, 4), 10); // Extract last 2 digits of admission year

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1-12 (January = 1)

    let admissionFullYear = 2000 + admissionYear; // Convert "22" -> "2022"
    let graduationYear = admissionFullYear + 4; // 4-year course completion

    // Determine student's current academic year
    let studentYear = currentYear - admissionFullYear + (currentMonth >= 8 ? 1 : 0);

    // Assign correct year status
    let yearStatus = "";
    if (studentYear < 1) {
       yearStatus = "Not started yet"; // Future students
    } else if (studentYear > 4) {
        yearStatus = "Graduated"; // Past students
    } else {
        yearStatus = `${studentYear}${this.getYearSuffix(studentYear)}`;
    }

    // Assign extracted details to component variables
    this.studentName = this.capitalizeFirstLetter(name);
    this.studentDepartment = this.getDepartmentName(departmentCode);
    this.studentYear = yearStatus;
    this.studentRollNumber = roll;
    this.academicYear = `${admissionFullYear} - ${admissionFullYear + 4}`;
}

// 🔹 Function to get ordinal suffix
getYearSuffix(year: number): string {
    return ["st Year", "nd Year", "rd Year"][year - 1] || "th Year";
}

// 🔹 Function to capitalize first letter
capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}




  getDepartmentName(code: string): string {
    const departments: { [key: string]: string } = {
      'ec': 'Electronics and Communication Engineering',
      'cs': 'Computer Science Engineering',
      'it': 'Information Technology ',
      'ee': 'Electrical Engineering',
      'me': 'Mechanical Engineering',
    };
    return departments[code.toLowerCase()] || 'Unknown Department';
  }

}