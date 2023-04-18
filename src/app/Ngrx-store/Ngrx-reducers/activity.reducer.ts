import { createReducer, on } from "@ngrx/store";
import { IActivity } from "../../models/Trip";
import {
  addActivity,
  deleteActivity,
  loadActivities,
  loadActivitiesByHolidayID,
  loadActivitiesFailure,
  loadActivitiesSuccess,
  updateActivity
} from "../Ngrx-actions/activity.actions";

export const activityFeatureKey = 'activity';

export interface ActivityState {
  activities: IActivity[];
  errorMessage: string;
  status: 'success' | 'error' | 'idle' | 'loading';
}

export const initialState: ActivityState = {
  activities: [],
  errorMessage: '',
  status: 'idle'
}
export const reducer = createReducer(
  initialState,
  //Add new activity case
  on(addActivity, (state, { newActivity }) => {
    return {
      ...state,
      activities: [...state.activities, newActivity]
    }
  }),
  //Update existing activity case
  on(updateActivity, (state, { idActivity }) => {
    return {
      ...state,
      activities: state.activities.map(activity => {
        if (activity.id === idActivity) {
          return {
            ...activity,
            isEditing: true
          }
        }
        return activity;
      })
    }
  }),
  //Delete existing activity case
  on(deleteActivity, (state, { idActivity }) => {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== idActivity)
    }
  }),
  //Load activities by holiday id case
  on(loadActivitiesByHolidayID, state => ({ ...state, status: 'loading' })),
  //Load activities by user id case
  // on(loadActivitiesByUserID, state => ({ ...state, status: 'loading' })),
  //Load activities case
  on(loadActivities, state => ({ ...state, status: 'loading' })),
  //Load activities success case
  on(loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities,
    error: null,
    status: 'success'
  })),
  //Load activities failure case
  on(loadActivitiesFailure, (state, { error }) => ({ ...state, error: error, status: 'error' }))
)


