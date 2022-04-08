import { Action } from './action';
import { Person } from './person';
import { Settings } from './Settings';
import { Thing } from './thing';
import { Zone } from './zone';

export class Cartridge {
    settings: Settings;
    zones: Zone[];
    persons: Person[];
    actions: Action[];
    inventory: Thing[];
}
