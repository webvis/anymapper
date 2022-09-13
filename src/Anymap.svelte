<script>
	import { selection } from './stores.js'
</script>

<style>
    .main {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
		--anymapper-mobile-bottom-sheet-is-visible: 0;
	}

	.main.anymapperBottomSheetIsVisible {
		--anymapper-mobile-bottom-sheet-is-visible: 1;
	}
</style>

<div class="main" class:anymapperBottomSheetIsVisible={$selection !== null}>
    <slot></slot>
</div>