import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addHoliday } from 'src/app/Ngrx-store/Ngrx-actions/holiday.actions';
import { IHoliday } from 'src/app/models/Trip';
import { HolidayService } from 'src/app/services/holiday.service';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-new-holiday-tab',
  templateUrl: './new-holiday-tab.component.html',
  styleUrls: ['./new-holiday-tab.component.scss']
})
export class NewHolidayTabComponent implements OnInit {
  validateHolidayForm!: UntypedFormGroup;
  private holidaysCollection: AngularFirestoreCollection<IHoliday>;
  holidays: Observable<IHoliday[]>;
  userID: string = '';

  constructor(private fb: UntypedFormBuilder, private store: Store<AppState>, private readonly afs: AngularFirestore, private afa: AngularFireAuth, private holidayService: HolidayService) {
    this.holidaysCollection = afs.collection<IHoliday>('holidays');
    this.holidays = this.holidaysCollection.valueChanges({ idField: 'holidayID' });
  }

  ngOnInit(): void {
    //get current user (in future from state)
    this.afa.currentUser.then((user) => {
      this.userID = user?.uid || '';
    });

    //form validation
    this.validateHolidayForm = this.fb.group({
      holidayName: [null, [Validators.required]],
      holidayDescription: [null]
    });
  }

  submitForm(): void {
    if (this.validateHolidayForm.valid) {
      const newHoliday: IHoliday = {
        id: this.afs.createId(),
        fkUserID: this.userID,
        name: this.validateHolidayForm.value.holidayName,
        description: this.validateHolidayForm.value.holidayDescription || '',
      }
      this.store.dispatch(addHoliday({ newHoliday }));
      this.holidayService.addHoliday(newHoliday);
    }
    else {
      Object.values(this.validateHolidayForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      alert('Please fill in all required fields');
    }
  }

}
