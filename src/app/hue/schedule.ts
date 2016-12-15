export type Status = "enabled" | "disabled";

export class Schedule {
    name?: string;
    description?: string;
    command: Object;
    localtime: string;
    status?: Status;
    autodelete?: boolean;
    recycle?: boolean;

    static isAlarm(s: Schedule) : boolean {
        return s.localtime.startsWith("W");
    }

    static isTimer(s: Schedule) : boolean {
        return s.localtime.startsWith("P") || s.localtime.startsWith("R");
    }
}
