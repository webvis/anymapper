<script>
	import { layers, current_layer, selectLayer, selected_id } from './stores.js'

	function handleClick(layer) {
        selectLayer(layer.name)
	}
</script>

<style>
	.floor_layers_ctrl {
		bottom: 0;
        right: 0;
		position: fixed;
        box-shadow: var(--float-box-shadow);
		border-radius: var(--float-border-radius);
		background: white;
    	margin: 20px;
        overflow: hidden;
	}
	.layer_btn {
        position: relative;
		display: block;
		box-sizing: border-box;
		width: 48px;
		height: 48px;
		text-align: center;
		cursor: pointer;
	}
	.layer_btn > * {
		position: absolute;
		width: 48px;
		bottom: 16px;
		font-size: 16px;
		text-transform: uppercase;
	}
    .visible {
        font-weight: bold;
    }
	.current {
        background: var(--primary-bg-color);
        color: var(--primary-fg-color);
	}

	@media only screen and (max-width: 600px) {
		.floor_layers_ctrl.isIdSelected {
			bottom: var(--infobox-header-height);
		}
	}
</style>

{#if $layers}
<div class="floor_layers_ctrl" class:isIdSelected={$selected_id != ''}>
	{#each Array.from($layers.values()).filter(d => d.type == 'floor').reverse() as layer}
		<div class="layer_btn" on:click="{() => handleClick(layer)}" class:visible="{layer.visible}" class:current="{layer == $current_layer}"><div>{layer.name}</div></div>
	{/each}
</div>
{/if}