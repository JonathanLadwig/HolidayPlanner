import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';


@Injectable()
export class HolidayEffects {

  // loadHolidays$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(HolidayActions.loadHolidays),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => HolidayActions.loadHolidaysSuccess({ data })),
  //         catchError(error => of(HolidayActions.loadHolidaysFailure({ error }))))
  //     )
  //   );
  // });


  constructor(private actions$: Actions) { }
}
