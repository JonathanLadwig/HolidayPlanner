import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteActivity } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { ActivityState } from 'src/app/Ngrx-store/Ngrx-reducers/activity.reducer';
import { IActivity } from 'src/app/models/Trip';
import { ActivityService } from 'src/app/services/activity.service';
import { getDateFromFS } from 'src/app/shared/getDateFromFirestoreDate';

@Component({
  selector: 'app-activity-card',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: 'auto',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  isOpen = false;

  @Input() activity: IActivity | undefined;
  constructor(private store: Store<ActivityState>, private activityService: ActivityService, private router: Router) { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  confirmDelete() {
    this.store.dispatch(deleteActivity({ idActivity: this.activity?.id || '' }));
    this.activityService.removeActivity(this.activity?.id || '');
  }

  editActivity() {
    if (this.activity) {
      this.activityService.setSelectedActivity(this.activity);
      this.router.navigate(['edit-activity']);
    }
  }

  getDate(fsDate: unknown) {
    return getDateFromFS(fsDate);
  }
}
