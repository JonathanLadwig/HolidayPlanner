import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewActivityFormComponent } from './create-new-activity-form.component';

describe('CreateNewActivityFormComponent', () => {
  let component: CreateNewActivityFormComponent;
  let fixture: ComponentFixture<CreateNewActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewActivityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
