import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IHoliday } from 'src/app/models/Trip';
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

  constructor(private fb: UntypedFormBuilder, private store: Store<AppState>, private readonly afs: AngularFirestore, private afa: AngularFireAuth) {
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
        itinerary: []
      }
      this.addNewHoliday(newHoliday);
    }
  }

  //should be handled by service?
  addNewHoliday(newHoliday: IHoliday): void {
    this.holidaysCollection.add(newHoliday);
  }

}
