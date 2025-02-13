import { Component, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-faculty-dashboard',
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
  ],
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css'],
})
export class FacultyDashboardComponent {
  opened = false;
  collapsed = false;
  screenWidth = window.innerWidth;

  // navData = [
  //   { routeLink: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  //   { routeLink: 'sidenav/queries', icon: 'query_stats', label: 'Queries' },
  //   { routeLink: 'sidenav/profile', icon: 'account_circle', label: 'Profile' },
  //   { routeLink: 'sidenav/settings', icon: 'settings', label: 'Settings' },
  // ];

  auth: AuthService = inject(AuthService);
  loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  Name: string = this.loggedInUser?.name || '';
  profileimg: string = this.loggedInUser?.picture || '';
  Email: string = this.loggedInUser?.email || '';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @Input() userimg: string = '';
  @Input() name: string = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.addGlobalClickListener();
    this.updateCounters();
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
  queries = [
    {
      email: 'john.ec21@bitsathy.ac.in',
      rollNumber: 'EC210001',
      category: 'Academics',
      summary: 'Assignment Submission',
      description: 'Requesting deadline extension for the assignment.',
      status: 'Pending',
    },
    {
      email: 'sara.cs22@bitsathy.ac.in',
      rollNumber: 'CS220012',
      category: 'Transport',
      summary: 'Bus Timing Issue',
      description: 'The bus for route 12 is consistently late.',
      status: 'Pending',
    },
    {
      email: 'alex.it20@bitsathy.ac.in',
      rollNumber: 'IT200034',
      category: 'Technical',
      summary: 'Lab Equipment Issue',
      description: 'Equipment in Lab 3 is not functioning properly.',
      status: 'Pending',
    },
    {
      email: 'nina.ee23@bitsathy.ac.in',
      rollNumber: 'EE230045',
      category: 'Library',
      summary: 'Book Availability',
      description: 'Requested textbooks are out of stock in the library.',
      status: 'Pending',
    },
    {
      email: 'mike.me22@bitsathy.ac.in',
      rollNumber: 'ME220056',
      category: 'Hostel',
      summary: 'Room Maintenance',
      description: 'Room ceiling fan is not working.',
      status: 'Pending',
    },
    {
      email: 'emma.bt21@bitsathy.ac.in',
      rollNumber: 'BT210067',
      category: 'Canteen',
      summary: 'Food Quality',
      description: 'Food served in the canteen lacks proper hygiene standards.',
      status: 'Pending',
    },
    {
      email: 'lucas.ce20@bitsathy.ac.in',
      rollNumber: 'CE200078',
      category: 'Sports',
      summary: 'Sports Equipment',
      description: 'Cricket bats and balls are in poor condition.',
      status: 'Pending',
    }
  ];
  

  totalQueries: number = this.queries.length;
  solvedQueries: number = 0;
  rejectedQueries: number = 0;

  departmentMapping: { [key: string]: string } = {
    ec: 'ECE',
    cs: 'CSE',
    it: 'IT',
    ei: 'E&I',
    ee: 'EEE',
    me: 'Mechanical',
    ce: 'Civil',
    bt: 'Biotechnology',
    ch: 'Chemical',
    ae: 'Aerospace',
    mt: 'Mechatronics',
  };

  processedQueries = this.queries.map(query => {
    const { email } = query;
    const prefix = email.split('@')[0];
    const name = prefix.split('.')[0];
    const departmentCode = prefix.split('.')[1].slice(0, 2);
    const yearCode = prefix.split('.')[1].slice(2);

    const department = this.departmentMapping[departmentCode] || 'Unknown Department';
    const year = this.getYearOfStudy(yearCode);

    return {
      ...query,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      department,
      year,
    };
  });

  private getYearOfStudy(yearCode: string): string {
    const currentYear = 25;
    const studyYear = currentYear - parseInt(yearCode, 10) + 1;
    return ['1st Year', '2nd Year', '3rd Year', '4th Year'][studyYear - 1] || 'Unknown Year';
  }

  viewQuery(index: number): void {
    const query = this.processedQueries[index];
    alert(
      `Query Details:\n\nName: ${query.name}\nRoll Number: ${query.rollNumber}\nDepartment: ${query.department}\nYear: ${query.year}\nCategory: ${query.category}\nSummary: ${query.summary}\nDescription: ${query.description}`
    );
  }

  solveQuery(index: number): void {
    this.processedQueries[index].status = 'Solved';
    this.updateCounters();
  }

  rejectQuery(index: number): void {
    this.processedQueries[index].status = 'Rejected';
    this.updateCounters();
  }

  private updateCounters(): void {
    this.solvedQueries = this.processedQueries.filter(q => q.status === 'Solved').length;
    this.rejectedQueries = this.processedQueries.filter(q => q.status === 'Rejected').length;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
