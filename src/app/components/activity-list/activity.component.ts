import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { selectAllActivitiesSortedByDateWithHolidayID } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { HolidayService } from 'src/app/services/holiday.service';
import { AppState } from 'src/app/shared/app.state';
import { deleteActivity, loadActivities } from "../../Ngrx-store/Ngrx-actions/activity.actions";
import { IActivity } from "../../models/Trip";


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  // public allActivities$ = this.store.select(selectAllActivitiesSortedByDate);
  public allActivities$: Observable<IActivity[]>;
  public selectedActivity: IActivity = {} as IActivity;

  constructor(private store: Store<AppState>, private router: Router, private holidayService: HolidayService) {
    this.allActivities$ = this.store.select(selectAllActivitiesSortedByDateWithHolidayID(this.holidayService.getSelectedHolidayID()));
  }

  selectActivity(activity: IActivity) {
    this.selectedActivity = activity;
  }

  addNewActivity() {
    this.router.navigate(['add-activity']);
  }

  removeActivity(activity: IActivity) {
    this.store.dispatch(deleteActivity({ idActivity: activity.id }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
  }
}

