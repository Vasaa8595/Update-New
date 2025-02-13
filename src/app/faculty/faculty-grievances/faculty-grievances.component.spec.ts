import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyGrievancesComponent } from './faculty-grievances.component';

describe('FacultyGrievancesComponent', () => {
  let component: FacultyGrievancesComponent;
  let fixture: ComponentFixture<FacultyGrievancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyGrievancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyGrievancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
