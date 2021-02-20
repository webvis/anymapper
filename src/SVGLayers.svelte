<script>
    import Layer from './Layer.svelte'
    import InlineSVG from './InlineSVG.svelte'

	export let path
	export let names
	export let modes
	export let preprocess = null
	export let postprocess = null

	$: modes_array = modes.split(' ')

    async function retrieveLayers() {
		let parser = new DOMParser()
		let svg = parser.parseFromString(await (await fetch(path)).text(), 'image/svg+xml').querySelector('svg')
		
		if(preprocess)
			preprocess(svg)

		let data = new Map(Array.from(svg.querySelectorAll('.layer')).map(d => [d.getAttribute('id'), d]))

		if(postprocess)
			postprocess(data)

		return data
	}

	let layers = retrieveLayers()
</script>

{#each names.split(' ') as name, i}
	<Layer name={name} type={modes_array[i]}>
		{#await layers then ready_layers}
			<InlineSVG node={ready_layers.get(name)}/>
		{/await}
	</Layer>
{/each}