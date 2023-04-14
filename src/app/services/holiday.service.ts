import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IHoliday } from '../models/Trip';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  currentUserID: string | undefined;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {
    this.afa.currentUser.then((user) => {
      this.currentUserID = user?.uid;
    });
  }

  getHolidays() {
    //get holidays from firestore
    if (!this.currentUserID) {
      return;
    }
    const holidaysByUser = this.afs.collection('holidays', ref => ref.where('fkUserID', '==', this.currentUserID));
    return holidaysByUser.valueChanges({ idField: 'holidayID' });
  }

  addHoliday(holiday: IHoliday) {
    this.afs.collection('holidays').add(holiday);
  }
}
