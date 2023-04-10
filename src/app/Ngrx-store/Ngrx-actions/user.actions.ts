import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/Trip";

// export const getLoggedInUser = createAction(
//     '[Users] Get User',
//     props<{ user: IUser }>()
// );

export const setLoggedInUser = createAction(
    '[Users] Set User',
    props<{ user: IUser }>()
);

export const logoutUser = createAction(
    '[Users] Logout User'
);