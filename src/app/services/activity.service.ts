import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IActivity, IHoliday } from '../models/Trip';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  //get selectedHolidayID from holiday state
  selectedHolidayID = '1';

  //connects to firestore or http for json data
  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  //get all activities (needs to be changed to only pull from a specific holiday)
  getActivities(): Observable<IActivity[]> {
    const activitiesByHoliday = this.afs.collection<IActivity>('activities');
    return activitiesByHoliday.valueChanges();
  }

  getActivitiesByHolidayID(holidayID: string): Observable<IActivity[]> {
    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('fkHolidayID', '==', holidayID));
    return activitiesByHoliday.valueChanges();
  }

  addActivity(newActivity: IActivity) {
    try {
      const activitiesCollection = this.afs.collection<IActivity>('activities');
      activitiesCollection.add({ ...newActivity });
    } catch (error) {
      console.log(error);
    }

    const holidaysCollection = this.afs.collection<IHoliday>('holidays');
    const holidayDoc = holidaysCollection.doc(this.selectedHolidayID);
    //add activity to holiday itinerary
  }
}
