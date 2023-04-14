import { ActivityState } from "../Ngrx-store/Ngrx-reducers/activity.reducer";
import { HolidayState } from "../Ngrx-store/Ngrx-reducers/holiday.reducer";

export interface AppState {
  // user: UserState;
  holidays: HolidayState;
  activities: ActivityState;
}
