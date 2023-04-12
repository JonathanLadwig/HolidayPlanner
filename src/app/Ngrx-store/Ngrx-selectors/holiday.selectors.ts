import { createFeatureSelector } from '@ngrx/store';
import * as fromHoliday from '../Ngrx-reducers/holiday.reducer';

export const selectHolidayState = createFeatureSelector<fromHoliday.HolidayState>(
  fromHoliday.holidayFeatureKey
);
