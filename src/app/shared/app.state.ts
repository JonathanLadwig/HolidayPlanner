import { ActivityState } from "../Ngrx-store/Ngrx-reducers/activity.reducer";
import { UserState } from "../Ngrx-store/Ngrx-reducers/user.reducer";

export interface AppState {
  user: UserState;
  // holidays: HolidayState;
  activities: ActivityState;
}
