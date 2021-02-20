<script>
	import { onMount, createEventDispatcher } from 'svelte'

	export let node = null
	export let path = null
	
	let root_group
	
	const dispatch = createEventDispatcher()

	onMount(async function() {
		if(path && !(node)) {
			node = new DOMParser().parseFromString(await (await fetch(path)).text(), 'image/svg+xml').querySelector('svg')
		}
		let inserted_node = root_group.appendChild(await node)
		
		dispatch('ready', {
			node: inserted_node // pass the loaded node after insertion
		})
	})
</script>

<g bind:this={root_group}></g>
