import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { Observable } from 'rxjs';
import { IActivity } from 'src/app/models/Trip';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  date = new Date();
  mode: NzCalendarMode = 'month';
  public allActivities$: Observable<IActivity[]> | undefined;

  constructor(private afs: AngularFirestore) { }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

  ngOnInit(): void {
    this.allActivities$ = this.afs.collection<IActivity>('activities').valueChanges();
  }

}
