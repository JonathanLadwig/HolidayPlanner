import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { addActivity } from 'src/app/Ngrx-store/Ngrx-actions/activity.actions';
import { ActivityService } from 'src/app/services/activity.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { HolidayService } from 'src/app/services/holiday.service';
import { AppState } from 'src/app/shared/app.state';
import { IActivity } from "../../models/Trip";

@Component({
  selector: 'app-create-new-holiday-viewer-form',
  templateUrl: './create-new-activity-form.component.html',
  styleUrls: ['./create-new-activity-form.component.scss']
})
export class CreateNewActivityFormComponent {
  holidayID: string = this.holidayService.getSelectedHolidayID();
  validateForm!: UntypedFormGroup;
  tagOptions: string[] = ['Food', 'Hiking', 'Sightseeing', 'Shopping', 'Travel', 'Other'];
  chosenCurrency: string = 'ZAR';
  currencyOptions$ = this.currencyService.getSupportedCurrencies();
  currencies: string[] = [];
  successful: boolean | undefined;

  constructor(private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private readonly afs: AngularFirestore,
    private activityService: ActivityService,
    private holidayService: HolidayService,
    private router: Router,
    private currencyService: CurrencyService,
    private notification: NzNotificationService) {
    this.currencyOptions$.subscribe(data => {
      this.currencies = Object.keys(data.symbols) as string[];
      this.successful = false;
    })
  }

  beforeConfirm(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 3000);
    });
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

      //convert the cost to chosen currency then subscribe and store data in the database and state (has to be done this way because of the async nature of the conversion)
      this.currencyService.convertCurrencies(this.validateForm.value.currency, 'ZAR', this.validateForm.value.totalCost).subscribe(data => {
        const newActivity: IActivity = {
          id: this.afs.createId(),
          fkHolidayID: this.holidayID,
          name: this.validateForm.value.activityName,
          description: this.validateForm.value.activityDescription || '',
          cost: data.result,
          currency: this.validateForm.value.currency,
          tag: this.validateForm.value.tag,
          startDateTime: activityStartDateTime,
          endDateTime: activityEndDateTime
        }
        this.addNewActivity(newActivity);
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.createErrorNotification();
      this.successful = false;
    }
  }

  ngOnInit(): void {
    this.successful = false;
    this.validateForm = this.fb.group({
      activityName: [null, Validators.required],
      activityDescription: [null],
      tag: [null, Validators.required],
      datePicker: [null, Validators.required],
      startTimePicker: [null, Validators.required],
      endTimePicker: [null, Validators.required],
      totalCost: [0],
      currency: [null, Validators.required]
    });
  }

  //should be done via effects in the store
  addNewActivity(activity: IActivity) {
    this.validateForm.reset();
    this.store.dispatch(addActivity({ newActivity: activity }));
    this.activityService.addActivity(activity);
    this.successful = true;
    this.createSuccessNotification();
    this.router.navigate(['dashboard']);
  }

  createSuccessNotification(): void {
    this.notification
      .blank(
        'SUCCESS',
        'We added the activity to your holiday!',
        { nzDuration: 3000, nzPlacement: 'top' }
      )
  }

  createErrorNotification(): void {
    this.notification
      .blank(
        'FAILURE',
        'Please fill in all required fields!',
        { nzDuration: 3000, nzPlacement: 'top' }
      )
  }

}

