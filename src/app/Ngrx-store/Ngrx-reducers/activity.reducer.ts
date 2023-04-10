import { createReducer, on } from "@ngrx/store";
import { IActivity } from "../../models/Trip";
import {
  addActivity,
  deleteActivity,
  loadActivities,
  loadActivitiesFailure,
  loadActivitiesSuccess
} from "../Ngrx-actions/activity.actions";

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
  //Add new holiday-viewer case
  on(addActivity, (state, { newActivity }) => {
    return {
      ...state,
      activities: [...state.activities, newActivity]
    }
  }),
  //Delete existing holiday-viewer case
  on(deleteActivity, (state, { idActivity }) => {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== idActivity)
    }
  }),
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


