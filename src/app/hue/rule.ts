import { Status } from './schedule';

export type Operator = "eq" | "gt" | "lt" | "dx" | "ddx" | "stable" | "not stable" | "in" | "not in";

export class Condition {
    address: string;
    operator: Operator;
    value: string;
}

export class Action {
    address: string;
    method: string;
    body: {};
}

export type RuleList =  { [id: string]: Rule };

export class Rule {
    name: string;
    owner: string;
    created: string = "";
    lasttriggered: string = "";
    timestriggered: number;
    status: Status;
    conditions: Condition[];
    actions: Action[];
}
