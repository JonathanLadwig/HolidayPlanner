import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IActivity } from "src/app/models/Trip";
import { ActivityState, activityFeatureKey } from "../Ngrx-reducers/activity.reducer";

export const selectActivityState = createFeatureSelector<ActivityState>(
  activityFeatureKey
);

//gets all the activities from the state
export const selectActivities = (state: ActivityState) => state.activities;

//gets all the activities from the state and sorts them by date
export const selectAllActivitiesSortedByDate = createSelector(
  selectActivityState,
  (state: ActivityState) => {
    const activities = structuredClone(state.activities);
    return activities
      .sort((a: IActivity, b: IActivity) => {
        console.log(a, b)
        if (a && b) {
          const dateA = new Date(a.startDateTime)
          const dateB = new Date(b.startDateTime)
          return (dateA.getDate() - dateB.getDate());
        }
        return 0
      })
  }
)

//gets one specific activity from the state by its id
export const selectSpecificActivity = (activityID: string) => createSelector(
  selectActivityState,
  (state: ActivityState) => state.activities.find(activity => activity.id === activityID)
)
