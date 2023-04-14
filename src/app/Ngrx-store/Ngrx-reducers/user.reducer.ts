import { IUser } from "src/app/models/Trip";

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