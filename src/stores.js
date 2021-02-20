import { writable, readable, get, derived } from 'svelte/store'

import * as d3 from 'd3'

export const layers = writable(null)
export const current_layer = writable(null)
export const selection = writable(null)
export const results = writable([])
export const current_transform = writable(d3.zoomIdentity)

export const semantic_zoom = derived(current_transform, (x) => 1/x.k)

const get_id_from_hash = () => window.location.hash.slice(1)

export const selected_id = readable(get_id_from_hash(), function start(set) {
    window.addEventListener('hashchange', () => set(get_id_from_hash()), false)
})

// null the selection whenever selected_id is invalidated
selected_id.subscribe(id => {
    if(!id || id == '')
        selection.set(null)
})


selection.subscribe(d => {
    // change layer if the new selection is not in the current one
    if(d && d.position && d.position.layers && !(d.position.layers.has(get(current_layer).name)))
        selectLayer(d.position.layers.values().next().value)

    if(d) {
        // clear search results
        results.set([])
    }
})

// check if we need to null the selection whenever the current layer is changed
current_layer.subscribe(layer => {
    if(get(selection) && get(selection).position && get(selection).position.layers && !(get(selection).position.layers.has(layer.name)))
        clearSelection()
})

export function clearSelection() {
    window.location.hash = ''
}

export function select(id) {
    window.location.hash = '#'+id
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