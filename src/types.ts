export class Entity {
    id: string
    position?: Point | Array<Point> // a single Point, or a set of Points
    [key: string]: any

    constructor(init?: Partial<Entity>) {
        Object.assign(this, init)

        // automatically instance contained Points, if needed
        if(Array.isArray(this.position)) {
            this.position = this.position.map(p => p instanceof Point ? p : new Point(p))
        }
        else // not an Array
            this.position = this.position instanceof Point ? this.position : new Point(this.position)
    }

    get_first_valid_layer(this): string | null {
        if(this.position === undefined)
            return null

        if(Array.isArray(this.position)) {
            for(const p of this.position)
                if(p.layer !== undefined)
                    return p.layer // return the first matching, if any
            return null
        }
        else // not an Array
            return this.position.layer
    }

    get_position_in_layer(this, layer) : Point | null {
        if(this.position === undefined)
            return null
    
        if(Array.isArray(this.position)) {
            for(const p of this.position)
                if(p.layer == layer.name)
                    return p // return the first matching, if any
            return null
        }
        else // not an Array
            return this.position.layer == layer.name ? this.position : null
    }
}

export class Point {
    x: number
    y: number
    layer?: string
    zoomRange?: [number, number]

    constructor(init?: Partial<Point>) {
        Object.assign(this, init)
    }

    is_in_zoom_range(this, z: number) : boolean {
        if(this.zoomRange === undefined)
            return true
    
        return z >= this.zoomRange[0] && z <= this.zoomRange[1]
    }
}

export class Path {
    from_id: string
    to_id: string
    points?: Array<Point> // ordered sequence of Points, from -> to
}