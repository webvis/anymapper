<script>
	import { createEventDispatcher } from 'svelte'
	import { results, clearSelection } from './stores.js'

	import Paper from '@smui/paper'
	import IconButton from '@smui/icon-button'

	let query
	
	const dispatch = createEventDispatcher()

	function search(){
		clearSelection()
		dispatch('search', {
			query: query
		})
	}
	function handleClick(){
		search()
	}
	function handleInput(){
		search()
	}
</script>

<style>
	.omnibox {
		position: relative;
		margin: var(--omnibox-margin);
		box-sizing: border-box;
		pointer-events: auto;
	}
	.wrapper {
		display: flex;
		padding: 4px;
	}
    input {
        border: none;
        outline: none;
        background: none;
		margin: 0;
		margin-left: 8px;
        margin-right: 12px;
        flex-grow: 1;
    }
	.results {
		flex-grow: 1;
		overflow-y: auto;
	}

	@media only screen and (max-width: 600px) {
		.omnibox {
			width: calc(100% - 2*var(--omnibox-margin));
			top: 0;
		}
		.fullscreen.omnibox {
			width: 100%;
			height: 100%;
			margin: 0;
		}
		.fullscreen.omnibox .wrapper {
			padding: 14px;
		}
		.fullscreen.omnibox :global(.smui-paper) {
			border-radius: 0;
		}
	}

</style>

<div class="omnibox" class:fullscreen={ $results.length > 0 }>
	<Paper elevation="4" style="padding: 0; display: flex; flex-direction: column; height: 100%;">
		<div class="wrapper">
			<input type="text" bind:value={query} placeholder="Cerca" on:input={handleInput}/>
			<IconButton style="margin: 0;" class="material-icons" on:click={handleClick}>search</IconButton>
		</div>
		{#if $results.length > 0}
			<hr/>
			<div class="results">
				<slot>
				</slot>
			</div>
		{/if}
	</Paper>
</div>