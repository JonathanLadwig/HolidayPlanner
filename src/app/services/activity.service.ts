import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IActivity } from '../models/Trip';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  selectedHolidayID = '1';

  //connects to firestore or http for json data
  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  //get all activities (can be changed)
  getActivities(): Observable<IActivity[]> {
    //I need to get data from firestore
    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('holidayId', '==', this.selectedHolidayID));
    return activitiesByHoliday.valueChanges();
  }

  addActivity(newActivity: IActivity) {
    this.afs.collection<IActivity>('activities').add(newActivity);
  }
}
