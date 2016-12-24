import { Portalstate } from './portalstate';
import { Swupdate } from './swupdate';
import { Whitelist } from './whitelist';

export type WhitelistList = { [id: string]: Whitelist };

export class Config {
    name: 	string;
    apiversion:	string;
    swversion: 	string;
    swupdate: Swupdate;
    whitelist: WhitelistList;
    proxyaddress: 	string;
    proxyport: 	number;
    linkbutton: 	boolean;
    ipaddress: 	string;
    mac: 	string;
    netmask: 	string;
    gateway: 	string;
    dhcp: 	boolean;
    portalservices: 	boolean;
    portalconnection: string;
    portalstate: Portalstate;
    UTC: 	string;
    localtime: 	string;
    timezone: 	string;
    zigbeechannel: 	string;
    modelid: 	string;
    bridgeid: 	string;
    factorynew: 	boolean;
    replacesbridgeid: 	string;
    datastoreversion: 	string;
}
