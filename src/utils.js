import * as d3 from 'd3'

import { select } from './stores.js'

export function make_selectable(root, selector, accessor) {
    if (accessor === undefined) // default accessor
        accessor = (d) => d3.select(d).attr('id')

    d3.select(root).selectAll(selector).on('click', function () {
		let id = accessor(this)
		select(id)
	})
}