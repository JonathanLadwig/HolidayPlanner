import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IHoliday } from 'src/app/models/Trip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  setSelectedHoliday(holiday: IHoliday) {
    console.log('setSelectedHoliday')
    console.log(holiday)
  }
  public allHolidays$: Observable<IHoliday[]> | undefined;

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
    //get all holidays where the user id matches the current user id
    this.afa.currentUser.then((user) => {
      const holidaysByUser = this.afs.collection<IHoliday>('holidays', ref => ref.where('fkUserID', '==', user?.uid));
      this.allHolidays$ = holidaysByUser.valueChanges();
    }
    );
  }
}
