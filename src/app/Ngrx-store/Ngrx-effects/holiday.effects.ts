import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as HolidayActions from '../Ngrx-actions/holiday.actions';


@Injectable()
export class HolidayEffects {

  loadHolidays$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(HolidayActions.loadHolidays),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => HolidayActions.loadHolidaysSuccess({ data })),
          catchError(error => of(HolidayActions.loadHolidaysFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) { }
}
