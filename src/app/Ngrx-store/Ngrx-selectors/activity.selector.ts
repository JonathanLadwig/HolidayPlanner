import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Timestamp } from "firebase/firestore";
import { IActivity } from "src/app/models/Trip";
import { ActivityState, activityFeatureKey } from "../Ngrx-reducers/activity.reducer";

export const selectActivityState = createFeatureSelector<ActivityState>(
  activityFeatureKey
);

//gets all the activities from the state
export const selectActivities = (state: ActivityState) => state.activities;

export const getStatus = (state: ActivityState) => state.status;

//gets all the activities from the state and sorts them by date
export const selectAllActivitiesSortedByDate = createSelector(
  selectActivityState,
  (state: ActivityState) => {
    const activities = structuredClone(state.activities);
    return activities
      .sort((a: IActivity, b: IActivity) => {
        if (a && b) {
          const timestampA = a.startDateTime as unknown as Timestamp
          const timestampB = b.startDateTime as unknown as Timestamp
          const dateA = new Date(timestampA.seconds * 1000);
          const dateB = new Date(timestampB.seconds * 1000);
          return (dateA.getDate() - dateB.getDate() || dateA.getTime() - dateB.getTime());
        }
        return 0
      })
  }
)

export const selectAllActivitiesSortedByDateWithHolidayID = (idHoliday: string) => createSelector(
  selectAllActivitiesSortedByDate,
  (activities: IActivity[]) => {
    return activities.filter((activity: IActivity) => {
      return (activity.fkHolidayID === idHoliday)
    })
  }
)


//get all activities with selected date
export const selectAllActivitiesSortedByDateWithDate = (date: Date) => createSelector(
  selectAllActivitiesSortedByDate,
  (activities: IActivity[]) => {
    return activities.filter((activity: IActivity) => {
      const timestamp = activity.startDateTime as unknown as Timestamp
      const activityDate = new Date(timestamp.seconds * 1000);
      return (activityDate.getDate() === date.getDate() && activityDate.getMonth() === date.getMonth() && activityDate.getFullYear() === date.getFullYear())
    })
  }
)

//get all activities with selected month
export const selectAllActivitiesSortedByDateWithMonth = (date: Date) => createSelector(
  selectAllActivitiesSortedByDate,
  (activities: IActivity[]) => {
    return activities.filter((activity: IActivity) => {
      const timestamp = activity.startDateTime as unknown as Timestamp
      const activityDate = new Date(timestamp.seconds * 1000);
      return (activityDate.getMonth() === date.getMonth() && activityDate.getFullYear() === date.getFullYear())
    })
  }
)

//gets one specific activity from the state by its id
export const selectSpecificActivity = (activityID: string) => createSelector(
  selectActivityState,
  (state: ActivityState) => state.activities.find(activity => activity.id === activityID)
)

export const getHolidayTotalCost = (holidayID: string) => {
  return createSelector(
    selectActivityState,
    (state: ActivityState) => {
      let totalCost = 0;
      state.activities.forEach(activity => {
        if (activity.fkHolidayID === holidayID) {
          totalCost += activity.cost ?? 0;
        }
      })
      return totalCost;
    }
  )
}
