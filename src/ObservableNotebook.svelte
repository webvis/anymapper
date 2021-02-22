<script>
	import { onMount, createEventDispatcher } from 'svelte'

	import {Runtime, Inspector} from "@observablehq/runtime"
	
	export let notebook
	export let variable_name
	
	let root_group
	
	const dispatch = createEventDispatcher()
	
	onMount(async function() {
		let inspector
		const module = new Runtime().module(notebook, (name) => {
			if (name == variable_name) {
				inspector = new Inspector(root_group)
				return inspector
			}
		})

		// wait for the cell to be fulfilled
		await module.value(variable_name)
		dispatch('ready', { inspector, node: root_group })
	})
</script>

<g bind:this={root_group}></g>
