export class Light {
    name: string;
    type: string;
    modelid: string;
    swversion: string;

    state: {
        on: boolean;
        reachable: boolean;
        bri: number;
    }
}
