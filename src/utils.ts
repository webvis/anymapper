import * as d3 from 'd3'

import { select } from './stores'

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