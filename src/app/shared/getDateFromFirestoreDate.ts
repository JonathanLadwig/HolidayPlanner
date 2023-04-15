import { Timestamp } from "firebase/firestore";

export function getDateFromFS(fsDate: unknown) {
    //convert firebase timestamp to date
    const dateTimeStamp = fsDate as Timestamp;
    const dateFormatted = new Date(dateTimeStamp.seconds * 1000);
    return (dateFormatted);
}