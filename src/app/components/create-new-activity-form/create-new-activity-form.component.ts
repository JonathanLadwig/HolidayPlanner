import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { addActivity } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { ActivityService } from 'src/app/services/activity.service';
import { AppState } from 'src/app/shared/app.state';
import { IActivity } from "../../models/Trip";

@Component({
  selector: 'app-create-new-holiday-viewer-form',
  templateUrl: './create-new-activity-form.component.html',
  styleUrls: ['./create-new-activity-form.component.scss']
})
export class CreateNewActivityFormComponent {
  holidayID = '1';
  validateForm!: UntypedFormGroup;
  tagOptions: string[] = ['Food', 'Hiking', 'Sightseeing', 'Shopping', 'Travel'];
  private activitiesCollection: AngularFirestoreCollection<IActivity>;
  activities: Observable<IActivity[]>;

  constructor(private fb: UntypedFormBuilder, private store: Store<AppState>, private readonly afs: AngularFirestore, private activityService: ActivityService) {
    this.activitiesCollection = afs.collection<IActivity>('activities');
    this.activities = this.activitiesCollection.valueChanges({ idField: 'activityID' });
  }

  submitForm(): void {
    //still need to do validation for the date to make sure you're not setting dates in the past
    if (this.validateForm.valid) {
      const activityStartDateTime = new Date(this.validateForm.value.startTimePicker);
      const activityEndDateTime = new Date(this.validateForm.value.endTimePicker);
      const chosenDate = new Date(this.validateForm.value.datePicker);

      if (activityEndDateTime > activityStartDateTime) {
        activityStartDateTime.setDate(chosenDate.getDate());
        activityEndDateTime.setDate(chosenDate.getDate());
      } else {
        activityStartDateTime.setDate(chosenDate.getDate());
        activityEndDateTime.setDate(chosenDate.getDate() + 1);
      }

      const newActivity: IActivity = {
        id: this.afs.createId(),
        name: this.validateForm.value.activityName,
        description: this.validateForm.value.activityDescription || '',
        cost: this.validateForm.value.totalCost,
        tag: this.validateForm.value.tag,
        startDateTime: activityStartDateTime,
        endDateTime: activityEndDateTime
      }
      console.log(newActivity);
      this.addNewActivity(newActivity);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      alert('Please fill in all required fields');
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      activityName: [null, Validators.required],
      activityDescription: [null],
      tag: [null, Validators.required],
      datePicker: [null, Validators.required],
      startTimePicker: [null, Validators.required],
      endTimePicker: [null, Validators.required],
      totalCost: [0]
    });
  }

  //should be done via effects in the store
  addNewActivity(activity: IActivity) {
    this.validateForm.reset();
    this.store.dispatch(addActivity({ newActivity: activity }));
    this.activityService.addActivity(activity);
  }
}

