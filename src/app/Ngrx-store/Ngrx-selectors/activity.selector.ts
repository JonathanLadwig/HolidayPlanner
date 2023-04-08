import { createSelector } from "@ngrx/store";
import { AppState } from "../../shared/app.state";
import { ActivityState } from "../Ngrx-reducers/activity.reducer";

export const selectActivities = (state: AppState) => state.activities;
export const selectAllActivitiesByDate = createSelector(
  selectActivities,
  (state: ActivityState) => state.activities.sort((a, b) => a.startDateTime > b.startDateTime ? 1 : -1)
)
export const selectSpecificActivity = (activityID: string) => createSelector(
  selectActivities,
  (state: ActivityState) => state.activities.find(activity => activity.id === activityID)
)
