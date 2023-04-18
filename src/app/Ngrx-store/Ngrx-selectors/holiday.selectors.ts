import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HolidayState, holidayFeatureKey } from '../Ngrx-reducers/holiday.reducer';

export const selectHolidayState = createFeatureSelector<HolidayState>(
  holidayFeatureKey
);

//gets all the holidays from the state
export const selectHolidays = (state: HolidayState) => state.holidays;

//gets one specific holiday from the state by its id
export const selectSpecificHoliday = (holidayID: string) => createSelector(
  selectHolidayState,
  (state: HolidayState) => state.holidays.find(holiday => holiday.id === holidayID)
)
//gets the selected holiday id from the state
export const getSelectedHolidayID = (state: HolidayState) => state.selectedHolidayID;

//gets all holiday ids from the state
export const getHolidayIDs = createSelector(
  selectHolidayState,
  (state: HolidayState) => state.holidays.map(holiday => holiday.id)
)

export const getHolidayStatus = createSelector(
  selectHolidayState,
  (state: HolidayState) => state.status
)
