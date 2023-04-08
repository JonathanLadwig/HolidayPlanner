export interface IUser {
    email: string;
    displayName?: string;
    holidays?: IHoliday[];
}

export interface IHoliday {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    itinerary?: IActivity[];
}

export interface IActivity {
    id: string;
    name: string;
    description?: string;
    tag: string; //change to custom type later
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
