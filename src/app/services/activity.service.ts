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
    //get activities by holidayID and convert timestamp to date

    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('fkHolidayID', '==', holidayID));
    return activitiesByHoliday.valueChanges();
  }

  addActivity(activity: IActivity) {
    this.activitiesCollection.add(activity);
  }

  removeActivity(activityID: string) {
    //get the activity doc id from the activityID
    const activityToDeleteDoc = this.afs.collection('activities', ref => ref.where('id', '==', activityID));
    activityToDeleteDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      })
    }
    )
  }

  updateActivity(activity: IActivity) {
    this.afs.collection('activities').doc(activity.id).update(activity);
  }
}
