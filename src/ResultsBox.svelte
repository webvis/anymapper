<script>
    import { results } from './stores.js'
</script>

<style>
	.box {
	}

	@media only screen and (max-width: 600px) {
		.box {
			
		}
	}

</style>

{#if $results}
	<div class="box">
		<slot></slot>
	</div>
{/if}