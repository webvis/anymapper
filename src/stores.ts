import { writable, readable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'

import * as d3 from 'd3'

import { get_entity_position_in_layer, get_entity_first_valid_layer } from './utils'

import type { Entity } from './types'

export const layers = writable(null)
export const current_layer = writable(null)
export const selection = writable(null)
export const results : Writable<Array<Entity>> = writable([])

export const viewBoxRect = writable({width: 1000, height: 1000, x: 0, y: 0})

export const screen_size = writable(new DOMRect(0, 0, 0, 0))
export const screen_transform = writable(d3.zoomIdentity)

export const user_transform = writable(d3.zoomIdentity)

export const zoom = writable(1.0)
export const viewport = writable(new DOMRect(0, 0, 0, 0))

export const settled_zoom = writable(1.0)
export const settled_viewport = writable(new DOMRect(0, 0, 0, 0))


const get_id_from_hash = () => window.location.hash.slice(1)

export const selected_id = readable(get_id_from_hash(), function start(set) {
    window.addEventListener('hashchange', () => set(get_id_from_hash()), false)
})
export const hovered_id = writable(null)

// null the selection whenever selected_id is invalidated
selected_id.subscribe(id => {
    if(!id || id == '')
        selection.set(null)
})


selection.subscribe(d => {
    // change layer if the new selection is not in the current one
    if(d && get_entity_position_in_layer(d, get(current_layer)) === null) {
        // selection is not in the current layer
        let new_layer = get_entity_first_valid_layer(d)
        if(new_layer !== null)
            selectLayer(new_layer)
    }

    if(d) {
        // clear search results
        results.set([])
    }
})

// check if we need to null the selection whenever the current layer is changed
current_layer.subscribe(layer => {
    if(get(selection) && get(selection).position && get_entity_position_in_layer(get(selection), layer) === null)
        clearSelection()
})

export function clearSelection() {
    window.location.hash = ''
}

export function select(id: string) {
    window.location.hash = '#'+id
}

export function hover_enter(id: string) {
    hovered_id.set(id)
}
export function hover_leave(id: string) {
    hovered_id.set(null)
}

export function selectLayer(name) {
    let all_layers = get(layers)
    let layer = all_layers.get(name)
    current_layer.set(layer)

    // floor layers logic
    let visibility = true
    all_layers.forEach(d => {
        if(d.type == 'floor')
            d.visible = visibility
        if(d == layer)
            visibility = false
    })

    // base layers logic
    all_layers.forEach(d => {
        if(d.type == 'base')
            d.visible = false
    })
    layer.visible = true
    
    layers.set(get(layers)) // refresh layers after modification
}