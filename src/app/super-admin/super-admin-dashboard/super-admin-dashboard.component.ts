import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface StudentComplaint {
  id: string;
  studentName: string;
  category: string;
  remarks: string;
  facultyIncharge: string;
  details: string;
  status: 'InProgress' | 'Solved' | 'Rejected';
}

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrl: './super-admin-dashboard.component.css'
})
export class SuperAdminDashboardComponent implements OnInit {

  adminName = "John Doe";
  isProfileOpen = false;
  searchTerm = "";
  selectedComplaint: StudentComplaint | null = null;

  statistics = {
    student: 245,
    faculty: 78,
    pending: 35
  };

  complaints: StudentComplaint[] = [
    {
      id: "STU001",
      studentName: "Alice Johnson",
      category: "Academic",
      remarks: "",
      facultyIncharge: "Dr. Smith",
      details: "Issues with course registration system",
      status: "InProgress"
    },
    {
      id: "STU002",
      studentName: "Bob Smith",
      category: "Hostel",
      remarks: "",
      facultyIncharge: "Dr. Williams",
      details: "Maintenance issues in room 302",
      status: "InProgress"
    },
    {
      id: "STU003",
      studentName: "Carol White",
      category: "Infrastructure",
      remarks: "",
      facultyIncharge: "Dr. Johnson",
      details: "Poor internet connectivity in library",
      status: "InProgress"
    },
    {
      id: "STU004",
      studentName: "David Brown",
      category: "Academic",
      remarks: "",
      facultyIncharge: "Dr. Davis",
      details: "Requesting change in exam schedule",
      status: "InProgress"
    },
    {
      id: "STU005",
      studentName: "Eve Wilson",
      category: "Other",
      remarks: "",
      facultyIncharge: "Dr. Miller",
      details: "Sports equipment availability issue",
      status: "InProgress"
    },
    {
      id: "STU006",
      studentName: "Frank Taylor",
      category: "Hostel",
      remarks: "",
      facultyIncharge: "Dr. Anderson",
      details: "Water supply issues in hostel block B",
      status: "InProgress"
    },
    {
      id: "STU007",
      studentName: "Grace Moore",
      category: "Infrastructure",
      remarks: "",
      facultyIncharge: "Dr. Wilson",
      details: "Classroom projector not working",
      status: "InProgress"
    },
    {
      id: "STU008",
      studentName: "Henry Clark",
      category: "Academic",
      remarks: "",
      facultyIncharge: "Dr. Thomas",
      details: "Lab equipment access request",
      status: "InProgress"
    }
  ];

  get filteredComplaints() {
    return this.complaints.filter(complaint =>
      complaint.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor() {}

  ngOnInit() {}

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  viewDetails(complaint: StudentComplaint) {
    this.selectedComplaint = { ...complaint };
  }

  closePopup(event: Event) {
    if (event.target === event.currentTarget) {
      this.selectedComplaint = null;
    }
  }

  submitRemarks(complaint: StudentComplaint) {
    const index = this.complaints.findIndex(c => c.id === complaint.id);
    if (index !== -1) {
      this.complaints[index].remarks = complaint.remarks;
      this.complaints[index].status = complaint.status;
      this.selectedComplaint = null;
      console.log("Changes submitted for complaint:", complaint.id);
    }
  }

  logout() {
    console.log("Logging out...");
  }

}
