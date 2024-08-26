import {type Dimensions, Vector, type VectorElements} from "./geometry/vector";


class Body<D extends Dimensions> {
    mass: number
    position: Vector<D>
    velocity: Vector<D>

    constructor(mass: number, position: Vector<D> = Vector.NewZeroVector<D>(), velocity: Vector<D> = Vector.NewZeroVector<D>()) {
        this.mass = mass
        this.position = position
        this.velocity = velocity
    }
}
