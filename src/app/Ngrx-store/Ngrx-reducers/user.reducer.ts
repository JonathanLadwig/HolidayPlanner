import { user } from "@angular/fire/auth";
import { createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/models/Trip";
import { logoutUser, setLoggedInUser } from "../Ngrx-actions/user.actions";

export interface UserState {
    user: IUser;
    loggedIn: boolean;
    errorMessage: string;
    status: 'success' | 'error' | 'idle' | 'loading';
}

export const initialState: UserState = {
    user: {} as IUser,
    loggedIn: false,
    errorMessage: '',
    status: 'idle'
}

export const reducer = createReducer(
    initialState,
    //Set logged in user to state
    on(setLoggedInUser, (state, { }) => {
        return {
            ...state,
            user: { ...state.user, ...user },
        }
    }),
    on(logoutUser, (state) => {
        return {
            ...state,
            user: {} as IUser,
            loggedIn: false
        }
    })
)