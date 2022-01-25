export interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): Number;
    convertToUTC(date: Date): Date
    now(): Date
}