import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IHoliday } from 'src/app/models/Trip';
import { HolidayService } from 'src/app/services/holiday.service';
import * as HolidayActions from "../Ngrx-actions/holiday.actions";


@Injectable()
export class HolidayEffects {

  constructor(private actions$: Actions, private holidayService: HolidayService) { }

  // load holidays by userID
  loadHolidays$ =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(HolidayActions.loadHolidays),
          switchMap(
            () =>
              this.holidayService.getHolidays().pipe(
                map((holidays: IHoliday[]) => HolidayActions.loadHolidaysSuccess({ holidays })),//end of map
                catchError(error => {
                  alert(`Hi, yeah we have problems...${error}`)
                  return of(HolidayActions.loadHolidaysFailure({ error }))
                }
                )//end of catch error
              )//end of holiday-viewer service pipe
          )//end of switch map
        )//end of action obs watcher
    );//end of create effect

  //set the selected holiday ID in service
  setSelectedHolidayID$ =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(HolidayActions.setSelectedHolidayID),
          tap((action) => this.holidayService.setSelectedHoliday(action.idHoliday))
        ),
      { dispatch: false }
    );
}