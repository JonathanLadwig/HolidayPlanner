import { createSelector } from "@ngrx/store";
import { AppState } from "../../shared/app.state";
import { ActivityState } from "../Ngrx-reducers/activity.reducer";

//gets all the activities from the state
export const selectActivities = (state: AppState) => state.activities;
//gets all the activities from the state and sorts them by date
export const selectAllActivitiesSortedByDate = createSelector(
  selectActivities,
  (state: ActivityState) => state.activities
  // .sort((a, b) => b.startDateTime.getDate() - a.startDateTime.getDate() || b.startDateTime.getTime() - a.startDateTime.getTime())
)
//gets one specific activity from the state by its id
export const selectSpecificActivity = (activityID: string) => createSelector(
  selectActivities,
  (state: ActivityState) => state.activities.find(activity => activity.id === activityID)
)
