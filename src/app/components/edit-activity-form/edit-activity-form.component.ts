import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toDate } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { addActivity, deleteActivity } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { IActivity } from 'src/app/models/Trip';
import { ActivityService } from 'src/app/services/activity.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { AppState } from 'src/app/shared/app.state';
import { getDateFromFS } from 'src/app/shared/getDateFromFirestoreDate';

@Component({
  selector: 'app-edit-activity-form',
  templateUrl: './edit-activity-form.component.html',
  styleUrls: ['./edit-activity-form.component.scss']
})
export class EditActivityFormComponent implements OnInit {
  oldActivity = this.activityService.getSelectedActivity();
  validateEditForm!: UntypedFormGroup;
  tagOptions: string[] = ['Food', 'Hiking', 'Sightseeing', 'Shopping', 'Travel', 'Other'];
  chosenCurrency: string = 'ZAR';
  currencyOptions$ = this.currencyService.getSupportedCurrencies();
  currencies: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private activityService: ActivityService,
    private router: Router,
    private currencyService: CurrencyService,
    private message: NzMessageService) {
    this.currencyOptions$.subscribe(data => {
      this.currencies = Object.keys(data.symbols) as string[];
    })
  }

  ngOnInit(): void {

    const startDate = toDate(getDateFromFS(this.oldActivity?.startDateTime as unknown));
    const endDate = toDate(getDateFromFS(this.oldActivity?.endDateTime as unknown));

    if (this.oldActivity) {
      this.validateEditForm = this.fb.group({
        totalCost: ['0'],
        currency: [this.oldActivity.currency, Validators.required],
        activityName: [this.oldActivity.name, Validators.required],
        activityDescription: [this.oldActivity.description],
        tag: [this.oldActivity.tag, Validators.required],
        datePicker: [startDate, Validators.required],
        startTimePicker: [startDate, Validators.required],
        endTimePicker: [endDate, Validators.required],
      });
    }

    this.currencyService.convertCurrencies('ZAR', this.oldActivity?.currency || 'ZAR', this.oldActivity?.cost || 0).subscribe(data => {
      this.validateEditForm.controls['totalCost'].setValue(Math.round(data.result * 100) / 100);
    })
  }

  submitForm() {
    if (this.validateEditForm.valid && this.oldActivity?.id && this.oldActivity?.fkHolidayID) {
      const activityStartDateTime = new Date((this.validateEditForm.value.startTimePicker));
      const activityEndDateTime = new Date((this.validateEditForm.value.endTimePicker));
      const chosenDate = new Date(this.validateEditForm.value.datePicker);

      if (activityEndDateTime > activityStartDateTime) {
        activityStartDateTime.setFullYear(chosenDate.getFullYear());
        activityStartDateTime.setMonth(chosenDate.getMonth());
        activityStartDateTime.setDate(chosenDate.getDate());

        activityEndDateTime.setFullYear(chosenDate.getFullYear());
        activityEndDateTime.setMonth(chosenDate.getMonth());
        activityEndDateTime.setDate(chosenDate.getDate());
      } else {
        activityStartDateTime.setFullYear(chosenDate.getFullYear());
        activityStartDateTime.setMonth(chosenDate.getMonth());
        activityStartDateTime.setDate(chosenDate.getDate());

        activityEndDateTime.setFullYear(chosenDate.getFullYear());
        activityEndDateTime.setMonth(chosenDate.getMonth());
        activityEndDateTime.setDate(chosenDate.getDate() + 1);
      }

      //convert the cost to chosen currency then subscribe and store data in the database and state (has to be done this way because of the async nature of the conversion)
      this.currencyService.convertCurrencies(this.validateEditForm.value.currency, 'ZAR', this.validateEditForm.value.totalCost).subscribe(data => {
        const newActivity: IActivity = {
          id: this.oldActivity?.id || '',
          fkHolidayID: this.oldActivity?.fkHolidayID || '',
          name: this.validateEditForm.value.activityName,
          description: this.validateEditForm.value.activityDescription || '',
          cost: Math.round((data.result * 100) / 100),
          currency: this.validateEditForm.value.currency,
          tag: this.validateEditForm.value.tag,
          startDateTime: activityStartDateTime,
          endDateTime: activityEndDateTime
        }
        this.updateActivity(newActivity);
      })

    } else {
      Object.values(this.validateEditForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // this.editErrorNotification();
      this.createErrorMessage();
    }
  }

  updateActivity(updatedActivity: IActivity) {
    //first delete the old activity from state
    this.store.dispatch(deleteActivity({ idActivity: this.oldActivity?.id || '' }));
    //then add the updated activity to state
    this.store.dispatch(addActivity({ newActivity: updatedActivity }));
    //then update the activity in the database
    this.activityService.updateActivity(updatedActivity);
    // this.editSuccessNotification();
    this.createSuccessMessage();
    this.router.navigate(['dashboard']);
  }

  createSuccessMessage() {
    this.message.create('success', "We've updated the activity with all your changes");
  }

  createErrorMessage() {
    this.message.create('error', "Please fill in all required fields");
  }

}
