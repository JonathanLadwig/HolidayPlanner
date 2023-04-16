import { createAction, props } from '@ngrx/store';
import { IHoliday } from 'src/app/models/Trip';

export const setSelectedHolidayID = createAction(
  '[Holiday] Set Selected Holiday ID',
  props<{ idHoliday: string }>()
);

export const addHoliday = createAction(
  '[Holiday] Add New Holiday',
  props<{ newHoliday: IHoliday }>()
);

export const deleteHoliday = createAction(
  '[Holiday] Delete Existing Holiday',
  props<{ idHoliday: string }>()
);

export const editHoliday = createAction(
  '[Holiday] Edit Existing Holiday',
  props<{ idHoliday: string }>()
);

export const loadHolidays = createAction(
  '[Holiday] Load Holidays'
);

export const loadHolidaysSuccess = createAction(
  '[Holiday] Load Holidays Success',
  props<{ holidays: IHoliday[] }>()
);

export const loadHolidaysFailure = createAction(
  '[Holiday] Load Holidays Failure',
  props<{ error: string }>()
);
