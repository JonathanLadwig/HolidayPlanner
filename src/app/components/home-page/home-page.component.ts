import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadActivitiesByUserHolidayIDs } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { loadHolidays } from 'src/app/Ngrx-store/Ngrx-actions/holiday.actions';
import { ActivityState } from 'src/app/Ngrx-store/Ngrx-reducers/activity.reducer';
import { HolidayState } from 'src/app/Ngrx-store/Ngrx-reducers/holiday.reducer';
import { getStatus, selectAllActivitiesSortedByDate, selectAllActivitiesSortedByDateWithDate } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { getHolidayIDs, getHolidayStatus } from 'src/app/Ngrx-store/Ngrx-selectors/holiday.selectors';
import { IActivity } from 'src/app/models/Trip';
import { AppState } from 'src/app/shared/app.state';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  todaysActivities$: Observable<IActivity[]> | undefined;
  tomorrowsActivities$: Observable<IActivity[]> | undefined;
  allActivities$: Observable<IActivity[]> | undefined;
  currentDate = new Date();
  todaysDate: Date = new Date();
  tomorrowsDate: Date = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1));
  holidayIDArray: string[] = [];
  status$: Observable<string> | undefined;
  holidayStatus$: Observable<string> | undefined;

  constructor(private store: Store<AppState>, private actState: Store<ActivityState>, private holidayState: Store<HolidayState>, private authService: AuthService) {
    this.store.dispatch(loadHolidays());
    this.status$ = this.actState.select(getStatus);
    this.holidayStatus$ = this.holidayState.select(getHolidayStatus);
    //below loads correctly (good) 
    this.store.select(getHolidayIDs).subscribe((holidayIDs) => {
      if (holidayIDs.length === 0) return;
      this.holidayIDArray = holidayIDs;
      this.store.dispatch(loadActivitiesByUserHolidayIDs({ idHolidays: this.holidayIDArray }));
    })
    this.todaysActivities$ = this.store.select(selectAllActivitiesSortedByDateWithDate(this.todaysDate));
    this.tomorrowsActivities$ = this.store.select(selectAllActivitiesSortedByDateWithDate(this.tomorrowsDate));
    this.allActivities$ = this.store.select(selectAllActivitiesSortedByDate)
  }

  ngOnInit(): void {
    this.authService.checkIfLoggedIn();
  }
}
