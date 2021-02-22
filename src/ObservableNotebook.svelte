<script>
	import { onMount } from 'svelte'

	import {Runtime, Inspector} from "@observablehq/runtime"
	
	export let notebook
	export let variable_name
	
	let root_group
	
	// const dispatch = createEventDispatcher()
	onMount(async function() {
		new Runtime().module(notebook, (name) => {
			if (name == variable_name) {
				let inspector = new Inspector(root_group)
				//dispatch('ready', { inspector })
				return inspector
			}
		})
	})
</script>

<g bind:this={root_group}></g>
