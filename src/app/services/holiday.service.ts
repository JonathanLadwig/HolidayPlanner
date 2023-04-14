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

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private authService: AuthService, private guard: AuthGuard) { }

  getHolidays(): Observable<IHoliday[]> {
    const currentUserID = this.guard.getCurrentUserID();
    const holidaysByUser = this.afs.collection<IHoliday>('holidays', (ref) =>
      ref.where('fkUserID', '==', currentUserID),
    );
    console.log('GetHolidaysUserID', currentUserID);
    return holidaysByUser.valueChanges();
  }

  addHoliday(holiday: IHoliday) {
    this.afs.collection('holidays').add(holiday);
  }
}
