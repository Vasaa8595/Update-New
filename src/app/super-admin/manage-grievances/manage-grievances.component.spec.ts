import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGrievancesComponent } from './manage-grievances.component';

describe('ManageGrievancesComponent', () => {
  let component: ManageGrievancesComponent;
  let fixture: ComponentFixture<ManageGrievancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGrievancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGrievancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
