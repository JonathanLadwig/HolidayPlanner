import { createFeature, createReducer, on } from '@ngrx/store';
import * as HolidayActions from '../Ngrx-actions/holiday.actions';

export const holidayFeatureKey = 'holiday';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(HolidayActions.loadHolidays, state => state),
  on(HolidayActions.loadHolidaysSuccess, (state, action) => state),
  on(HolidayActions.loadHolidaysFailure, (state, action) => state),
);

export const holidayFeature = createFeature({
  name: holidayFeatureKey,
  reducer,
});

