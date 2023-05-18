import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    constructor() { }

    isNullOrUndefined(object: any): boolean {
        return (object === null || object === undefined);
    }
}