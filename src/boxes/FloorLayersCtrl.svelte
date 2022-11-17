<script>
	import { layers, current_layer, selectLayer } from '../stores.ts'

	function handleClick(layer) {
        selectLayer(layer.name)
	}
</script>

<style>
	.main {
		bottom: 0;
        right: 0;
		position: fixed;
        box-shadow: var(--anymapper-float-box-shadow);
		border-radius: var(--anymapper-float-border-radius);
		background: var(--anymapper-surface-bg-color);
    	margin: 20px;
        overflow: hidden;
	}
	.layer-btn {
        position: relative;
		display: block;
		box-sizing: border-box;
		width: 48px;
		height: 48px;
		text-align: center;
		cursor: pointer;
	}
	.layer-btn > * {
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
        background: var(--anymapper-primary-bg-color);
        color: var(--anymapper-primary-fg-color);
	}

	@media only screen and (max-width: 600px) {
		.main {
			bottom: calc(var(--anymapper-mobile-bottom-sheet-is-visible) * var(--anymapper-mobile-bottom-sheet-height));
		}
	}
</style>

{#if $layers}
<div class="main">
	{#each Array.from($layers.values()).filter(d => d.type == 'floor').reverse() as layer}
		<div class="layer-btn" on:click="{() => handleClick(layer)}" class:visible="{layer.visible}" class:current="{layer == $current_layer}"><div>{layer.name}</div></div>
	{/each}
</div>
{/if}