import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-grievance',
  standalone: true,
  imports: [],
  templateUrl: './personal-grievance.component.html',
  styleUrls: ['./personal-grievance.component.css'],
})
export class PersonalGrievanceComponent {
  
  // Method to handle form submission
  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    
    console.log('Form submitted'); // Debugging to check if onSubmit is triggered

    // Gather form values
    const form = event.target as HTMLFormElement;
    const rollNumber = (form.querySelector('#roll-number') as HTMLInputElement)?.value;
    const department = (form.querySelector('#department') as HTMLInputElement)?.value;
    const category = (form.querySelector('#category') as HTMLSelectElement)?.value;
    const summary = (form.querySelector('#summary') as HTMLInputElement)?.value;
    const description = (form.querySelector('#description') as HTMLTextAreaElement)?.value;

    // Validate inputs
    if (!rollNumber || !department || !category || !summary || !description) {
      alert('Please fill in all the fields before submitting.');
      return;
    }

    try {
      // Simulate sending data to the server
      const response = await fetch('https://example.com/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNumber, department, category, summary, description }),
      });

      if (response.ok) {
        // Show success message
        alert('Message successfully sent!');

        // Reset form fields
        form.reset();

        // Reload the component (refreshes the page)
        window.location.reload();
      } else {
        // Show server error message
        alert('Message not sent: Server error. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      alert('Message not sent: Network error. Please check your connection and try again.');
    }
  }
}
