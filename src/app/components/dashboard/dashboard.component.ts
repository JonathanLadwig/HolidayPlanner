import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadActivitiesByHolidayID } from "src/app/Ngrx-store/Ngrx-actions/activity.actions";
import { loadHolidays, setSelectedHolidayID } from "src/app/Ngrx-store/Ngrx-actions/holiday.actions";
import { selectHolidays } from "src/app/Ngrx-store/Ngrx-selectors/holiday.selectors";
import { IHoliday } from "src/app/models/Trip";
import { AppState } from "src/app/shared/app.state";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public allHolidays$: Observable<IHoliday[]> | undefined;

  setSelectedHoliday(holiday: IHoliday) {
    this.store.dispatch(setSelectedHolidayID({ idHoliday: holiday.id }));
    this.store.dispatch(loadActivitiesByHolidayID({ idHoliday: holiday.id }));
  }

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private store: Store<AppState>) {
    //get all holidays where the user id matches the current user id
    //should be done via a store and a service?
    // this.afa.currentUser.then((user) => {
    //   const holidaysByUser = this.afs.collection<IHoliday>("holidays", (ref) =>
    //     ref.where("fkUserID", "==", user?.uid),
    //   );
    //   this.allHolidays$ = holidaysByUser.valueChanges();
    // });

    this.allHolidays$ = this.store.select(selectHolidays);
  }

  ngOnInit(): void {
    this.store.dispatch(loadHolidays());
  }
}
