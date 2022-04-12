export interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): Number;
    compareInDays(start_date: Date, end_date: Date): Number;
    convertToUTC(date: Date): Date;
    now(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}