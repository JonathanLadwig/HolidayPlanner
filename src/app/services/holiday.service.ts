import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IHoliday } from '../models/Trip';
import { AuthService } from '../shared/auth.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  selectedHolidayID: string = '';

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private authService: AuthService, private guard: AuthGuard) { }

  getHolidays(): Observable<IHoliday[]> {
    const currentUserID = this.guard.getCurrentUserID();
    const holidaysByUser = this.afs.collection<IHoliday>('holidays', (ref) =>
      ref.where('fkUserID', '==', currentUserID),
    );
    return holidaysByUser.valueChanges();
  }

  setSelectedHoliday(holidayID: string) {
    this.selectedHolidayID = holidayID;
  }

  getSelectedHolidayID(): string {
    return this.selectedHolidayID;
  }

  addHoliday(holiday: IHoliday) {
    this.afs.collection('holidays').add(holiday);
  }

  deleteHoliday(holidayID: string) {
    //get the holiday doc id from the holidayID
    const holidayToDeleteDoc = this.afs.collection('holidays', ref => ref.where('id', '==', holidayID));
    holidayToDeleteDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    }
    )
    //delete all activities with the holidayID
    const activitiesToDeleteDoc = this.afs.collection('activities', ref => ref.where('fkHolidayID', '==', holidayID));
    activitiesToDeleteDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    }
    )
  }
}
