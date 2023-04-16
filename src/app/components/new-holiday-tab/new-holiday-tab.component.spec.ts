import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHolidayTabComponent } from './new-holiday-tab.component';

describe('NewHolidayTabComponent', () => {
  let component: NewHolidayTabComponent;
  let fixture: ComponentFixture<NewHolidayTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHolidayTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHolidayTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
