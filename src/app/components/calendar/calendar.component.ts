import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { Observable } from 'rxjs';
import { loadActivitiesByHolidayID } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { selectAllActivitiesSortedByDateWithDate, selectAllActivitiesSortedByDateWithMonth } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { IActivity } from 'src/app/models/Trip';
import { HolidayService } from 'src/app/services/holiday.service';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedDate = new Date();
  mode: NzCalendarMode = 'month';
  allActivities$: Observable<IActivity[]> | undefined;
  listDataMap: IActivity[] | undefined;
  daysInMonth: number = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0).getDate();

  constructor(private store: Store<AppState>, private holidayService: HolidayService) { }

  panelChange(change: { date: Date; mode: string }): void {
  }

  selectChange($event: Date) {
    console.log($event);
    this.selectedDate = $event;
    this.getActivitiesByDate();
  }

  ngOnInit(): void {
    const holidayID = this.holidayService.getSelectedHolidayID();
    this.store.dispatch(loadActivitiesByHolidayID({ idHoliday: holidayID }));
    //
    this.store.select(selectAllActivitiesSortedByDateWithMonth(this.selectedDate)).subscribe((activities) => {
      this.listDataMap = activities;
    })
    this.getActivitiesByDate();
  }

  getActivitiesByDate() {
    this.allActivities$ = this.store.select(selectAllActivitiesSortedByDateWithDate(this.selectedDate));
  }

}
