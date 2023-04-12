import { createAction, props } from '@ngrx/store';

export const loadHolidays = createAction(
  '[Holiday] Load Holidays'
);

export const loadHolidaysSuccess = createAction(
  '[Holiday] Load Holidays Success',
  props<{ data: any }>()
);

export const loadHolidaysFailure = createAction(
  '[Holiday] Load Holidays Failure',
  props<{ error: any }>()
);
