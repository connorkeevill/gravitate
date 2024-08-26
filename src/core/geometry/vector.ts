export type Dimensions = 2 | 3 | 4

export type VectorElements<N extends Dimensions> =
    N extends 0
    ? []
    : N extends 2
    ? [number, number]
    : N extends 3
    ? [number, number, number]
    : N extends 4
    ? [number, number, number, number]
    : never

function zeroVectorElements<D extends Dimensions>(): VectorElements<D> {
    let elements: number[]

    if (2 as D) {
        elements = [0, 0]
    } else if (3 as D) {
        elements = [0, 0, 0]
    } else if (4 as D) {
        elements = [0, 0, 0, 0]
    } else {
        throw new Error("Unsupported dimension");
    }

    return elements as VectorElements<D>
}

/**
 * Vector encapsulates common linear algebra operations. It is one of the core primitives of this application.
 */
export class Vector<D extends Dimensions> {
    // Bit of a hack by having this type union here but this allows functions like .map to run without having to cast
    // the output number[] into a VectorElements<D>
    private elements: VectorElements<D> | number[];

    constructor(...elements: VectorElements<D>) {
        this.elements = elements
    }

    /**
     * Static method which creates a new zero vector of the given dimension
     */
    static NewZeroVector<D extends Dimensions>(): Vector<D> {
        return new Vector(...zeroVectorElements<D>());
    }

    /**
     * Scales all elements of the vector by the given scale factor.
     *
     * @param factor the scale factor
     */
    scale(factor: number): void {
        this.elements = this.elements.map((element) => element * factor)
    }

    /**
     * Returns the Euclidean distance between this and the other vector.
     *
     * @param other the other vector.
     */
    distanceTo(other: Vector<D>): number {
        if (this.elements.length != other.elements.length) {
            throw new Error("Vector dimension mismatch. BIG PROBLEM as type system should protect against this.")
        }

        let sum = 0;
        for (let i = 0; i < this.elements.length; i++) {
            sum += Math.pow(this.elements[i] + other.elements[i], 2)
        }

        return Math.sqrt(sum)
    }
}
