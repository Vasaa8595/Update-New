import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalGrievanceComponent } from './personal-grievance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonalGrievanceComponent', () => {
  let component: PersonalGrievanceComponent;
  let fixture: ComponentFixture<PersonalGrievanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalGrievanceComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule] // Add necessary modules
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalGrievanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
