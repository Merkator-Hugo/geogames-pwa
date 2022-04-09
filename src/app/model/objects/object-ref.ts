import { ObjectTypes } from '../utils/object-types.enum';

export class ObjectRef {
    id: string;
    type: ObjectTypes;
    constructor(id: string, type: ObjectTypes) {
        this.id = id;
        this.type = type;
    }
}
