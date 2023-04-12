import { createFeature, createReducer, on } from '@ngrx/store';
import { IHoliday } from 'src/app/models/Trip';
import * as HolidayActions from '../Ngrx-actions/holiday.actions';

export const holidayFeatureKey = 'holiday';

export interface HolidayState {
  holidays: IHoliday[];
  errorMessage: string;
  status: 'success' | 'error' | 'idle' | 'loading';
}

export const initialState: HolidayState = {
  holidays: [],
  errorMessage: '',
  status: 'idle',
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

