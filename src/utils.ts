import * as d3 from 'd3'

import { select } from './stores'

import type { Entity, Point } from './types'

export function make_selectable(root, selector, accessor) {
    if (!selector) // default selector
        selector = '.selectable'

    if (!accessor) // default accessor
        accessor = (d) => d3.select(d).attr('id')

    d3.select(root).selectAll(selector).on('click', function () {
		let id = accessor(this)
		select(id)
	})
}

export function centroid(path) {
    // return the centroid of a given SVG path (considering vertexes only and ignoring curves)
    let points = []
    path.getPathData({normalize: true}).forEach(d => {
        if(d.type == 'Z')
            return
        // last two values are always a point in M, C and L commands
        points.push({x: d.values[d.values.length-2], y: d.values[d.values.length-1]})
    })
    
    // centroid of vertexes
    let sum_p = points.reduce(((a, p) => ({x: a.x+p.x, y: a.y+p.y})), {x: 0, y: 0})
    return {x: sum_p.x/points.length, y: sum_p.y/points.length}
}

export function get_entity_position_in_layer(entity: Entity, layer) : Point | null {
    if(entity.position === undefined)
        return null

    if(Array.isArray(entity.position)) {
        for(const p of entity.position)
            if(p.layer == layer.name)
                return p // return the first matching, if any
        return null
    }
    else // not an Array
        return entity.position.layer == layer.name ? entity.position : null
}

export function get_entity_first_valid_layer(entity: Entity) {
    if(entity.position === undefined)
        return null

    if(Array.isArray(entity.position)) {
        for(const p of entity.position)
            if(p.layer !== undefined)
                return p.layer // return the first matching, if any
        return null
    }
    else // not an Array
        return entity.position.layer
}

export function is_point_in_zoom_range(point: Point, z: number) : boolean {
    if(point.zoomRange === undefined)
        return true

    return z >= point.zoomRange[0] && z <= point.zoomRange[1]
}