import moment from "moment";

export const convertDateTimeToString = (datetime: Date) => {
    return moment(datetime).format('MM-DD-YYYY');
}