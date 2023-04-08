import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectAllActivitiesByDate } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { deleteActivity, loadActivities } from "../../Ngrx-store/Ngrx-actions/activity.actions";
import { IActivity, IHoliday } from "../../models/Trip";

@Component({
  selector: 'app-holiday-viewer',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public allActivities$ = this.store.select(selectAllActivitiesByDate);
  public activity: IActivity = {} as IActivity;
  holiday: IHoliday = {} as IHoliday;

  constructor(private store: Store) { }

  removeActivity(activity: IActivity) {
    this.store.dispatch(deleteActivity({ idActivity: activity.id }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
  }
}
