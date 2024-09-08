import {type Dimensions, Vector} from "./geometry/vector";
import {Body} from "./body"

const G = 1

export class Universe<D extends Dimensions> {
    bodies: Body<D>[]

    constructor(bodies: Body<D>[]) {
        this.bodies = bodies
    }

    update(timedelta: number): void {

        for(const body of this.bodies) {
            console.log("Position:", body.position)
            let acceleration = this.getGravitationalAcceleration(body.position)

            console.log("Acc:", acceleration)
            console.log("")

            console.log("Velocity pre:", body.velocity)
            body.velocity = body.velocity.add(acceleration.scale(timedelta))
            console.log("Velocity post:", body.velocity)
        }

        // Note that we have two separate loops for this because it avoids moving the bodies before calculating all
        // gravitational forces.
        for(const body of this.bodies) {
            body.update(timedelta)
        }
    }

    getGravitationalAcceleration(position: Vector<D>): Vector<D> {
        let gravity: Vector<D> = Vector.NewZeroVector<D>()

        for(const body of this.bodies) {
            let distance = body.position.distanceTo(position)

            if (distance == 0) { continue }
            let force = (G * body.mass) / Math.pow(distance, 2)

            gravity = gravity.add(position.vectorTo(body.position).normalise().scale(force))
        }

        return gravity
    }
}

