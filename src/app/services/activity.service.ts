import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { IActivity } from '../models/Trip';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activitiesCollection = this.afs.collection<IActivity>('activities');
  selectedActivity: IActivity | undefined;

  //get selectedHolidayID from holiday state
  selectedHolidayID = '1';

  //connects to firestore or http for json data
  constructor(private afs: AngularFirestore) {
  }

  setSelectedActivity(activity: IActivity) {
    this.selectedActivity = activity;
  }

  getSelectedActivity(): IActivity | undefined {
    return this.selectedActivity;
  }

  getActivities(): Observable<IActivity[]> {
    return this.activitiesCollection.valueChanges();
  }

  getActivitiesByHolidayID(holidayID: string): Observable<IActivity[]> {
    //get activities by holidayID and convert timestamp to date
    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('fkHolidayID', '==', holidayID));
    return activitiesByHoliday.valueChanges();
  }

  getActivtiesByUsersHolidayIDs(holidayID: string[]): Observable<IActivity[]> {
    // get activities for every holidayID in the array
    const activitiesByHoliday = this.afs.collection<IActivity>('activities', ref => ref.where('fkHolidayID', 'in', holidayID));
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
    // the id is not the document id, it is the activity id
    const activityToUpdateDoc = this.afs.collection('activities', ref => ref.where('id', '==', activity.id));
    activityToUpdateDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update(activity);
      })
    }
    )
  }
}
