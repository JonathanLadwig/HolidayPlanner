import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { deleteActivity, loadActivities } from "../../Ngrx-store/Ngrx-actions/activity.actions";
import { IActivity, IHoliday } from "../../models/Trip";

@Component({
  selector: 'app-holiday-viewer',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  // public allActivities$: Observable<IActivity[]>;
  public selectedActivity: IActivity = {} as IActivity;
  holiday: IHoliday = {} as IHoliday;
  holidayID: string = '1';

  constructor(private store: Store, private router: Router) {
    // this.allActivities$ = this.store.select((selector.selectAllActivitiesSortedByDate));
    //Still need to implement this
    // this.holiday = this.store.select(selectHolidayByID(this.holidayID));
  }

  selectActivity(activity: IActivity) {
    this.selectedActivity = activity;
  }

  addNewActivity() {
    //change this route
    this.router.navigate(['activity', 'new']);
  }

  // editActivity(activity: IActivity) {
  //   this.store.dispatch(editActivity({ idActivity: activity.id }));
  // }

  removeActivity(activity: IActivity) {
    this.store.dispatch(deleteActivity({ idActivity: activity.id }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
  }
}

