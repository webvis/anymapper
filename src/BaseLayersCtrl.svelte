<script>
	import { layers, selectLayer, selected_id } from './stores.js'

	function handleClick(layer) {
		selectLayer(layer.name)
	}
</script>

<style>
	.base_layers_ctrl {
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
		box-shadow: var(--float-box-shadow);
		border-radius: var(--float-border-radius);
		background: white;
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
		.base_layers_ctrl.isIdSelected {
			bottom: var(--infobox-header-height);
		}
	}
</style>

{#if $layers}
<div class="base_layers_ctrl" class:isIdSelected={$selected_id != ''}>
	{#each Array.from($layers.values()).filter(d => d.type == 'base') as layer}
		<div class="layer_btn" on:click="{() => handleClick(layer)}" class:visible="{layer.visible}"><div>{layer.name}</div></div>
	{/each}
</div>
{/if}