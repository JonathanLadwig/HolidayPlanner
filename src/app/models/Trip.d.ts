export interface IUser {
    // uid: string;
    email: string;
    displayName?: string;
    holidays?: IHoliday[];
}

export interface IHoliday {
    id: string;
    fkUserID: string;
    name: string;
    description?: string;
    itinerary: IActivity[];
}

export interface IActivity {
    id: string;
    name: string;
    description?: string;
    tag: string; //change to custom type later?
    startDateTime: Date;
    endDateTime: Date;
    cost?: number;
    currency?: string;
    location?: ILatLong;
    endLocation?: ILatLong;
}

export interface ILatLong {
    latitude: number;
    longitude: number;
}
