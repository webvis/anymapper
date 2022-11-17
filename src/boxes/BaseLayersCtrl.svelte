<script>
	import { layers, selectLayer } from './stores.ts'

	function handleClick(layer) {
		selectLayer(layer.name)
	}
</script>

<style>
	.main {
		bottom: 0;
		position: fixed;
    	margin: 20px;
	}
	.layer_btn {
		display: inline-block;
		box-sizing: border-box;
		width: 60px;
		height: 60px;
		margin-right: 12px;
		box-shadow: var(--anymapper-float-box-shadow);
		border-radius: var(--anymapper-float-border-radius);
		background: var(--anymapper-surface-bg-color);
		text-align: center;
		cursor: pointer;
	}
	.layer_btn > * {
		position: absolute;
		width: 60px;
		bottom: 8px;
		font-size: 10px;
		text-transform: uppercase;
	}
	.visible {
		font-weight: bold;
	}

	@media only screen and (max-width: 600px) {
		.main {
			bottom: calc(var(--anymapper-mobile-bottom-sheet-is-visible) * var(--anymapper-mobile-bottom-sheet-height));
		}
	}
</style>

{#if $layers}
<div class="main">
	{#each Array.from($layers.values()).filter(d => d.type == 'base') as layer}
		<div class="layer_btn" on:click="{() => handleClick(layer)}" class:visible="{layer.visible}"><div>{layer.name}</div></div>
	{/each}
</div>
{/if}