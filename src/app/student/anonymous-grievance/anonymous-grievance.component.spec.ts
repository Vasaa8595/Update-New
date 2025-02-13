import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousGrievanceComponent } from './anonymous-grievance.component';

describe('AnonymousGrievanceComponent', () => {
  let component: AnonymousGrievanceComponent;
  let fixture: ComponentFixture<AnonymousGrievanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonymousGrievanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousGrievanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
