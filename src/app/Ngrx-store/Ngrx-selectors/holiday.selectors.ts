import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import * as fromHoliday from '../Ngrx-reducers/holiday.reducer';

export const selectHolidayState = createFeatureSelector<fromHoliday.HolidayState>(
  fromHoliday.holidayFeatureKey
);

//gets all the holidays from the state
export const selectHolidays = (state: AppState) => state.holidays;
//gets one specific holiday from the state by its id
export const selectSpecificHoliday = (holidayID: string) => createSelector(
  selectHolidays,
  (state: fromHoliday.HolidayState) => state.holidays.find(holiday => holiday.id === holidayID)
)

