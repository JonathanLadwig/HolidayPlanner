import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { holidayFeatureKey } from '../Ngrx-reducers/holiday.reducer';

export const selectHolidayState = createFeatureSelector<AppState>(
  holidayFeatureKey
);

//gets all the holidays from the state
export const selectHolidays = (state: AppState) => state.holidays.holidays;

//gets one specific holiday from the state by its id
export const selectSpecificHoliday = (holidayID: string) => createSelector(
  selectHolidayState,
  (state: AppState) => state.holidays.holidays.find(holiday => holiday.id === holidayID)
)
//gets the selected holiday id from the state
export const getSelectedHolidayID = (state: AppState) => state.holidays.selectedHolidayID;
