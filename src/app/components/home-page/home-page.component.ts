import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadActivities } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { selectAllActivitiesSortedByDateWithDate } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { IActivity } from 'src/app/models/Trip';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  todaysActivities$: Observable<IActivity[]> | undefined;
  tomorrowsActivities$: Observable<IActivity[]> | undefined;
  allActivities: IActivity[] | undefined;
  currentDate = new Date();
  todaysDate: Date = new Date();
  tomorrowsDate: Date = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadActivities());
    console.log("This is todays date", this.todaysDate);
    this.todaysActivities$ = this.store.select(selectAllActivitiesSortedByDateWithDate(this.todaysDate));
    this.tomorrowsActivities$ = this.store.select(selectAllActivitiesSortedByDateWithDate(this.tomorrowsDate));
  }
}
