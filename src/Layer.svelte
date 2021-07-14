<script>
	import { fade } from 'svelte/transition'

	import { layers, current_layer } from './stores.js'
	import TracingPaper from './TracingPaper.svelte'

	export let name
	export let type = 'overlay'

	$: visible = $layers && $layers.has(name) && $layers.get(name).visible
	$: current = $current_layer && $current_layer.name == name
	$: first = $layers && $layers.keys().next().value == name
</script>

<g class="layer" data:name="{name}" data:type="{type}">
	{#if visible}
		{#if type == 'floor' && current && !first}
			<TracingPaper/>
		{/if}
		<slot></slot>
	{/if}
</g>