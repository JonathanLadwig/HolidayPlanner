import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { IActivity } from "../../models/Trip";
import { ActivityService } from "../../services/activity.service";
import * as ActivityActions from "../Ngrx-actions/activity.actions";

@Injectable()
export class ActivityEffects {

  constructor(private actions$: Actions, private activityService: ActivityService) { }

  loadActivities$ =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(ActivityActions.loadActivitiesByUserHolidayIDs),
          switchMap(
            (action) =>
              this.activityService.getActivtiesByUsersHolidayIDs(action.idHolidays).pipe(
                map((activities: IActivity[]) => ActivityActions.loadActivitiesSuccess({ activities })),//end of map
                catchError(error => {
                  alert(`Hi, yeah we have problems...${error}`)
                  return of(ActivityActions.loadActivitiesFailure({ error }))
                }
                )//end of catch error
              )//end of holiday-viewer service pipe
          )//end of concat map
        )//end of action obs watcher
    );//end of create effect

  loadActivitiesByHolidayID$ =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(ActivityActions.loadActivitiesByHolidayID),
          switchMap(
            (action) =>
              this.activityService.getActivitiesByHolidayID(action.idHoliday).pipe(
                map((activities: IActivity[]) => ActivityActions.loadActivitiesSuccess({ activities })),//end of map
                catchError(error => {
                  alert(`Hi, yeah we have problems...${error}`)
                  return of(ActivityActions.loadActivitiesFailure({ error }))
                }
                )//end of catch error
              )//end of holiday-viewer service pipe
          )//end of concat map
        )//end of action obs watcher
    );//end of create effect



}
