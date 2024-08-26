import type {Dimensions} from "./geometry/vector";
import {Body} from "./body"

export class Universe<D extends Dimensions> {
    bodies: Body<D>[]

    constructor(bodies: Body<D>[]) {
        this.bodies = bodies
    }
}

