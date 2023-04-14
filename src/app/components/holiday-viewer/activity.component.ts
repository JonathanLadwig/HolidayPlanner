import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { selectAllActivitiesSortedByDate } from 'src/app/Ngrx-store/Ngrx-selectors/activity.selector';
import { AppState } from 'src/app/shared/app.state';
import { deleteActivity, loadActivities } from "../../Ngrx-store/Ngrx-actions/activity.actions";
import { IActivity } from "../../models/Trip";


@Component({
  selector: 'app-holiday-viewer',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public allActivities$ = this.store.select(selectAllActivitiesSortedByDate);
  public selectedActivity: IActivity = {} as IActivity;

  constructor(private store: Store<AppState>, private router: Router, private afs: AngularFirestore) {
  }

  selectActivity(activity: IActivity) {
    this.selectedActivity = activity;
  }

  addNewActivity() {
    this.router.navigate(['add-activity']);
  }

  // editActivity(activity: IActivity) {
  //   this.store.dispatch(editActivity({ idActivity: activity.id }));
  // }

  removeActivity(activity: IActivity) {
    this.store.dispatch(deleteActivity({ idActivity: activity.id }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadActivities());
    // this.allActivities$ = this.afs.collection<IActivity>('activities').valueChanges();
  }
}

