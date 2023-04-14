import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IActivity } from '../models/Trip';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activitiesCollection = this.afs.collection<IActivity>('activities');

  //get selectedHolidayID from holiday state
  selectedHolidayID = '1';

  //connects to firestore or http for json data
  constructor(private afs: AngularFirestore, private http: HttpClient) {
  }

  getActivities(): Observable<IActivity[]> {
    return this.activitiesCollection.valueChanges();
  }

  getActivitiesByHolidayID(holidayID: string): Observable<IActivity[]> {
    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('fkHolidayID', '==', holidayID));
    return activitiesByHoliday.valueChanges();
  }

  addActivity(newActivity: IActivity) {
    this.activitiesCollection.add(newActivity);
  }

  removeActivity(activityID: string) {
    this.afs.collection('activities').doc(activityID).delete();
  }

  updateActivity(activity: IActivity) {
    this.afs.collection('activities').doc(activity.id).update(activity);
  }
}
