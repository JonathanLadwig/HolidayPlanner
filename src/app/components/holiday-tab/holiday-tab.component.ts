import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteHoliday } from 'src/app/Ngrx-store/Ngrx-actions/holiday.actions';
import { getHolidayTotalCost, selectAllActivitiesSortedByDateWithHolidayID } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { IHoliday } from 'src/app/models/Trip';
import { HolidayService } from 'src/app/services/holiday.service';
import { AppState } from 'src/app/shared/app.state';
import { getDateFromFS } from 'src/app/shared/getDateFromFirestoreDate';

@Component({
  selector: 'app-holiday-tab',
  templateUrl: './holiday-tab.component.html',
  styleUrls: ['./holiday-tab.component.scss']
})
export class HolidayTabComponent implements OnInit {
  startDate: Date | undefined;
  endDate: Date | undefined;
  @Input() holiday: IHoliday | undefined;
  totalCost: number | undefined;

  constructor(private router: Router, private store: Store<AppState>, private holidayService: HolidayService) {
  }

  ngOnInit(): void {
    this.holidayService.setSelectedHoliday(this.holiday?.id || '');
    this.store.select(selectAllActivitiesSortedByDateWithHolidayID(this.holidayService.getSelectedHolidayID())).subscribe((activities) => {
      if (activities.length === 0) {
        this.startDate = new Date();
        this.endDate = new Date();
      } else {
        this.startDate = getDateFromFS(activities[0]?.startDateTime);
        this.endDate = getDateFromFS(activities[activities.length - 1]?.endDateTime);
      }
    })
    this.store.select(getHolidayTotalCost(this.holiday?.id || '')).subscribe((cost) => {
      this.totalCost = cost;
    }
    )
  }

  openCalendar() {
    this.router.navigate(["calendar"]);
  }

  cancelDelete() {
  }

  confirmDelete() {
    this.store.dispatch(deleteHoliday({ idHoliday: this.holiday?.id || '' }));
    this.holidayService.deleteHoliday(this.holiday?.id || '');
  }
}
