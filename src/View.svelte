<script>
	import * as d3 from 'd3'

	import { user_transform, viewBoxRect, screen_size, screen_transform, zoom, viewport, settled_zoom, settled_viewport, layers, current_layer, selection, hovered_id } from './stores.ts'
	import { onMount } from 'svelte'

	export let viewBox
	export let interpolateZoom = d3.interpolate
	
	export let scaleExtent = "0 Infinity"
	export let translateExtent = "-Infinity -Infinity Infinity Infinity"
	$: scaleExtentArray = scaleExtent.split(' ').map(d => +d)
	$: translateExtentArray = translateExtent.split(' ').map(d => +d)

	export let background = null
	
	let svg
	let zoom_behavior
	let current = false

	let debounce_timeout
	
	onMount(() => {
		// set default color for background if not specified
        if(background === null) {
            background = window.getComputedStyle(svg).getPropertyValue('--anymapper-background-color')
        }

		// store viewBox rect in a global store
		$viewBoxRect = svg.viewBox.baseVal

		// auto populate layers store from defined Layer components
		$layers = new Map()
		let first_done = false
		svg.querySelectorAll('.layer').forEach(layer => {
			let key = layer.getAttribute('data:name')
			let type = layer.getAttribute('data:type')
			let visible = false

			// first base or floor layer visible and current by default
			if (!first_done && (type == 'base' || type == 'floor')) {
				visible = true
				first_done = true
				current = true
			}

			// overlays are visible by default
			if (type == 'overlay') {
				visible = true
			}

			let d = {
				name: key,
				type: type,
				visible: visible
			}
			
			$layers.set(key, d)

			if (current) {
				$current_layer = d
				current = false
			}
		})

		// enable d3 zoom
		zoom_behavior = d3.zoom()
			.scaleExtent(scaleExtentArray)
			.translateExtent([translateExtentArray.slice(0,2), translateExtentArray.slice(2,4)])
			.interpolate(interpolateZoom)
			.on('zoom', handleZoom)

		d3.select(svg).call(zoom_behavior)

		function handleZoom(event) {
			$user_transform = event.transform
			updateGlobals()
			updateLODElementsInSVG()
		}

		// focus to enable keyboard interaction
		svg.focus()

		// update LOD-sensitive elements that are defined inside the SVG
		function updateLODElementsInSVG() {
			svg.querySelectorAll('[data-lodrange]').forEach(elem => {
				let lod_range = JSON.parse(elem.getAttribute('data-lodrange')).map(d => d == 'Infinity' ? Infinity : d)
				let lod_visible = $user_transform.k >= lod_range[0] && $user_transform.k <= lod_range[1]
				elem.setAttribute('visibility', lod_visible ? 'visible' : 'hidden')
			})
		}

		updateGlobals()
		updateLODElementsInSVG()

		window.addEventListener('resize', function(event) {
			updateGlobals()
		}, true)

		// listen to layer changes
		current_layer.subscribe(handleNewLayer)
	})

	function updateGlobals() {
		$screen_size = svg.getBoundingClientRect()
		let ctm = svg.getCTM()
		$screen_transform = d3.zoomIdentity.translate(ctm.e, ctm.f).scale(ctm.a)


		$zoom = $screen_transform.k * $user_transform.k

		$viewport = new DOMRect(
			(-$screen_transform.x/$screen_transform.k-$user_transform.x)/$user_transform.k,
			(-$screen_transform.y/$screen_transform.k-$user_transform.y)/$user_transform.k,
			$screen_size.width/$screen_transform.k/$user_transform.k,
			$screen_size.height/$screen_transform.k/$user_transform.k
		)

		
		// debounced update of settled globals
		clearTimeout(debounce_timeout)

		debounce_timeout = setTimeout(function (event) {
			$settled_zoom = $zoom
			$settled_viewport = $viewport
		}, 300)
	}

	function scaleBy(k, duration) {
		duration = duration === undefined ? 300 : duration
		zoom_behavior.scaleBy(d3.select(svg).transition().duration(duration), k)
	}

	function scaleTo(k, duration) {
		duration = duration === undefined ? 300 : duration
		zoom_behavior.scaleTo(d3.select(svg).transition().duration(duration), k)
	}

	function translateBy(x, y, duration) {
		duration = duration === undefined ? 300 : duration
		zoom_behavior.translateBy(d3.select(svg).transition().duration(duration), x, y)
	}

	function translateTo(p, duration) {
		duration = duration === undefined ? 1200 : duration
		zoom_behavior.translateTo(d3.select(svg).transition().duration(duration), p.x, p.y)
	}

	// listen to selection changes
	selection.subscribe(handleNewSelection)

	function handleNewSelection(d) {
		if(d && d.position) {
			translateTo(d.position)
		}
	}

	// listen to hovered changes
	hovered_id.subscribe(handleHover)

	function handleHover(id) {
		if(!svg) return
		
		svg.querySelectorAll('.selectable').forEach(elem => {
			if(elem.getAttribute('id') == id) {
				elem.classList.add('hovered')
			} else {
				elem.classList.remove('hovered')
			}
		})
	}

	async function handleNewLayer(new_layer) {
		// wait for DOM to be synced
		await (() => new Promise(requestAnimationFrame))()
		
		// hide or show layer-sensitive elements in SVG
		svg.querySelectorAll('[data-inlayers]').forEach(elem => {
			let in_layers = JSON.parse(elem.getAttribute('data-inlayers'))
			let visible = in_layers.includes(new_layer.name)
			elem.setAttribute('visibility', visible ? 'visible' : 'hidden')
		})
	}

	function handleKeyUp(e) {
		const delta = 100 / $zoom

		// pan and zoom keyboard control
		switch(e.key) {
			case 'ArrowRight':
				translateBy(-delta,0)
				break
			case 'ArrowLeft':
				translateBy(delta,0)
				break
			case 'ArrowUp':
				translateBy(0,delta)
				break
			case 'ArrowDown':
				translateBy(0,-delta)
				break
			case '+':
				scaleBy(1.5)
				break
			case '-':
				scaleBy(0.66)
				break
		}
	}
</script>

<style>
	.main {
		width: 100%;
		height: 100%;
		position: fixed; /* needed to avoid jumping whenever the hash is changed */
	}
	.main:focus {
		outline: none;
	}

	@media only screen and (max-width: 600px) {
		.main {
			height: calc(100% - var(--anymapper-mobile-bottom-sheet-is-visible) * var(--anymapper-mobile-bottom-sheet-height));
		}
	}
</style>

<svg class="main" bind:this={svg} {viewBox} tabindex="0" on:keyup={handleKeyUp} style="background-color: {background}">
	<g transform={$user_transform}>
		<slot></slot>
	</g>
</svg>