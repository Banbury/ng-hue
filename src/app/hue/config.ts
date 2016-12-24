import { Portalstate } from './portalstate';
import { Swupdate } from './swupdate';

export class Config {
    name: 	string;
    whitelist: 	any;
    apiversion:	string;
    swversion: 	string;
    swupdate: Swupdate;
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
