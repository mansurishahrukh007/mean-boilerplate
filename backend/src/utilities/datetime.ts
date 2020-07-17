// import * as moment from 'moment/src/moment';
import moment = require('moment');

export function getUtcTimestamp() {
    return moment(new Date().toISOString())
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
}

const dtFormat = {
    ShortDateFormat: 'DD/MM/YYYY',
    DateTimeFormat: 'DD-MM-YYYY hh:mm A',
    DateTimeSecondFormat: 'DD-MM-YYYY hh:mm:ss A',
    YYYYMMDDFormat: 'YYYY-MM-DD',
    MMMYYYY: 'MMM-YYYY',
    YYYYMMDDHHmmss: 'YYYY-MM-DD HH:mm:ss',
    MMMDDYYYY: 'MMM DD YYYY',
    DDMMMMYYYY: 'DD-MMMM-YYYY'
};

export function currentDateTime() {
    return {
        DateTimeMoment: moment(),
        ValueOf: moment().valueOf(),
        ShortDate: formatDateTime(moment()).ShortDate,
        DateTime: formatDateTime(moment()).DateTime,
        DateTimeSecond: formatDateTime(moment()).DateTimeSecond,
        YYYYMMDDFormat: formatDateTime(moment()).YYYYMMDDFormat
    };
}

export function formatDateTime(val: any) {
    return {
        DateTimeMoment: moment(val),
        ValueOf: moment(val).valueOf(),
        ShortDate: moment(val).format(dtFormat.ShortDateFormat),
        DateTime: moment(val).format(dtFormat.DateTimeFormat),
        DateTimeSecond: moment(val).format(dtFormat.DateTimeSecondFormat),
        YYYYMMDDFormat: moment(val).format(dtFormat.YYYYMMDDFormat),
        MMMYYYY: moment(val).format(dtFormat.MMMYYYY),
        YYYYMMDDHHmmss: moment(val).format(dtFormat.YYYYMMDDHHmmss),
        MMMDDYYYY: moment(val).format(dtFormat.MMMDDYYYY),
        DDMMMMYYYY: moment(val).format(dtFormat.DDMMMMYYYY)
    };
}

export function getTimestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

export function getDateDifference(dateStr: string) {
    return moment().diff(moment(dateStr), 'minute');
}

export function getDateDifferenceInMiliSeconds(date: Date) {
    const now = moment(new Date()); // todays date
    const end = moment.utc(date); // another date
    const local = end.local(); // another date
    const duration = moment.duration(now.diff(local));
    return duration.asMilliseconds();
}

export function getCurrentDateTime(): Date {
    return new Date(currentDateTime().YYYYMMDDFormat);
}
