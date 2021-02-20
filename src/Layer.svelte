<script>
	import { fade } from 'svelte/transition'

	import { layers } from './stores.js'

	export let name
	export let type = 'overlay'

	$: visible = $layers && $layers.has(name) && $layers.get(name).visible
</script>

<g class="layer" data:name="{name}" data:type="{type}">
	{#if visible}
	    <g transition:fade>
			<slot></slot>
		</g>
	{/if}
</g>