import { createAction, props } from "@ngrx/store";
import { IActivity } from "src/app/models/Trip";

export const addActivity = createAction(
  '[Activities] Add New Activity',
  props<{ newActivity: IActivity }>()
);

export const deleteActivity = createAction(
  '[Activities] Delete Existing Activity',
  props<{ idActivity: string }>()
);

export const loadActivities = createAction('[Activities] Load Activities');

export const loadActivitiesSuccess = createAction(
  '[Activities] Load Activities Success',
  props<{ activities: IActivity[] }>(),
);

export const loadActivitiesFailure = createAction(
  '[Activities] Load Activities Failure',
  props<{ error: string }>()
);
