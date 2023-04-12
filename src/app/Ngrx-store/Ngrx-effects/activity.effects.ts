import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IActivity } from "../../models/Trip";
import { ActivityService } from "../../services/activity.service";
import * as ActivityActions from "../Ngrx-actions/activity.actions";

@Injectable()
export class ActivityEffects {

  loadActivities$ =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(ActivityActions.loadActivities),
          switchMap(
            () =>
              this.activityService.getActivities().pipe(
                tap((activities) => console.log(activities)),
                map((activities: IActivity[]) => ActivityActions.loadActivitiesSuccess({ activities })),//end of map
                catchError(error => {
                  //this is where I'm going to fire off cool ng-zorro alert thingy from the service
                  console.log("Hi, yeah we have problems...")
                  return of(ActivityActions.loadActivitiesFailure({ error }))
                }
                )//end of catch error
              )//end of holiday-viewer service pipe
          )//end of concat map
        )//end of action obs watcher
    )//end of create effect
  constructor(private actions$: Actions, private activityService: ActivityService) {
  }

}
