<script>
	import { selected_id, selection } from './stores.js'

	import Card from '@smui/card'
	import LinearProgress from '@smui/linear-progress'
</script>

<style>
	.infobox {
		position: relative;
    	margin: 10px;
		box-sizing: border-box;
		pointer-events: auto;
	}

	:global(.infobox table) {
        border-spacing: 0;
    }

    :global(.infobox td:first-child) {
        width: 80px;
        font-weight: bold;
    }

    :global(.infobox tr:not(:last-child) > td) {
        padding-bottom: 6px;
    }

	@media only screen and (max-width: 600px) {
		.infobox {
			position: absolute;
			width: 100%;
			margin: 0 !important;
			top: calc(100% - var(--infobox-header-height));
		}
	}

</style>

{#if $selected_id}
	<div class="infobox">
		<Card class="mdc-elevation--z4" style="overflow: hidden;">
			{#if $selection}
				<slot></slot>
			{:else}
				<LinearProgress indeterminate/>
			{/if}
		</Card>
	</div>
{/if}