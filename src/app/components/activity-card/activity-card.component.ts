import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteActivity } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { ActivityState } from 'src/app/Ngrx-store/Ngrx-reducers/activity.reducer';
import { IActivity } from 'src/app/models/Trip';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {

  @Input() activity: IActivity | undefined;
  constructor(private store: Store<ActivityState>, private activityService: ActivityService) { }

  deleteActivity() {
    this.store.dispatch(deleteActivity({ idActivity: this.activity?.id || '' }));
    this.activityService.removeActivity(this.activity?.id || '');
  }
}
